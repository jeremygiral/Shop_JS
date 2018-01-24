module.exports = function Panier(oldPanier) {
    this.items = oldPanier.items || {};
    this.totalQty = oldPanier.totalQty || 0;
    this.totalPrice = oldPanier.totalPrice || 0 ;
    this.totalPriceHT = oldPanier.totalPriceHT || 0;

  this.add = function(item, id) {
    var storedItem = this.items[id];
    if(!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0,priceHT: 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price*storedItem.qty;
    storedItem.priceHT = storedItem.item.priceHT*storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
    this.totalPriceHT += storedItem.item.priceHT;
  };
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };

  this.reduce = function(item,id){
    var storedItem = this.items[id];
    if(storedItem.qty>1) {
      storedItem.qty=storedItem.qty-1;
      this.totalPrice = this.totalPrice - storedItem.item.price;
      storedItem.price = storedItem.item.price*storedItem.qty;
      this.totalPriceHT = this.totalPriceHT - storedItem.item.priceHT;
      storedItem.priceHT = storedItem.item.priceHT*storedItem.qty;
      this.totalQty=this.totalQty-1;
    }
    else {
      storedItem.qty=storedItem.qty-1;
      this.totalPrice = this.totalPrice - storedItem.item.price;
      storedItem.price = storedItem.item.price*storedItem.qty;
      this.totalPriceHT = this.totalPriceHT - storedItem.item.priceHT;
      storedItem.priceHT = storedItem.item.priceHT*storedItem.qty;
      this.totalQty=this.totalQty-1;
      delete this.items[id];
    }
  };

  this.remove = function(item,id){
    var storedItem = this.items[id];
    if(storedItem){
      this.totalPrice = this.totalPrice - storedItem.price;
      this.totalPriceHT = this.totalPriceHT - storedItem.priceHT;
      this.totalQty=this.totalQty-storedItem.qty;
      delete this.items[id];
    }
  };

};
