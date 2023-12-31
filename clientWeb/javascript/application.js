/*------------------------------------------------------------------*\
   application.js

   brief: Hauptprogramm
\*------------------------------------------------------------------*/

$(function() 
{
   /*------------------------------------------------------------------*\
   |   Abhandeln von Fehlern
   \*------------------------------------------------------------------*/
   $(document).ajaxError(function(event, response) 
   {
      if (response.status == 400) {return;}

      $("#dialogError").dialogError("open", response.statusText);
      
      if (response.status == 404) {$("#itemList").itemList("reload");}
   });

   /*------------------------------------------------------------------*\
   |   Start der Applikation
   \*------------------------------------------------------------------*/
   $(document).ajaxStart(function() 
   {
      $.blockUI({message: null});
   });

   /*------------------------------------------------------------------*\
   |   Stopp der Applikation
   \*------------------------------------------------------------------*/
   $(document).ajaxStop(function() 
   {        
      $.unblockUI();
   });

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen für die Navigationsbar
   \*------------------------------------------------------------------*/
   $("#navbar").navbar().on("onClickCartShow", function(event)
   {
      $("#dialogCart").show();
      $("#dialogCart").dialogCart("open");
   });

   $("#navbar").navbar().on("onClickItemCreate", function(event)
   {
      $("#dialogEdit").show();
      $("#dialogEdit").dialogEdit("open");
   });

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen der Artikelliste
   \*------------------------------------------------------------------*/
   $("#itemList").itemList().on("onClickItem", function(event, itemUrl)
   {
      $("#dialogDetails").show();
      $("#dialogDetails").dialogDetails("load", itemUrl);
   });

   $("#itemList").itemList().on("onClickItemEdit", function(event, item)
   {
      $("#dialogEdit").show();
      $("#dialogEdit").dialogEdit("open", item);
   });

   $("#itemList").itemList().on("onClickItemDelete", function(event, itemUrl)
   {
      $("#dialogDelete").show();
      $("#dialogDelete").dialogDelete("open", itemUrl);
   });

   $("#itemList").itemList().on("onClickItemAddToCart", function(event, item)
   {
      $("#dialogCart").dialogCart("addItem", item);

      var count = $("#labelItemCount").text();

      $("#labelItemCount").text(++count);
   });

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen des Warenkorb Dialoges
   \*------------------------------------------------------------------*/
   $('#dialogCart').dialogCart();

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen des Dialoges für Artikeldetails
   \*------------------------------------------------------------------*/
   $("#dialogDetails").dialogDetails();

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen des Dialoges für die Artikelbearbeitung
   \*------------------------------------------------------------------*/
   $("#dialogEdit").dialogEdit().on("onItemEdited", function(event) 
   {
      $("#itemList").itemList("reload"); 
   })

   $("#dialogEdit").dialogEdit().on("onItemAdded", function(event) 
   {
      $("#itemList").itemList("reload"); 
   })

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen des Dialoges zum Löschen von Artikeln
   \*------------------------------------------------------------------*/
   $("#dialogDelete").dialogDelete().on("onItemDeleted", function (event)
   {
      $("#itemList").itemList("reload"); 
   });

   /*------------------------------------------------------------------*\
   |   Zusatzfunktionen des Dialoges für Fehler
   \*------------------------------------------------------------------*/
   $('#dialogError').dialogError();

   /*------------------------------------------------------------------*\
   |   Fadeout, wenn die Seite geladen ist
   \*------------------------------------------------------------------*/
   $("#hideAll").fadeOut(1000);
});