/*------------------------------------------------------------------*\
   dialogDelete.js

   brief: Verwaltung des Löschen-Dialoges
\*------------------------------------------------------------------*/

$.widget("webdev.dialogDelete", $.ui.dialog, 
{
   /*------------------------------------------------------------------*\
   |  Optionen
   \*------------------------------------------------------------------*/
   options: 
   {
      autoOpen : false,
      modal    : true,
      buttons  : [{text: "Löschen"}, {text: "Abbrechen"}],
      width    : 450
   },

   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var dialogDelete = this;
      var btnOk        = this.options.buttons[0];
      var btnCancel    = this.options.buttons[1];

      /*------------------------------------------------------------------*\
      |  Abbrechen wurde geklickt
      \*------------------------------------------------------------------*/
      btnCancel.click = function()
      {
         dialogDelete.close();
      }

      /*------------------------------------------------------------------*\
      |  Abbrechen wurde geklickt
      \*------------------------------------------------------------------*/
      btnOk.click = function()
      {
         $.ajax(
         {
            url      : dialogDelete._itemUrl,
            type     : "DELETE",
            success  : function() {dialogDelete.element.trigger("onItemDeleted");},
            context  : this
         });

         dialogDelete.close();
      }
      
      dialogDelete._super();
   },

   /*------------------------------------------------------------------*\
   |  Dialog öffnen
   \*------------------------------------------------------------------*/
   open: function(itemUrl) 
   {
      this._super();
      this._itemUrl = itemUrl;
   }
})