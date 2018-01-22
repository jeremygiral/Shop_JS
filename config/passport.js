var passport=require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user,done){
  done(null,user.id);

});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use('local.signup',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  nomField: 'nom',
  prenomField: 'prenom',
  entrepriseField: 'entreprise',
  date_naissanceField: 'date_naissance',
  passReqToCallback: true
},function(req, email, password,done){
  req.checkBody('email', 'Adresse mail invalide').notEmpty().isEmail();
  req.checkBody('password', 'Mot de passe invalide').notEmpty().isLength({min:4});
  req.checkBody('nom', 'Nom vide').notEmpty();
  req.checkBody('date_naissance','Date incorrecte').notEmpty();
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var entreprise = req.body.entreprise;
  var date_naissance = req.body.date_naissance;
  var errors=req.validationErrors();

  if(errors){
    var messages=[];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  }
  User.findOne({'email': email},function(err,user){
    if(err){
      return done(err);
    }
    if(user){
      return done(null,false,{message: 'Cet adresse mail est déjà utilisée.'});
    }
    var newUser=new User();
    newUser.email=email;
    newUser.password=newUser.encryptPassword(password);
    newUser.nom=nom;
    newUser.prenom=prenom;
    newUser.entreprise=entreprise;
    newUser.date_naissance = date_naissance;
    newUser.save(function(err,result){
      if(err){
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req,email,password,done){
  req.checkBody('email', 'Adresse mail invalide').notEmpty();
  req.checkBody('password', 'Mot de passe invalide').notEmpty();
  var errors=req.validationErrors();
  if(errors){
    var messages=[];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  }
  User.findOne({'email': email},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message: 'L\'utilisateur n\'a pas été trouvé.'});
    }
    var valide=user.validPassword(password);
    if(!valide) {
      return done(null,false,{message: 'Mot de passe incorrect.'});
    }
      return done(null, user);
  });
}));
