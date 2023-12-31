<!DOCTYPE html>
<?php
   require "ClientWeb.php";
   $clientWeb = new ClientWeb();

   $itemList = $clientWeb->ReadItemList(); 
?>

<html>
   <!--------------------------------------------------------------------->
   <!-- Head                                                            -->
   <!--------------------------------------------------------------------->
   <head>
      <!-- Metadaten -->
      <meta charset="utf-8"/>
      <title>Online-Shop</title>
      
      <!-- Externe Styles -->
      <!-- jQuery -->
      <link rel="stylesheet" href="/webdev/css/jquery-ui-1.13.2.custom/jquery-ui.css" />

      <!-- Eigene Styles -->
      <link rel="stylesheet" href="/webdev/css/styles.css" />
      <link rel="stylesheet" href="/webdev/css/styles.classes.css" />
      <link rel="stylesheet" href="/webdev/css/styles.id.css" />
  
      <!-- Externe Scripts -->
      <!-- jquery -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.js" ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"></script>

      <!-- Font Awesome -->
      <script src="https://kit.fontawesome.com/f633786305.js" crossorigin="anonymous"></script>

      <!-- Eigene Scripts -->

      <script src="javascript/dialogCart.js"></script>
      <script src="javascript/dialogDetails.js"></script>
      <script src="javascript/dialogEdit.js"></script>
      <script src="javascript/dialogDelete.js"></script>
      <script src="javascript/dialogError.js"></script> 
    
      <script src="javascript/navbar.js"></script>
      <script src="javascript/itemList.js"></script>
      <script src="javascript/application.js"></script> 
   </head>

   <!--------------------------------------------------------------------->
   <!-- Body                                                            -->
   <!--------------------------------------------------------------------->
   <body>
      <!-- Zeige Seite erst, wenn alles geladen ist -->
      <div id="hideAll" class="alignCenter"><span>Die Seite lädt gerade...</span></div>

      <!-- Navbar -->
      <header>
         <nav>
            <ul id="navbar">
               <a id="home" class="hoverable" href=""><li><i class="fa-solid fa-house fa-xl"></i></li></a>
               <a id="cartShow" class="hoverable"><li><i class="fa-solid fa-cart-shopping fa-xl"><span id ="labelItemCount" class="hideEmpty"></span></i></li></a>
               <a id="itemCreate" class="hoverable"><li>Neuer Artikel</li></a>
            </ul>
         </nav>
      </header>

      <!-- Artikelliste -->
      <div id="itemList">
         <div id="selectorsItemList">
            <span id="containerSelectorItemsPerPage">          
               <select id="selectorItemsPerPage">
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='-1' selected="selected">Alle</option>
               </select>
               <label for="selectorItemsPerPage"> Artikel pro Seite</label>
            </span>
            <span id="containerSelectorPage">  
               <i class="pagePrevious hoverable fa-sharp fa-solid fa-circle-left"></i>
               <select id="selectorPage"></select>
               <i class="pageNext hoverable fa-sharp fa-solid fa-circle-right"></i>
            </span>
         </div>

         <table>
            <tr>
               <th>Artikelname</th>
               <th>Kategorie</th>
               <th>Kurzbeschreibung</th>
               <th class="alignRight">Preis</th>
               <th class="alignCenter">Hinzufügen</th>
               <th class="alignCenter">Editieren</th>
               <th class="alignCenter">Löschen</th>
            </tr>

            <tr class="hoverable itemTemplate"> 
               <td class="name">Artikelname</td>
               <td class="categoryName">Kategorie</td>
               <td class="descriptionShort">Kurzbeschreibung</td>
               <td class="currency alignRight price">Preis</td>     
               <td class="itemAddToCart alignCenter"><i class="fa-solid fa-circle-plus"></i></td>
               <td class="itemEdit alignCenter"><i class="fa-solid fa-pencil"></i></td>
               <td class="itemDelete alignCenter"><i class="fa-solid fa-trash-can"></i></td>
            </tr>
         </table>
      </div>

      <!-- Dialog: Artikeldetails -->
      <div id="dialogDetails" title="Artikeldetails">
         <table id="summary">
            <tr>
               <th class="alignLeft">Artikelname:</td>
               <th class="alignLeft">Kategorie:</td>
               <th class="alignRight">Preis:</td>
            </tr>
            <tr>
               <td class="name alignLeft"></td>
               <td class="categoryName alignLeft"></td>
               <td class="currency price alignRight"></td>
            </tr>
         </table>

         <table>
            <tr>
               <td>Kurzbeschreibung:</td>
               <td class="descriptionShort"></td>
            </tr>
            <tr>
               <td>Details:</td>
               <td class="descriptionLong"></td>
            </tr>
         </table>   
      </div>

      <!-- Dialog: Editieren -->
      <div id="dialogEdit" title="Artikel bearbeiten">
         <p id="infoValidation" class="ui-state-error-text"></p> 
         <table id="summary">
            <tr>
               <th class="alignLeft">Artikelname:</td>
               <th class="alignLeft">Kategorie:</td>
               <th class="alignRight">Preis:</td>
            </tr>
            <tr>
               <td><input id="fieldName" class="name" type="text"/></td>
               <td><select id="cbCategoryName" class="categoryName" ></select></td>
               <td><input id="fieldPrice" class="currency" type="currency"/></td>
            </tr>
         </table>

         <table id="details">
            <tr>
               <th class="alignLeft">Kurzbeschreibung:</td>
               <td><textarea id="fieldDescriptionShort" class="descriptionShort"></textarea></td>
            </tr>
            <tr>
               <th class="alignLeft">Details:</td>
               <td><textarea id="fieldDescriptionLong" class="descriptionLong"></textarea></td>
            </tr>
         </table> 
      </div>

      <!-- Dialog: Löschen -->
      <div id="dialogDelete" title="Artikel löschen">
         <div>Soll der Artikel wirklich gelöscht werden?</div>
      </div>

      <!-- Dialog: Einkaufswagen -->
      <div id="dialogCart" title="Warenkorb">
         <table>
            <tr>
               <th>Artikelname</th>
               <th>Menge</th>
               <th class="alignRight">Preis/Stk</th>
               <th class="alignRight">Summe</th>
            </tr>

            <tr class="hoverable itemTemplate">
               <td class="name">Artikelname</td>
               <td class="amount alignRight">Menge</td>
               <td class="currency hideEmpty alignRight price">Preis/Stk</td>     
               <td class="currency hideEmpty alignRight priceSum">Summe</td>     
            </tr>
         </table> 

         <div id="containterPriceSumTotal" class="hoverable">
            <span class="alignLeft">Gesamtsumme:</span>
            <span id = "priceSumTotal" class="currency hideEmpty alignRight priceSumTotal"></span>     
         </div>
         
         <p id="cartEmpty">Bisher liegt nichts im Einkaufswagen</p>
      </div>

      <!-- Dialog: Fehler -->
      <div id="dialogError" title="Fehler"><p id="message"></p></div>
   </body>
</html>