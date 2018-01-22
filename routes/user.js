var express = require('express');
var router = express.Router();
//csrf nous servira pour les tokens
var csrf = require('csurf');
//passport authentif
var passport=require('passport');

//on initialise l'utilisation de csurf
var csrfProtection =csrf();
router.use(csrfProtection);
//isLoggin renvoi à la mainPage si on n'est pas logger
//affiche la page profil
router.get('/profile',isLoggedIn, function(req,res,next){
  res.render('user/profile');
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
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

//affiche signin
router.get('/signin',function(req,res,next){
  var messages=req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
});
//idem
router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;
//function déterminant si on est connecté
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
//function déterminant si on n'est pas connecté
function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
