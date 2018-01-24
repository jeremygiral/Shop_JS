var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var fs = require('fs');
var pdf = require('html-pdf');
var Handlebarss = require('handlebars/runtime');
var hbtemplate = require('../views/order/print.js');
//on charge nos modèles
var Product = require('../models/product');
var Panier =require('../models/panier');
var Order=require('../models/order');
var User=require('../models/user');
/* GET home page. */

//enregistrement d'une commande
router.post('/order',isLoggedIn,function(req,res,next) {
  var messages = req.flash('error');
  //on récupère les infos du panier courrant
  var panier = new Panier(req.session.panier);
  //on récupere le user courrant
  var user = User.findById(req.user.id,function(err,user,done){
    if(err){
      return done(err);
    }
    user.nom=req.body.nom;
    user.prenom=req.body.prenom;
    user.adresse_livraison=req.body.adresse_livraison;
    user.adresse_facturation=req.body.adresse_facturation;
    //on met à jour les infos de l'user
    user.save(function(err,user,done){
      if(err){
        return done(err);
      }
    });
  });
  //on enregistre la commande
  var order = new Order({
    user: req.user.id,
    panier: panier
  });
  order.save(function(err,newOrder,done){
    if(err){
      return done(err);
    }
    //on réinitialise notre panier
    req.session.panier={items:{},totalQty: 0,totalPrice: 0,totalPriceHT: 0};
    res.redirect('/user/profile');
  });
});

//recap panier avant commande
router.get('/details',isLoggedIn,function(req,res,next){
  var messages=req.flash('error');
  //on recupere les infos de notre panier pour pouvoir faire le récap
  var panier = new Panier(req.session.panier);
  //on récupère les infos du user pour pouvoir afficher les infos qu'on a déjà dans le form
  var order= new Order({
    user: req.user,
    panier: panier.generateArray(),
    adresse_livraison: "",
    adresse_facturation: ""
  });
  res.render('../views/order/details',{
    messages: messages,
    hasErrors: messages.length>0,
    order: order,
    totalPrice: panier.totalPrice,
    totalQty: panier.totalQty,
    totalPriceHT: panier.totalPriceHT}
  );
});

//gestion de l'impression
router.get('/imprimer/:type&:id',isLoggedIn,function(req,res,next){
  //on recupere la commande correspondant à celle choisi par l'user et envoyer en parametre
  Order.findOne({_id: req.params.id}, function(err,order,next){
    if(order){
      //on recupère le panier et l'user correspondant à la commande
      var panier = new Panier(order.panier);
      order.items = panier.generateArray();
    }
    if(!order){
      //pour devis commande non créé, donc on récup le panier en cours que l'on mets dans une nouvelle variable commande
      var order=new Order();
      order.panier = req.session.panier;
      var paniertmp = new Panier(req.session.panier);
      order.items = paniertmp.generateArray();
    }
    User.findOne({_id: req.user._id}, function(err,user){
      if(err){
        return res.write('Erreur !');
      }
      order.user=user;
      // On détermine le type de demande
      switch (req.params.type) {
        case "A":
        order.type="Avoir";
        break;
        case "F":
        order.type="Facture";
        break;
        case "D":
        order.type="Devis";
        break;
      }
      var template = Handlebarss.templates['print.hbs'];
      var result = template(order);
      fs.writeFile("./public/pdf.html", result, function(err) {
        if(err) {
          return console.log(err);
        }
        var html = fs.readFileSync('./public/pdf.html', 'utf8');
        var options = { format: 'Letter' };
        pdf.create(html, options).toFile('./public/'+order.type+'.pdf', function(err, resu) {
          if (err){
            return console.log(err);
          }
          res.redirect('/'+order.type+'.pdf');
        });
      });
    });
  });
});




router.route('/orders')

.get(function(req,res){
  Order.find(function(err, orders){
    if (err){
      res.send(err);
    }
    res.json(orders);

  })
}) // SUITE DU CODE

.post(function(req,res){
  // Nous utilisons le schéma Piscine
  var order = new Order();
  // Nous récupérons les données reçues pour les ajouter à l'objet Piscine
  order.user = req.body.user;
  order.panier = req.body.panier;


  //Nous stockons l'objet en base
  order.save(function(err){
    if(err){
      res.send(err);
    }
    res.send({message : 'Bravo, la commande est maintenant stockée en base de données'});
  })
})


router.route('/:ID')
.get(function(req,res){
  Order.findById(req.params.ID, function(err, order) {
    if (err){
      res.send(err);
    }
    res.json(order);
  });
})
.put(function(req,res){
  Order.findById(req.params.ID, function(err, order) {
    if (err){
      res.send(err);
    }
    order.user = req.body.user;
    order.panier = req.body.panier;
    order.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message : 'Bravo, mise à jour des données OK'});
    });
  });
})
.delete(function(req,res){

  Order.remove({_id: req.params.ID}, function(err, order){
    if (err){
      res.send(err);
    }
    res.json({message:"Bravo, commande supprimée"});
  });

});
router.route('/softdelete/:ID')
.get(function(req,res){
  Order.findById(req.params.ID, function(err, order) {
    if (err){
      res.send(err);
    }
    order.isValable=false;
    order.save();
    res.send({message:"Commande désactivée."});
  });
});



module.exports = router;

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl=req.url;
  res.redirect('/user/signin');
}
