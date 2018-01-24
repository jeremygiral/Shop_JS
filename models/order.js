var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema=new Schema({
  user: {type: Schema.Types.ObjectId,ref: 'User'},
  panier: {type: Object, require: true},
  isValable: {type: Boolean, default: true}
});

module.exports=mongoose.model('Order',schema);
