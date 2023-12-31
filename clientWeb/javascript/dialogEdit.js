/*------------------------------------------------------------------*\
   dialogEdit.js

   brief: Verwaltung des Artikel-Bearbeiten-Dialoges
\*------------------------------------------------------------------*/

$.widget("webdev.dialogEdit", $.ui.dialog, 
{
   /*------------------------------------------------------------------*\
   |  Optionen
   \*------------------------------------------------------------------*/
   options: 
   {
      autoOpen : false,
      modal    : false,
      buttons  : [{ text: "Bestätigen"}, {text: "Abbrechen"}],
      width    : 550
   },

   /*------------------------------------------------------------------*\
   |  Konstruktor
   \*------------------------------------------------------------------*/
   _create: function()
   {
      var dialogEdit = this;
      var btnOk      = this.options.buttons[0];
      var btnCancel  = this.options.buttons[1];

      dialogEdit.element.find("#infoValidation").hide();
      
      /*------------------------------------------------------------------*\
      |  Combobox vorbefüllen
      \*------------------------------------------------------------------*/
      $.ajax(
      {
         url         : '/webdev/clientWeb/itemCategoryList',
         dataType    : 'json',
         success     : function (itemCategoryList)
                        {
                           var cbCategory = dialogEdit.element.find("#cbCategoryName");

                           cbCategory.find("option").remove();

                           for (var i = 0; i < itemCategoryList.length; i++) 
                           {
                              var category = itemCategoryList[i];

                              cbCategory.append("<option value='" + category.categoryId +"'>" + category.categoryName + "</option>");
                           }
                        }
      });

      /*------------------------------------------------------------------*\
      |  Abbrechen wurde geklickt
      \*------------------------------------------------------------------*/
      btnCancel.click = function()
      {
         dialogEdit.close();

         dialogEdit.element.find("#infoValidation").empty().fadeOut();
         dialogEdit.element.find("#fieldName").removeClass("ui-state-error-text");
      }

      /*------------------------------------------------------------------*\
      |  OK wurde geklickt
      \*------------------------------------------------------------------*/
      btnOk.click = function()
      {
         var item = 
         {
            name              : dialogEdit.element.find("#fieldName").val(),
            categoryId        : dialogEdit.element.find("#cbCategoryName").val(),
            categoryName      : dialogEdit.element.find("#cbCategoryName option:selected").text(),
            descriptionShort  : dialogEdit.element.find("#fieldDescriptionShort").val(),
            descriptionLong   : dialogEdit.element.find("#fieldDescriptionLong").val(),
            price             : dialogEdit.element.find("#fieldPrice").val().replace(/[^0-9.-]+/g,""),
         };
         
         if (   typeof dialogEdit._item !== 'undefined'
             && typeof dialogEdit._item.url !== 'undefined'
             && dialogEdit._item.url.length > 0)
         {
            // Nur PUT versuchen, wenn sich der Artikel verändert hat
            if (   item.name              != dialogEdit._item.name
                || item.categoryName      != dialogEdit._item.categoryName
                || item.descriptionShort  != dialogEdit._item.descriptionShort
                || item.descriptionLong   != dialogEdit._item.descriptionLong
                || item.price             != dialogEdit._item.price)
            {
               $.ajax(
               {
                  type     : "PUT",
                  url      : dialogEdit._item.url,
                  data     : item,
                  success  : function()
                              {
                                 dialogEdit.close();
                                 dialogEdit.element.trigger("onItemEdited");
                              },
                  error    : function(response)
                              {
                                 if(response.status == 400)
                                 {
                                    var validationMessages = $.parseJSON(response.responseText);
                                    dialogEdit.element.find("#infoValidation").text(validationMessages.name).fadeIn(500);
                                    dialogEdit.element.find("#fieldName").addClass("ui-state-error-text").focus();
                                 }
                                 else
                                 {
                                    dialogEdit.element.find("#infoValidation").fadeOut(500).empty();
                                    dialogEdit.element.find("#fieldName").removeClass("ui-state-error-text");
                                 }
                              }
                  });
            }
            else
            {
               dialogEdit.close();
            }
         }
         else
         {
            $.ajax(
            {
               type     : "POST",
               url      : '/webdev/clientWeb/itemList',
               data     : item,
               success  : function()
                           {
                              dialogEdit.close();
                              dialogEdit.element.trigger("onItemAdded");
                           },
               error    : function(response)
                           {
                              if(response.status == 400)
                              {
                                 var validationMessages = $.parseJSON(response.responseText);
                                 dialogEdit.element.find("#infoValidation").text(validationMessages.name).fadeIn(500);
                                 dialogEdit.element.find("#fieldName").addClass("ui-state-error-text").focus();
                              }
                              else
                              {
                                    dialogEdit.element.find("#infoValidation").empty().fadeOut(500);
                                 dialogEdit.element.find("#fieldName").removeClass("ui-state-error-text");
                              }
                           }
            });
         }

      };

      /*------------------------------------------------------------------*\
      |  Eingabe im Namensfeld
      \*------------------------------------------------------------------*/
      var inputName = dialogEdit.element.find("#fieldName");
      inputName.on('change, keyup', function()
      {
         var inputCurrent = inputName.val();

         if (   inputCurrent.length > 0
             && inputName.hasClass('ui-state-error-text'))
         {
            dialogEdit.element.find("#infoValidation").fadeOut(500).empty();
            inputName.removeClass("ui-state-error-text");
         }
      });

      /*------------------------------------------------------------------*\
      |  Eingabe im Währungsfeld
      \*------------------------------------------------------------------*/
      var inputCurrency = dialogEdit.element.find("#fieldPrice");
      inputCurrency.on('change, keyup', function() 
      {
         var inputCurrent = inputCurrency.val();
         var inputFixed   = inputCurrent.replace(/[A-Za-z!@#$%^&*()]/g, '');

         if (inputFixed.endsWith('€') == false)
         {
            inputFixed = inputFixed.replace("€", "");
            inputFixed += '€';
         }

         inputCurrency.val(inputFixed);
      });

      dialogEdit._super();
   },

   /*------------------------------------------------------------------*\
   |  Dialog öffnen
   \*------------------------------------------------------------------*/
   open: function(item) 
   {
      this._super();

      if (item)
      {
         this._item = item;
         this.element.find("#fieldName").val(item.name);
         this.element.find("#fieldDescriptionShort").val(item.descriptionShort);
         this.element.find("#fieldDescriptionLong").val(item.descriptionLong);
         this.element.find("#fieldPrice").val(item.price + "€");

         this.element.find("#cbCategoryName").val(item.categoryId);
      }
      else
      {
         this.element.find("#fieldName").val("").attr("placeholder", "Artikelname");
         this.element.find("#fieldDescriptionShort").val("").attr("placeholder", "Kurzbeschreibung");
         this.element.find("#fieldDescriptionLong").val("").attr("placeholder", "Details");
         this.element.find("#fieldPrice").val("").attr("placeholder", "Preis");

         this.element.find("#cbCategoryName").val(1);
      }
},
})