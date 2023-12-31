<?php
/*------------------------------------------------------------------*\
   DenyCachingMiddleware.php

   brief: 
\*------------------------------------------------------------------*/
   class DenyCachingMiddleware
   {
      public function __invoke($request, $handler)
      {
         $response = $handler->handle($request);
         $response = $response->withHeader("Cache-Control", "no-cache, no-store, must-revalidate");
         return $response;
      }    
   }
?>