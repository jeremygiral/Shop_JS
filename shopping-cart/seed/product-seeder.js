var Product=require('../models/product');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopjs');


var products=[
  new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'A fantastic game !',
    price: 25
  }),
  new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/4/42/Risen.jpg',
    title:'Risen Video Game',
    description: 'A fantastic new game !',
    price: 30
  }),
  new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/f/fd/Risen2.jpg',
    title:'Risen 2 Video Game',
    description: 'Another fantastic game !',
    price: 35
  })
];

var done=0;
for (var i =0; i<products.length; i++){
  products[i].save(function(err,result){
    done++;
    if(done===products.length)
    {
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect;
}
