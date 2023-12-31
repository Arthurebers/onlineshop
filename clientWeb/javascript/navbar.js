/*------------------------------------------------------------------*\
   navbar.js

   brief: Verwaltung der Navigationsbar
\*------------------------------------------------------------------*/
$.widget("webdev.navbar",
{
   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var navbar = this;

      /*------------------------------------------------------------------*\
      |  Warenkorb anzeigen wurde geklickt
      \*------------------------------------------------------------------*/
      this.element.find("#cartShow").click(function()
      {
         navbar.element.trigger("onClickCartShow");
      })

      /*------------------------------------------------------------------*\
      |  Artikel anlegen wurde geklickt
      \*------------------------------------------------------------------*/
      this.element.find("#itemCreate").click(function()
      {
         navbar.element.trigger("onClickItemCreate");
      })
   }
});