<?php
/*------------------------------------------------------------------*\
   RequestHandler.php

   brief: Slim App zur abhandlung von GET, PUT, POST...
\*------------------------------------------------------------------*/
   require "vendor/autoload.php";
   require "DenyCachingMiddleware.php";
   require "ClientWeb.php";

   $app = \Slim\Factory\AppFactory::create();
   $app->add(new DenyCachingMiddleware());
   $app->addRoutingMiddleware();
   $app->getRouteCollector()->setDefaultInvocationStrategy(new \Slim\Handlers\Strategies\RequestResponseArgs());
   $app->setBasePath("/webdev/clientWeb");
   $app->addErrorMiddleware(true, true, true);
   
   /*------------------------------------------------------------------*\
   |   Hole alle Kategorien
   \*------------------------------------------------------------------*/
   $app->get("/itemCategoryList", function ($request, $response)
   {
      $clientWeb        = new ClientWeb();
      $itemCategoryList = $clientWeb->ReadItemCategoryList();

      if($itemCategoryList === ClientWeb::DATABASE_ERROR)
      {
         $response = $response->withStatus(500);
      }
      else
      {
         $response->getBody()->write(json_encode($itemCategoryList));
      }
         
      return $response;
   });

   /*------------------------------------------------------------------*\
   |   Hole Item mit ID
   \*------------------------------------------------------------------*/
   $app->get("/itemList/{id}", function ($request, $response, $id)
   {
      $clientWeb  = new ClientWeb();
      $item       = $clientWeb->ReadItem($id);

      if($item === ClientWeb::NOT_FOUND)
      {
         $response = $response->withStatus(404);
      }
      else
      {
         unset($item->id);

         $response->getBody()->write(json_encode($item));
      }

      return $response;
   });

   /*------------------------------------------------------------------*\
   |   Hole alle Items
   \*------------------------------------------------------------------*/
   $app->get("/itemList", function ($request, $response) 
   {
      $clientWeb  = new ClientWeb();
      $itemList   = $clientWeb->ReadItemList();

      if($itemList === ClientWeb::DATABASE_ERROR)
      {
         $response = $response->withStatus(500);
      }
      else
      {
         foreach($itemList as $item)
         {
            $item->url = "/webdev/clientWeb/itemList/$item->id";
            unset($item->id);
         }

         $response->getBody()->write(json_encode($itemList));
      }
         
      return $response;
   });

   /*------------------------------------------------------------------*\
   |   Lege neues Item an 
   \*------------------------------------------------------------------*/
   $app->post("/itemList", function ($request, $response)
   {
      $body                   = $request->getParsedBody();
         
      $item                   = new Item();
      $item->name             = $body["name"];
      $item->categoryName     = $body["categoryName"];
      $item->categoryId       = $body["categoryId"];
      $item->descriptionShort = $body["descriptionShort"];
      $item->descriptionLong  = $body["descriptionLong"];
      $item->price            = $body["price"];

      $clientWeb              = new ClientWeb();
      $result                 = $clientWeb->CreateItem($item);

      if ($result->statusCode === ClientWeb::INVALID_INPUT)
      {
         $response = $response->withStatus(400);
         $response->getBody()->write(json_encode($result->validationMessages));
      }
      else
      {
         $response = $response->withStatus(201);
         $response = $response->withHeader("Location", "webdev/clientWeb/itemList/$result->id");
      }
      
      return $response;
   });

   /*------------------------------------------------------------------*\
   |   Lösche Item mit der Id
   \*------------------------------------------------------------------*/
   $app->delete("/itemList/{id}", function ($request, $response, $id)
   {
      $clientWeb = new ClientWeb();
      $clientWeb->deleteItem($id)  ;
      return $response;
   });

   /*------------------------------------------------------------------*\
   |  Update Item mit der Id 
   \*------------------------------------------------------------------*/
   $app->put("/itemList/{id}",function ($request, $response, $id)
   {
      $body = $request->getParsedBody();

      $item                      = new Item();
      $item->id                  = $id;
      $item->name                = $body["name"];
      $item->categoryId          = $body["categoryId"];
      $item->categoryName        = $body["categoryName"];
      $item->descriptionShort    = $body["descriptionShort"];
      $item->descriptionLong     = $body["descriptionLong"];
      $item->price               = $body["price"];

      if ($item->name == "") 
      {
         $validationMessages = array();
         $validationMessages["name"] = "Der Artikelname ist eine Pflichtangabe. Bitte geben Sie einen Artikelnamen an.";
         $response = $response->withStatus(400);
         return $response->withJson($validationMessages);
      }
         
      $clientWeb = new ClientWeb();
      $result    = $clientWeb->UpdateItem($item);
         
      if ($result === ClientWeb::NOT_FOUND)
      {
         $response = $response->withStatus(404);
      }

      return $response;
   });

   $app->run();
?>