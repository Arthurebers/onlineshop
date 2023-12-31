SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Datenbank: `webdev`
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `webdev` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `webdev`;

-- --------------------------------------------------------
-- Tabellenstruktur für Tabelle `itemCategories`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `itemCategories`;
CREATE TABLE IF NOT EXISTS `itemCategories` 
(
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------
-- Daten für Tabelle `itemCategories`
-- --------------------------------------------------------
INSERT INTO `itemCategories` 
(`id` , `categoryName`)
VALUES
(1    , 'Hose'     ),
(2    , 'Jacke'    ),
(3    , 'Socken'   ),
(4    , 'Unterbekleidung');

-- --------------------------------------------------------
-- Tabellenstruktur für Tabelle `itemList`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `itemList`;
CREATE TABLE IF NOT EXISTS `itemList` 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `idCategory` int(5) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `descriptionShort` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descriptionLong` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),

  CONSTRAINT FK_idCategory FOREIGN KEY (idCategory)
  REFERENCES itemCategories(id)
  
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------
-- Daten für Tabelle `itemlist`
-- --------------------------------------------------------

INSERT INTO `itemList` 
(`id` , `name`                      ,  `idCategory`, `price`, `descriptionShort` , `descriptionLong`) VALUES
(    1, 'Jeans - Dunkelblau'        ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Dunkelblau!'),
(    2, 'Jeans - Hellblau'          ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Hellblau!'),
(    3, 'Jeans - Rot'               ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Rot!'),
(    4, 'Jeans - Grün'              ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Grün!'),
(    5, 'Jeans - Weiß'              ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Weiß!'),
(    6, 'Jeans - Grau'              ,            1 ,   49.99, 'Hommy Tilfiger'   , 'Bedeckt deine Beine komplett in Grau!'),
(    7, 'Daunenjacke - Dunkelblau'  ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Dunkelblau, der dich ganz bestimmt warm halten wird!'),
(    8, 'Daunenjacke - Hellblau'    ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Hellblau, der dich ganz bestimmt warm halten wird!'),
(    9, 'Daunenjacke - Rot'         ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Rot, der dich ganz bestimmt warm halten wird!'),
(   10, 'Daunenjacke - Grün'        ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Grün, der dich ganz bestimmt warm halten wird!'),
(   11, 'Daunenjacke - Weiß'        ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Weiß, der dich ganz bestimmt warm halten wird!'),
(   12, 'Daunenjacke - Grau'        ,            2 ,   79.99, 'Kine'             , 'Ein Artikel in Grau, der dich ganz bestimmt warm halten wird!'),
(   13, 'Socken (Paar) - Dunkelblau',            3 ,    3.99, 'Dadias'           , 'Dunkelblau - mit lustigen Zehen!'),
(   14, 'Socken (Paar) - Hellblau'  ,            3 ,    3.99, 'Dadias'           , 'Hellblau - mit lustigen Zehen!'),
(   15, 'Socken (Paar) - Rot'    	,            3 ,    3.99, 'Dadias'           , 'Rot - mit lustigen Zehen!'),
(   16, 'Socken (Paar) - Grün'   	,            3 ,    3.99, 'Dadias'           , 'Grün - mit lustigen Zehen!'),
(   17, 'Socken (Paar) - Weiß'   	,            3 ,    3.99, 'Dadias'           , 'Weiß - mit lustigen Zehen!'),
(   18, 'Socken (Paar) - Grau'   	,            3 ,    3.99, 'Dadias'           , 'Grau - mit lustigen Zehen!'),
(   19, 'Boxershorts - Dunkelblau'  ,            4 ,    7.99, 'A&C'              , 'Dunkelblau - Purer Komfort auch unter der Hose!'),
(   20, 'Boxershorts - Hellblau'    ,            4 ,    7.99, 'A&C'              , 'Hellblau - Purer Komfort auch unter der Hose!'),
(   21, 'Boxershorts - Rot'         ,            4 ,    7.99, 'A&C'              , 'Rot - Purer Komfort auch unter der Hose!'),
(   22, 'Boxershorts - Grün'        ,            4 ,    7.99, 'A&C'              , 'Grün - Purer Komfort auch unter der Hose!'),
(   23, 'Boxershorts - Weiß'        ,            4 ,    7.99, 'A&C'              , 'Weiß - Purer Komfort auch unter der Hose!'),
(   24, 'Boxershorts - Grau'        ,            4 ,    7.99, 'A&C'              , 'Grau - Purer Komfort auch unter der Hose!'),
(   25, 'Boxershorts - Dunkelgrau'  ,            4 ,    7.99, 'A&C'              , 'Dunkelgrau - Purer Komfort auch unter der Hose!');