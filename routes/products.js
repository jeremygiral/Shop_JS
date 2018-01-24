var express = require('express');
var router = express.Router();

var Product =require('../models/product');
router.route('/products')

.get(function(req,res){
  Product.find(function(err, products){
    if (err){
      res.send(err);
    }
    res.json(products);

  })
}) // SUITE DU CODE

.post(function(req,res){
  // Nous utilisons le schéma Piscine
  var product = new Product();
  // Nous récupérons les données reçues pour les ajouter à l'objet Piscine
  product = req.body.product;
  //Nous stockons l'objet en base
  product.save(function(err){
    if(err){
      res.send(err);
    }
    res.send({message : 'Bravo, le produit est maintenant stockée en base de données'});
  })
})


router.route('/:ID')
.get(function(req,res){
  Product.findById(req.params.ID, function(err, product) {
    if (err){
      res.send(err);
    }
    res.json(product);
  });
})
.put(function(req,res){
  Product.findById(req.params.ID, function(err, product) {
    if (err){
      res.send(err);
    }
    product = req.body.product;
    product.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message : 'Bravo, mise à jour des données OK'});
    });
  });
})
.delete(function(req,res){

  Product.remove({_id: req.params.ID}, function(err, product){
    if (err){
      res.send(err);
    }
    res.json({message:"Bravo, produit supprimé"});
  });

});

router.route('/softdelete/:ID')
.get(function(req,res){
  Product.findById(req.params.ID, function(err, product) {
    if (err){
      res.send(err);
    }
    product.isValable=false;
    product.save();
    res.send({message:"Produit désactivé."});
  });
});

module.exports = router;
