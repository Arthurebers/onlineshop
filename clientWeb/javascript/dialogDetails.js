/*------------------------------------------------------------------*\
   dialogDetails.js

   brief: Verwaltung des Artikeldetail-Dialoges
\*------------------------------------------------------------------*/

$.widget("webdev.dialogDetails", $.ui.dialog,
{
   /*------------------------------------------------------------------*\
   |  Optionen
   \*------------------------------------------------------------------*/
   options: 
   {
      autoOpen : false,
      modal    : true,
      buttons  : [{text: "Schließen"}],
      width    : 450,
   },

   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var dialogDetails = this;
      var btnClose      = this.options.buttons[0];
      
      btnClose.click = function() {dialogDetails.close();};

      dialogDetails._super();
   },

   /*------------------------------------------------------------------*\
   |  Dialog öffnen
   \*------------------------------------------------------------------*/
   open: function(item) 
   {
      this._super();
      this._item = item
      this.element.find(".name").text(item.name);
      this.element.find(".categoryName").text(item.categoryName);
      this.element.find(".descriptionShort").text(item.descriptionShort);
      this.element.find(".descriptionLong").text(item.descriptionLong);
      this.element.find(".price").text(item.price);
   },

   /*------------------------------------------------------------------*\
   |  Artikel aus Url laden
   \*------------------------------------------------------------------*/
   load: function(itemUrl)
   {
      $.ajax(
      {
         url      : itemUrl,
         dataType : "json",
         success  : function(item) {this.open(item);},
         context  : this
      });
   },
})