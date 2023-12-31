/*------------------------------------------------------------------*\
   dialogError.js

   brief: Verwaltung des Error Dialog
\*------------------------------------------------------------------*/

$.widget("webdev.dialogError", $.ui.dialog, 
{
   /*------------------------------------------------------------------*\
   |  Optionen
   \*------------------------------------------------------------------*/
   options: 
   {
      autoOpen : false,
      modal    : true,
      buttons  : [{text: "Schließen"}]
   },

   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var dialogError = this;
      var btnClose    = dialogError.options.buttons[0];
      
      btnClose.click = function()
      {
         dialogError.close();
      };
      
      dialogError._super();
   },

   /*------------------------------------------------------------------*\
   |  Dialog öffnen
   \*------------------------------------------------------------------*/
   open: function(message) 
   {
      this.element.find("#message").text(message);
      this._super();
   }
})