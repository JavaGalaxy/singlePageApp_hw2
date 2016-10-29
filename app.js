(function (){

  angular.module('CtrlServiceApp', [])
  	.controller('ToBuyController', ToBuyController)
  	.controller('AlreadyBoughtController', AlreadyBoughtController)
  	.service('ShoppingListCheckOffList', ShoppingListCheckOffList)
  ;

  ToBuyController.$inject = ['ShoppingListCheckOffList'];

  function ToBuyController (ShoppingListCheckOffList) {

  	var toBuy = this;
  	
	toBuy.value = "";

  	toBuy.items = [{name : 'Milk', quantity : 5},
  				   {name : 'Sugar', quantity : 10},
  				   {name : 'Banana', quantity : 20},
  				   {name : 'Coffee', quantity : 10},
  				   {name : 'Ice-Cream', quantity : 10}];

  	toBuy.boughtItem = function(index) {
  		
  		ShoppingListCheckOffList.addItems(toBuy.items[index].name, toBuy.items[index].quantity);

  		toBuy.items.splice(index, 1);
  		if (toBuy.items.length == 0) {
  			toBuy.value = 'new';
  		};
  	};
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffList'];

  function AlreadyBoughtController(ShoppingListCheckOffList) {

  	var bought = this;
  	bought.items = [];
  	bought.name = "";
	bought.quantity = "";
	var item;

	item = ShoppingListCheckOffList.readList();
  	bought.items.push(item);
  	
  };

  function ShoppingListCheckOffList() {
  	checkList = this;
  	checkList.items =[];
  	var item;
  	
  	checkList.readList = function () {
  		console.log('The list and index : '+checkList.items[0]);
  		return checkList.items;
  	}

  	checkList.addItems = function(name, quantity) {
  			console.log('Inside service addItems name : '+name+" and quantity : "+quantity);
  			item = { name : name, quantity : quantity};
  			
  			checkList.items.push(item);
  			checkList.readList();
  	};

  };

})()