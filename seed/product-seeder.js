var Product=require('../models/product');
var User=require('../models/user');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopjs');


var products=[
  new Product({
    imagePath:'http://img.clubic.com/07530127-photo-watson-ibm.jpg',
    title:'Watson',
    description: 'Watson est un programme informatique d\'intelligence artificielle conçu par IBM dans le but de répondre à des questions formulées en langage naturel. Il s\'intègre dans un programme de développement plus vaste, le DeepQA research project !',
    priceHT: 250000,
    entreprise:'IBM'
  }),
  new Product({
    imagePath:'http://www.kinews.net/news/photo/201705/107160_155291_3918.png',
    title:'Alphago',
    description: 'Alphago est un programme d\'intelligence artificielle développé par Google. Il est conçu pour jouer au jeu de Go, un célèbre jeu asiatique d\'une grande complexité, c\'est à aujourd\'hui le seul programme capable de rivaliser avec l\'homme.',
    priceHT: 200000,
    entreprise:'Google'
  }),
  new Product({
    imagePath:'http://imagesvc.timeincapp.com/v3/foundry/image/?q=70&w=1440&url=http%3A%2F%2Fd254andzyoxz3f.cloudfront.net%2Fwaymo-google-self-driving-car-autonomous-hero.jpg',
    title:'Waymo',
    description: 'La voiture autonome dévellopé par Google, sûrement le futur de tout les moyens de transports !',
    priceHT: 350000,
    entreprise:'Google'
  }),
  new Product({
    imagePath:'https://inside.news/wp-content/uploads/2016/09/ibm-connie.jpg',
    title:'Connie',
    description:'Connie est un robot indépendant permettant d\'assurer la conciergerie dans les hôtels les plus prestigieux. Il est capable de gérer les réservations ainsi que les moindres demandes des clients.',
    priceHT:125000,
    entreprise:'IBM'
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

var users=[
  new User({
    email:'test@test.com',
    password: 'azerty',
    nom: 'Testeur',
    prenom: 'Premier',
    date_naissance: '26/07/1994'
  }),
  new User({
    email:'test@test.fr',
    password: 'password',
    entreprise: 'Unknown'
  })
];
var done1=0;
for (var j =0; j<users.length; j++){
  users[j].save(function(err,result){
    done1++;
    if(done1===users.length)
    {
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect;
}
