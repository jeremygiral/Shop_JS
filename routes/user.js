var express = require('express');
var router = express.Router();
//csrf nous servira pour les tokens
var csrf = require('csurf');
//passport authentif
var passport=require('passport');
var Order=require('../models/order');
var Panier =require('../models/panier');
var User= require('../models/user');

//on initialise l'utilisation de csurf
var csrfProtection =csrf();
router.use(csrfProtection);
//isLoggin renvoi à la mainPage si on n'est pas logger
//affiche la page profil
router.get('/profile',isLoggedIn, function(req,res,next){
  Order.find({user: req.user}, function(err,orders){
    if(err){
      return res.write('Erreur !');
    }
    var panier;
    orders.forEach(function(order) {
      panier = new Panier(order.panier);
      order.items = panier.generateArray();
    });
    res.render('user/profile',{orders: orders});
  });
});
//deco
router.get('/logout',isLoggedIn,function(req,res,next){
  req.logout();
  res.redirect('/');
});

//Renvoi à la main page si on est logger pour les route suivante,
// l'ordre est important, tout ce qui est en dessous subit cette regle
router.use('/',notLoggedIn,function(req,res,next){
  next();
});
//affiche la page signup
router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
  //renvoi sur signup avec le token et les erreurs eventuelles dues à l'authentif
  res.render('user/signup',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
//passport.authenticate envoie vers le fichier gestionnaire de l'authentif

router.post('/signup',passport.authenticate('local.signup',{
  //lors de l'envoie du form de signup gestion de l'après authentif
  failureRedirect: '/user/signup',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('user/profile');
  }
});

//affiche signin
router.get('/signin',function(req,res,next){
  var messages=req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
});
//idem
router.post('/signin',passport.authenticate('local.signin',{
  failureRedirect: '/user/signin',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});


router.route('/users')

.get(function(req,res){
  User.find(function(err, users){
    if (err){
      res.send(err);
    }
    res.json(users);

  })
}) // SUITE DU CODE

.post(function(req,res){
  // Nous utilisons le schéma Piscine
  var user = new User();
  // Nous récupérons les données reçues pour les ajouter à l'objet Piscine
  user = req.body.user;
  //Nous stockons l'objet en base
  user.save(function(err){
    if(err){
      res.send(err);
    }
    res.send({message : 'Bravo, l\'utilisateur est maintenant stockée en base de données'});
  })
})


router.route('users/:ID')
.get(function(req,res){
  User.findById(req.params.ID, function(err, user) {
    if (err){
      res.send(err);
    }
    res.json(user);
  });
})
.put(function(req,res){
  User.findById(req.params.ID, function(err, user) {
    if (err){
      res.send(err);
    }
    user = req.body.user;
    user.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message : 'Bravo, mise à jour des données OK'});
    });
  });
})
.delete(function(req,res){

  User.remove({_id: req.params.ID}, function(err, user){
    if (err){
      res.send(err);
    }
    res.json({message:"Bravo, utilisateur supprimé"});
  });

});

router.route('/softdelete/:ID')
.get(function(req,res){
  User.findById(req.params.ID, function(err, user) {
    if (err){
      res.send(err);
    }
    user.isValable=false;
    user.save();
    res.send({message:"Produit désactivé."});
  });
});

module.exports = router;
//function déterminant si on est connecté
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('user/signin');
}
//function déterminant si on n'est pas connecté
function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
