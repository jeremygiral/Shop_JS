var express = require('express');
var router = express.Router();

//on charge notre modèle produit
var Product = require('../models/product');
var Cart =require('../models/cart');
var Order=require('../models/order');
/* GET home page. */
router.get('/', function(req, res, next) {
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
router.get('/add-to-cart/:id',function(req,res,next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productID,function(err,product) {
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});

router.get('/order',function(req,res,next){
  var messages=req.flash('error');
var cart = new Cart(req.session.cart);
  var order= new Order({
    user: req.user,
    cart: cart.generateArray(),
    adresse_livraison: "",
    adresse_facturation: ""
  });
  res.render('order/details',{messages: messages, hasErrors: messages.length>0, order: order,totalPrice: cart.totalPrice});
})

module.exports = router;
