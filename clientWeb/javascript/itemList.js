/*------------------------------------------------------------------*\
   itemList.js

   brief: Verwaltung der Funktionen der Artikelliste
\*------------------------------------------------------------------*/
$.widget("webdev.itemList", 
{
   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function () 
   {
      var itemListElement        = this;
      var selectors              = itemListElement.element.find("#selectorsItemList");
      var selectorItemsPerPage   = selectors.find("#selectorItemsPerPage");
      var selectorPage           = selectors.find("#selectorPage");
      var btnPagePrevious        = selectors.find(".pagePrevious");
      var btnPageNext            = selectors.find(".pageNext");

      itemListElement._itemsPerPage = selectorItemsPerPage.val();
      
      selectors.find("#containerSelectorPage").hide();

      /*------------------------------------------------------------------*\
      |  Artikel pro Seite wurde verändert
      \*------------------------------------------------------------------*/
      selectorItemsPerPage.change(function()
      {
         itemListElement._itemsPerPage = selectorItemsPerPage.find("option:selected").val();
         selectors.find("#containerSelectorPage").hide();
         itemListElement.reload();
      });

      /*------------------------------------------------------------------*\
      |  Seite wurde verändert
      \*------------------------------------------------------------------*/
      selectorPage.change  (function()
      {
         itemListElement.selectPage(selectorPage.find("option:selected").val())
      });

      btnPagePrevious.click(function()
      {
         itemListElement.selectPagePrevious()
      });

      btnPageNext.click(function()
      {
         itemListElement.selectPageNext()
      });

      itemListElement.reload();
   },
   
   /*------------------------------------------------------------------*\
   |  Neu laden aller Artikel
   \*------------------------------------------------------------------*/
   reload: function()
   {
      $.ajax(
      {
         type     : "get",
         url      : "/webdev/clientWeb/itemList",
         dataType : "json",
         success  : function (response) 
                     {
                        this._itemsPerPage = this.element.find("#selectorItemsPerPage").val();

                        if (this._itemsPerPage * this._page > response.length)
                        {
                           this._page = Math.ceil(response.length / this._itemsPerPage);
                        }

                        this.element.find(".item:not(.itemTemplate)").remove();
                        this._appendItemList(response);
                     },
         context  : this
      });
   },

   /*------------------------------------------------------------------*\
   |  Öffnet die Seite mit der ID
   \*------------------------------------------------------------------*/
   selectPage: function (pageId)
   {
      if (   pageId >= 1
          && pageId <= this._pageCount)
      {
         this._page = pageId;
         this.element.find("#selectorPage").val(pageId);
         this.reload();
      }
   },

   /*------------------------------------------------------------------*\
   |  Öffnet die nächste Seite
   \*------------------------------------------------------------------*/
   selectPageNext: function ()
   {
      if (++this._page > this._pageCount)
      {
         this._page = this._pageCount;
      }
      else
      {
         this.selectPage(this._page);
      }
   },

   /*------------------------------------------------------------------*\
   |  Öffnet die vorherige Seite
   \*------------------------------------------------------------------*/
   selectPagePrevious: function ()
   {
      if (--this._page < 1)
      {
         this._page = 1;
      }
      else
      {
         this.selectPage(this._page);
      }
   },

   /*------------------------------------------------------------------*\
   |  Füge die übergebene Liste in das HTML-Dokument ein
   \*------------------------------------------------------------------*/
   _appendItemList: function(itemList) 
   {
      var itemListElement        = this;
      var selectors              = itemListElement.element.find("#selectorsItemList");
      var itemElementPrev        = itemListElement.element.find(".itemTemplate");

      if (itemListElement._itemsPerPage == -1 || itemListElement._itemsPerPage >= itemList.length)
      {
         itemListElement._itemsPerPage = itemList.length;

         selectors.find("#containerSelectorPage").hide();

         itemListElement._page = 1;
         itemListElement._pageCount = 1;
      }
      else if (selectors.find("#containerSelectorPage").is(":hidden"))
      {
         itemListElement._pageCount = Math.ceil(itemList.length / itemListElement._itemsPerPage);

         selectors.find("#selectorPage option").remove();

         for (var i = 0; i < itemListElement._pageCount; i++) 
         {
            selectors.find("#selectorPage").append('<option value = "' + (i + 1) +'">' + (i + 1) +'</option>');
         }

         selectors.find("#containerSelectorPage").show();
      }

      var maxIter = itemListElement._itemsPerPage;
      if (itemListElement._itemsPerPage * itemListElement._page > itemList.length)
      {
         maxIter = itemListElement._itemsPerPage - ((itemListElement._itemsPerPage * itemListElement._page) % itemList.length);
      }

      for (var i = 0; i < maxIter; i++) 
      {
         var item = itemList[(itemListElement._itemsPerPage * (itemListElement._page - 1)) + i];

         var itemElementNew  = itemListElement.element.find(".itemTemplate")
                                                      .clone()
                                                      .removeClass("itemTemplate")
                                                      .addClass("item");

         itemElementNew.find(".name").text(item.name);
         itemElementNew.find(".categoryName").text(item.categoryName);
         itemElementNew.find(".descriptionShort").text(item.descriptionShort);
         itemElementNew.find(".price").text(item.price);


         /*------------------------------------------------------------------*\
         |   Artikel wurde angeklickt
         \*------------------------------------------------------------------*/
         itemElementNew.click(item.url, function(event)
         {
            $(this).trigger("onClickItem", event.data);
         });

         /*------------------------------------------------------------------*\
         |   "Artikel editieren" wurde angeklickt
         \*------------------------------------------------------------------*/
         itemElementNew.find(".itemEdit").click(item, function(event)
         { 
            $(this).trigger("onClickItemEdit", event.data);

            // Verhindern, dass onClickItem ausgelöst wird
            event.stopPropagation();
         });

         /*------------------------------------------------------------------*\
         |   "Artikel löschen" wurde angeklickt
         \*------------------------------------------------------------------*/
         itemElementNew.find(".itemDelete").click(item.url, function(event)
         {   
            $(this).trigger("onClickItemDelete", event.data);

            // Verhindern, dass onClickItem ausgelöst wird
            event.stopPropagation();
         });

         /*------------------------------------------------------------------*\
         |   "Artikel zum Warenkorb hinzufügen" wurde angeklickt
         \*------------------------------------------------------------------*/
         itemElementNew.find(".itemAddToCart").click(item, function(event)
         {   
            $(this).trigger("onClickItemAddToCart", event.data);
            
            // Verhindern, dass onClickItem ausgelöst wird
            event.stopPropagation();
         });

         itemElementPrev.parent().append(itemElementNew);
      }
   },
});
