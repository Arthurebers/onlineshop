<?php
/*------------------------------------------------------------------*\
   Item.php

   brief: Helferklassen für die Verwaltung der Artikel 
\*------------------------------------------------------------------*/


   /*------------------------------------------------------------------*\
   |   Klasse für die Kategorien
   \*------------------------------------------------------------------*/
   class ItemCategory
   {
      public $categoryId;
      public $categoryName;
   }

   /*------------------------------------------------------------------*\
   |   Klasse für Items
   \*------------------------------------------------------------------*/
   class Item
   {
      public $name;
      public $categoryId;
      public $categoryName;
      public $descriptionShort;
      public $descriptionLong;
      public $price;
      public $url;
   }
?>