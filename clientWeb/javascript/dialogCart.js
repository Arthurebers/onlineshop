/*------------------------------------------------------------------*\
   dialogCart.js

   brief: Verwaltung des Shoppingcart Dialoges
\*------------------------------------------------------------------*/

$.widget("webdev.dialogCart", $.ui.dialog, 
{
   /*------------------------------------------------------------------*\
   |  Optionen
   \*------------------------------------------------------------------*/
   options: 
   {
      autoOpen : false,
      modal    : true,
      buttons  : [{ text: "Schließen"}],
      width    : "auto"
   },

   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var dialogCart = this;
      var btnClose   = this.options.buttons[0];
      
      /*------------------------------------------------------------------*\
      |  Schließen wurde geklickt
      \*------------------------------------------------------------------*/
      btnClose.click = function()
      {
         dialogCart.close();
      }
      
      dialogCart._super();
   },

   /*------------------------------------------------------------------*\
   |  Dialog öffnen
   \*------------------------------------------------------------------*/
   open: function() 
   {
      this._super();
      this.element.find(".cartItem:not(.itemTemplate)").remove();

      if (typeof this._itemList != 'undefined')
      {
         var itemElementPrev = this.element.find(".itemTemplate");
         var sumTotal = 0.00;

         for (var i = 0; i < this._itemList.length; i++) 
         {
            var cartItem = this._itemList[i];
            var cartItemSum = Math.round(((cartItem.item.price * cartItem.amount) + Number.EPSILON) * 100)/100;

            var itemElementNew  = this.element.find(".itemTemplate")
                                              .clone()
                                              .removeClass("itemTemplate")
                                              .addClass("cartItem");

            itemElementNew.find(".name").text(cartItem.item.name);
            itemElementNew.find(".amount").text(cartItem.amount);
            itemElementNew.find(".price").text(cartItem.item.price);
            itemElementNew.find(".priceSum").text(cartItemSum.toFixed(2));

            itemElementPrev.parent().append(itemElementNew);

            sumTotal += cartItemSum;
         }

         this.element.find(".priceSumTotal").text(sumTotal.toFixed(2));

         this.element.find("table").show();
         this.element.find("#containterPriceSumTotal").show();
         this.element.find("#cartEmpty").hide();
      }
      else
      {
         this.element.find("table").hide();
         this.element.find("#containterPriceSumTotal").hide();
         this.element.find("#cartEmpty").show();
      }
   },

   /*------------------------------------------------------------------*\
   |  Artikel hinzufügen
   \*------------------------------------------------------------------*/
   addItem: function(itemToAdd)
   {
      var itemFound = false;

      if (typeof this._itemList === 'undefined')
      {
         var itemList = [];
         this._itemList = itemList;
      }

      for (var i = 0; i < this._itemList.length; i++) 
      {
         var cartItem = this._itemList[i];

         if (   cartItem.item.name == itemToAdd.name
             && cartItem.item.categoryId == itemToAdd.categoryId
             && cartItem.item.price == itemToAdd.price)
         {
            // Item liegt schon im Warenkorb
            cartItem.amount ++;

            itemFound = true;
            break;
         }
      };

      if (itemFound == false)
      {
         this._itemList.push({item: itemToAdd, amount:1})
      }
   },
})