var Handlebars = require("handlebars/runtime");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['print.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<tr>\r\n  <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\r\n  <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.entreprise : stack1), depth0))
    + "</td>\r\n  <td>"
    + alias2(((helper = (helper = helpers.qty || (depth0 != null ? depth0.qty : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"qty","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias2(((helper = (helper = helpers.priceHT || (depth0 != null ? depth0.priceHT : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"priceHT","hash":{},"data":data}) : helper)))
    + " €</td>\r\n  <td>"
    + alias2(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"price","hash":{},"data":data}) : helper)))
    + " €</td>\r\n</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<!DOCTYPE html><html lang='en' class=''>\r\n<head><link rel=\"stylesheet\" href=\"http://localhost:3000/stylesheets/print.css\" type=\"text/css\"/>\r\n<script src='//production-assets.codepen.io/assets/editor/live/console_runner-079c09a0e3b9ff743e39ee2d5637b9216b3545af0de366d4b9aad9dc87e26bfd.js'></script><script src='//production-assets.codepen.io/assets/editor/live/events_runner-73716630c22bbc8cff4bd0f07b135f00a0bdc5d14629260c3ec49e5606f98fdd.js'></script><script src='//production-assets.codepen.io/assets/editor/live/css_live_reload_init-2c0dc5167d60a5af3ee189d570b1835129687ea2a61bee3513dee3a50c115a77.js'></script><meta charset='UTF-8'><meta name=\"robots\" content=\"noindex\"><link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"//production-assets.codepen.io/assets/favicon/favicon-8ea04875e70c4b0bb41da869e81236e54394d63638a1ef12fa558a4a835f1164.ico\" /><link rel=\"mask-icon\" type=\"\" href=\"//production-assets.codepen.io/assets/favicon/logo-pin-f2d2b6d2c61838f7e76325261b7195c27224080bc099486ddd6dccb469b8e8e6.svg\" color=\"#111\" /><link rel=\"canonical\"\r\nhref=\"https://codepen.io/joseroux/pen/ivCzd?editors=1000#0\" />\r\n<head>\r\n<meta charset=\"UTF-8\"/>\r\n<title>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.prenom : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.nom : stack1), depth0))
    + "</title>\r\n<link href=\"https://fonts.googleapis.com/css?family=Nunito:300|Raleway:200,300\" rel=\"stylesheet\" type=\"text/css\"/>\r\n</head>\r\n<body>\r\n<header>\r\n<h1>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\r\n<h2>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.prenom : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.nom : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.entreprise : stack1), depth0))
    + "</h2>\r\n</h1>\r\n</header>\r\n<section class=\"flex\">\r\n<dl>\r\n<dt>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " #</dt>\r\n<dd>"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "</dd>\r\n<dt>Date de facturation</dt>\r\n<dd>23/01/2018</dd>\r\n</dl>\r\n</section>\r\n<section class=\"flex\">\r\n<dl class=\"bloc\">\r\n<dt>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " à:</dt>\r\n<dd>\r\n  "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.entreprise : stack1), depth0))
    + " <br>\r\n  "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.adresse_livraisson : stack1), depth0))
    + "<br>\r\n  <dl>\r\n    <dt>Nom</dt>\r\n    <dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.prenom : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.nom : stack1), depth0))
    + "</dd>\r\n    <dt>Courriel</dt>\r\n    <dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + "</dd>\r\n  </dl>\r\n</dd>\r\n</dl>\r\n<dl class=\"bloc\">\r\n<dt>Description de service:</dt>\r\n<dd>Intelligence Artificielle</dd>\r\n</dl>\r\n</section>\r\n<table>\r\n<thead>\r\n<tr>\r\n  <th>Produit</th>\r\n  <th>Entreprise</th>\r\n  <th>Quantité</th>\r\n  <th>Prix Hors Taxes</th>\r\n  <th>Prix TTC</th>\r\n</tr>\r\n</thead>\r\n<tbody>\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\r\n<tfoot>\r\n<tr>\r\n  <td colspan=\"2\"><strong>Total</strong></td>\r\n  <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalQty : stack1), depth0))
    + "</td>\r\n  <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPriceHT : stack1), depth0))
    + " €</td>\r\n  <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPrice : stack1), depth0))
    + " €</td>\r\n</tr>\r\n</tfoot>\r\n</table>\r\n<footer>\r\n<p>Jérémy Giral – Informatique − Développement WEB | </p>\r\n<p>1777 some street in the woods, Utopia | Tél. 450-555-1000 | <a href=\"mailto:mail@me.com\">mail@me.com</a></p>\r\n</footer>\r\n</body>\r\n\r\n</body></html>\"\r\n";
},"useData":true});
