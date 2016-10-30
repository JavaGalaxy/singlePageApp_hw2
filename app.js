( function () {

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
  	var ToBuy = this;
  	ToBuy.key = 'Yes';

  	ToBuy.items = [{ name : 'Milk', quantity : 5}, 
  				   { name : 'Sugar', quantity : 10},
  				   { name : 'Egg', quantity : 8},
  				   { name : 'Cookies', quantity : 15},
  				   { name : 'Ice-Cream', quantity : 7}];

  	ToBuy.addItems = function(index) {
  			ShoppingListCheckOffService.addAndRemoveItems(index, ToBuy.items);
  			console.log("Length "+ToBuy.items.length)
  			if(ToBuy.items.length == 0) {
  				ToBuy.key = 'No';console.log('KEY '+ToBuy.key);
  			}

  	};

  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
  	var AlBought = this;
  	AlBought.items = [];
  	AlBought.key = 'Yes';
   

  	AlBought.getList = function() {

  		var item = ShoppingListCheckOffService.getItems();
  		
  		AlBought.items.push(item);
		if (AlBought.items.length > 2) {
			
			AlBought.key = 'No';
			
		}
  		return item;
  	};
  	
  };

  function ShoppingListCheckOffService() {
  	var service = this;
  	service.items = [];

  	service.addAndRemoveItems = function(index, ToBuyItems) {
		
  		// Add Items to AlreadyBoughtController
  		var item = {
				name : ToBuyItems[index].name,
				quantity : ToBuyItems[index].quantity
			};
  		
		// console.log("The item :"+item.name);
  		service.items.push(item);  		

  		//Delete Item from ToBuyController
		ToBuyItems.splice(index, 1);
  		

  	};

  	service.getItems = function() {
  		console.log('The items in service are  '+service.items);
  		return service.items;
  	}

  };

})()