var express = require('express');
var router = express.Router();

//on charge nos modèles
var Product = require('../models/product');
var Panier =require('../models/panier');
var Order=require('../models/order');
var User=require('../models/user');
/* GET home page. */


//ajout d'un produit au panier
router.get('/ajouter-au-panier/:id',function(req,res,next) {
  var productID = req.params.id;
  var panier = new Panier(req.session.panier);
  Product.findById(productID,function(err,product) {
    if(err){
      return res.redirect('/');
    }
    panier.add(product,product.id);
    req.session.panier = panier;
    res.redirect('/');
  });
});

//affichage du panier
router.get('/',function(req,res,next){
  if(!req.session.panier){
    return res.render('shop/panier',{products: null});
  }
  var panier = new Panier(req.session.panier);
  res.render('shop/panier',{products: panier.generateArray(),totalPrice: panier.totalPrice, totalQty: panier.totalQty, totalPriceHT: panier.totalPriceHT});
});



router.get('/reduce/:id',function(req,res,next){
  var productID = req.params.id;
  var panier = new Panier(req.session.panier);
  Product.findById(productID,function(err,product) {
    if(err){
      return res.redirect('/');
    }
    panier.reduce(product,product.id);
    req.session.panier = panier;
    res.redirect('/panier');
  });
});


router.get('/remove/:id',function(req,res,next){
  var productID = req.params.id;
  var panier = new Panier(req.session.panier);
  Product.findById(productID,function(err,product) {
    if(err){
      return res.redirect('/panier');
    }
    panier.remove(product,product.id);
    req.session.panier = panier;
    res.redirect('/panier');
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
