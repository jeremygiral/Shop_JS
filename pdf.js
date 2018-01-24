var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./views/user/profile.hbs', 'utf8');
var options = { format: 'Letter' };

pdf.create(html, options).toFile('./public/businesscard.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});


var Handlebars = require('handlebars');

var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);


var fs = require('fs');
    fs.writeFile("test.html", result, function(err) {
    if(err) {
        return console.log(err);
    }
});
