var app = new Vue(
{
   el: '#app',
   vuetify: new Vuetify({theme: { dark: true },}),
   data: 
   {
      itemUrl: "/webdev/clientWeb/itemList",
      errorOccured: false,
      errorMessage: "",
      headersItemList: 
      [{
         text: 'Artikelname',
         value: 'name',
         sortable: false,
      },
      {
         text: 'Kategorie',
         value: 'categoryName',
         sortable: false
      },
      {
         text: 'Kurzbeschreibung',
         value: 'descriptionShort',
         sortable: false
      },
      {
         text: 'Preis/Stück',
         value: 'price',
         sortable: false
      },
      {
         text: 'Aktionen',
         value: 'actions',
         sortable: false
      },],

      headersItemListInCart:
      [{
         text: 'Artikelname',
         value: 'item.name',
         sortable: false
      },
      {
         text: 'Menge',
         value: 'amount',
         sortable: false
      },
      {
         text: 'Preis/Stück',
         value: 'price',
         sortable: false
      },
      {
         text: 'Summe',
         value: 'sum',
         sortable: false
      },],

      itemSelected: null,
      items: [],
      itemsInCart: [],
      itemsInCartCount: 0,
      itemSum: 0,

      dialogConfirmDelete: false,
      dialogDetails:false,
      dialogCart:false,
   },
      
   created() 
   {
      this.loadItems();
   },

   methods: 
   {
      loadItems() 
      {
         axios.get(this.itemUrl)
              .then(response =>  
               {
                  this.items = [];

                  response.data.forEach((item, index) => 
                  {
                     this.items.push(item);
                  })
               })
              .catch(error => 
               {
                  this.errorMessage = error.message;
                  this.errorOccured = true;
               });
      },

      onClickItemView(item) 
      {
         axios.get(item.url)
              .then(response => 
               {
                  this.itemSelected       = response.data;
                  this.itemSelected.url   = item.url;
                  this.dialogDetails      = true;
               })
              .catch(error => 
               {
                  this.errorMessage       = error.message;
                  this.errorOccured       = true;
                  this.dialogDetails      = false;
               });
      },

      onClickItemDelete(item) 
      {
         this.itemSelected          = item;
         this.dialogConfirmDelete   = true;
      },

      onClickItemDeleteApprove()
      {
         axios.delete(this.itemSelected.url)
              .then(response => 
               {
                  this.itemSelected = null;
                  this.loadItems();
               })
              .catch(error => 
               {
                  this.errorMessage = error.message;
                  this.errorOccured = true;
               });

         this.dialogConfirmDelete   = false;
      },

      onClickAddToShoppingCart(itemNew) 
      {
         itemFound = false;

         this.itemsInCart.every(cartItem => 
         {
            if (   itemNew.name         == cartItem.item.name
                && itemNew.categoryName == cartItem.item.categoryName
                && itemNew.price        == cartItem.item.price)
            {
               cartItem.amount++;
               cartItem.priceSum = parseFloat(cartItem.amount * cartItem.item.price).toFixed(2);
               itemFound = true;
               return false;
            }

            return true;
         })

         if(itemFound == false)
         {
            this.itemsInCart.push({item: itemNew, amount:1, priceSum: itemNew.price})
         }

         this.itemsInCartCount++;
         this.itemSum = (parseFloat(this.itemSum) + parseFloat(itemNew.price)).toFixed(2);
      }
   }
});