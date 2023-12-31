<?php
/*------------------------------------------------------------------*\
   ClientWeb.php

   brief: 
\*------------------------------------------------------------------*/
require "Item.php";
require "ItemCreateResult.php";

class ClientWeb
{
   const INVALID_INPUT  = "INVALID_INPUT";
   const OK             = "OK";
   const NOT_FOUND      = "NOT_FOUND";
   const DATABASE_ERROR = "DATABASE_ERROR";


   /*------------------------------------------------------------------*\
   |   Lese die Liste mit den Kategorien
   \*------------------------------------------------------------------*/
   public function ReadItemCategoryList()
   {
      try 
      {
         $connection       = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
         $selectStatement  = "SELECT itemCategories.id as categoryId, itemCategories.categoryName
                              FROM itemCategories";
         $resultSet        = $connection->query($selectStatement);
         $itemCategoryList = $resultSet->fetchAll(PDO::FETCH_CLASS, "itemCategory");

         $connection       = null;

         return $itemCategoryList;
      } 
      catch (PDOException $ex) 
      {
         $connection = NULL;
         error_log("Datenbankfehler: " . $ex->getMessage());
         return ClientWeb::DATABASE_ERROR;
      }
   } 

   /*------------------------------------------------------------------*\
   |   Liest den Artikel mit der Id aus Datenbank ein
   \*------------------------------------------------------------------*/
   public function ReadItem($id)
   {
      $connection      = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
      
      $selectStatement = "SELECT itemList.id, itemList.name, itemCategories.id as categoryId, itemCategories.categoryName, itemList.descriptionShort, itemList.descriptionLong, itemList.price
                          FROM itemList, itemCategories 
                          WHERE itemList.idCategory = itemcategories.id 
                          AND itemList.id = $id
                          ORDER BY itemList.id";

      $resultSet       = $connection->query($selectStatement);
    
      if ($resultSet->rowCount() === 0) 
      {
         $connection = NULL;
         return ClientWeb::NOT_FOUND;
      }

      $item       = $resultSet->fetchObject("item");
      $connection = null;

      return $item;
   }

   /*------------------------------------------------------------------*\
   |   Liest alle Artikel aus der Datenbank ein
   \*------------------------------------------------------------------*/
   public function ReadItemList()
   {
      try 
      {
         $connection       = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
         $selectStatement  = "SELECT itemList.id, itemList.name, itemCategories.id as categoryId, itemCategories.categoryName, itemList.descriptionShort, itemList.descriptionLong, itemList.price
                              FROM itemList, itemCategories 
                              WHERE itemList.idCategory = itemCategories.id
                              ORDER BY itemList.id";
         $resultSet        = $connection->query($selectStatement);
         $itemList         = $resultSet->fetchAll(PDO::FETCH_CLASS, "item");

         $connection       = null;

         return $itemList;
      } 
      catch (PDOException $ex) 
      {
         $connection = NULL;
         error_log("Datenbankfehler: " . $ex->getMessage());
         return ClientWeb::DATABASE_ERROR;
      }
   }

   /*------------------------------------------------------------------*\
   |   Erstelle den Artikel in der Datenbank
   \*------------------------------------------------------------------*/
   public function CreateItem($item)
   {
      if ($item->name == "") 
      {
         $result = new ItemCreateResult();
         $result->statusCode = ClientWeb::INVALID_INPUT;
         $result->validationMessages["name"] = "Der Artikelname ist ungültig. Bitte geben Sie einen Artikelnamen an.";
         return $result;
      }

      $connection       = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
      $insertStatement  = "INSERT INTO itemList SET 
                           itemList.name              = '$item->name', 
                           itemList.idCategory        = '$item->categoryId', 
                           itemList.descriptionShort  = '$item->descriptionShort', 
                           itemList.descriptionLong   = '$item->descriptionLong', 
                           itemList.price             = '$item->price'";

      $connection->query($insertStatement);

      $id                  = $connection->lastInsertId();
      $connection          = null;
      $result              = new ItemCreateResult();
      $result->id          = $id;
      $result->statusCode  = ClientWeb::OK;

      return $result;
   }

   /*------------------------------------------------------------------*\
   |   Löschen den Artikel mit der ID aus der Datenbank
   \*------------------------------------------------------------------*/   
   public function DeleteItem($id)
   {
      $connection       = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
      $deleteStatement  = "DELETE FROM itemList WHERE itemList.id = $id";
      $connection->query($deleteStatement);
      $connection= null;
   }

   /*------------------------------------------------------------------*\
   |   Bearbeite den Artikel mit der ID
   \*------------------------------------------------------------------*/   
   public function UpdateItem($item)
   {
      $connection       = new PDO("mysql:host=localhost;dbname=webdev;charset=UTF8", "root", "");
      $updateStatement  = "UPDATE itemList SET 
                          itemList.name = '$item->name', 
                          itemList.idCategory = '$item->categoryId', 
                          itemList.descriptionShort = '$item->descriptionShort', 
                          itemList.descriptionLong = '$item->descriptionLong', 
                          itemList.price = $item->price 
                          WHERE itemList.id = $item->id";
    
      $affectedRows     = $connection->exec($updateStatement);
    
      if ($affectedRows === 0)
      {
         $selectStatement  = "SELECT COUNT(*) FROM itemList WHERE itemList.id = $item->id";
         $resultSet        = $connection->query($selectStatement);
         $row              = $resultSet->fetch();
         $count            = intval($row[0]);
         $connection       = null;

         return ClientWeb::NOT_FOUND;
      }
   }
}
