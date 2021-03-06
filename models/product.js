var mongoose=require('mongoose');
require('mongoose-money');
var Schema = mongoose.Schema;

var schema=new Schema({
  imagePath: {type:String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number},
  priceHT: {type: Number, required: true},
  entreprise: {type: String},
  caract_tech:[{type: String}],
  isValable: {type: Boolean, default: true}
});
schema.pre('save', function (next) {
    this.price = 1.2*this.get('priceHT');
    next();
});
module.exports=mongoose.model('Product',schema);
