var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema = new Schema({
  email:{type: String, require: true},
  password: {type: String, require: true},
  nom: {type: String},
  prenom: {type: String},
  date_naissance: {type: Date},
  entreprise: {type: String},
  adresse_livraison: {type: String},
  adresse_facturation: {type: String},
  isValable: {type: Boolean, default: true}
});
userSchema.pre('save', function (next) {
    this.adresse_facturation = this.get('adresse_livraison');
    next();
});
userSchema.pre('update', function (next) {
    this.adresse_facturation = this.get('adresse_livraison');
    next();
});

userSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
