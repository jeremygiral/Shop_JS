var express = require('express');
var router = express.Router();

//on charge nos modèles
var Product = require('../models/product');
var Panier =require('../models/panier');
var Order=require('../models/order');
var User=require('../models/user');
/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  if(!req.session.panier){
    req.session.panier={items: {}, totalQty: 0, totalPrice: 0,totalPriceHT: 0};
  }
  Product.find(function(err, docs) {
    var productChunks = [];
    //chunSize défini le nombre d'annonce par ligne
    var chunkSize = 3;
    //itération pour avoir 3 annonce par ligne
    for(var i = 0;i<docs.length;i+=chunkSize) {
      productChunks.push(docs.slice(i,i+chunkSize));
    }
    //on renvoi sur shop/index avec les données title et productChunks
    //productChunk contient une liste contenant des éléments contenant 3 produits
    res.render('shop/index', { title: 'Shop JS', products: productChunks });
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
