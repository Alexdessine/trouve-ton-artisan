-- ======================================================================================
-- 02_seed.sql
-- Objectif : Insérer des données de test dans les tables
-- ======================================================================================

USE trouve_ton_artisan;

SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE categories;
TRUNCATE TABLE specialites;
TRUNCATE TABLE artisans;
SET FOREIGN_KEY_CHECKS = 1;


START TRANSACTION;

-- ======================================================================================
-- Categories
-- ======================================================================================

INSERT INTO categories (label) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');


-- ======================================================================================
-- Specialites
-- ======================================================================================

INSERT INTO specialites (label, id_categorie) VALUES
('Boucher', (SELECT id_categorie FROM categories WHERE label = 'Alimentation')),
('Boulanger', (SELECT id_categorie FROM categories WHERE label = 'Alimentation')),
('Chocolatier', (SELECT id_categorie FROM categories WHERE label = 'Alimentation')),
('Traiteur', (SELECT id_categorie FROM categories WHERE label = 'Alimentation')),

('Électricien', (SELECT id_categorie FROM categories WHERE label = 'Bâtiment')),
('Plombier', (SELECT id_categorie FROM categories WHERE label = 'Bâtiment')),
('Chauffagiste', (SELECT id_categorie FROM categories WHERE label = 'Bâtiment')),
('Menuisier', (SELECT id_categorie FROM categories WHERE label = 'Bâtiment')),

('Couturier', (SELECT id_categorie FROM categories WHERE label = 'Fabrication')),
('Ferronnier', (SELECT id_categorie FROM categories WHERE label = 'Fabrication')),
('Bijoutier', (SELECT id_categorie FROM categories WHERE label = 'Fabrication')),

('Coiffeur', (SELECT id_categorie FROM categories WHERE label = 'Services')),
('Fleuriste', (SELECT id_categorie FROM categories WHERE label = 'Services')),
('Toiletteur', (SELECT id_categorie FROM categories WHERE label = 'Services')),
('Webdesign', (SELECT id_categorie FROM categories WHERE label = 'Services'));

-- ======================================================================================
-- Artisans
-- ======================================================================================

INSERT INTO artisans (nom, note, ville, a_propos, email, site, is_favori, id_specialite) VALUES
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'boucherie.dumond@gmail.com', NULL, 0,
(SELECT id_specialite FROM specialites WHERE label = 'Boucher')),

('Au pain chaud', 4.8, 'Montélimar', 
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'aupainchaud@hotmail.com', NULL, 1, 
(SELECT id_specialite FROM specialites WHERE label = 'Boulanger')),

('Chocolaterie Labbé', 4.9, 'Lyon',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1,
(SELECT id_specialite FROM specialites WHERE label = 'Chocolatier')),

('Traiteur Truchon', 4.1, 'Lyon',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Traiteur')),

('Orville Salmons', 5.0, 'Evian',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'o-salmons@live.com', NULL, 1, 
(SELECT id_specialite FROM specialites WHERE label = 'Chauffagiste')),

('MontBlanc Electricité', 4.5, 'Chamonix', 
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
'contact@mont-blanc-electricite.fr', 'https://mont-blanc-electricite.fr', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Electricien')),

('Boutot & fils', 4.7, 'Bourg-en-bresse',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Menuisier')),

('Vallis Bellemare', 4.0, 'Vienne',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Plombier')),

('Claude Quinn', 4.2, 'Aix-les-bains',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'claude.quinn@gmail.com', NULL, 0,
(SELECT id_specialite FROM specialites WHERE label = 'Bijoutier')),

('Amitee Lécuyer', 4.5, 'Annecy',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Couturier')),

('Ernest Carignan', 5.0, 'Le Puy-en-Velay',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'e-carignan@hotmail.com', NULL, 0,
(SELECT id_specialite FROM specialites WHERE label = 'Ferronnier')),

('Royden Charbonneau', 3.8, 'Saint-Priest',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'r.charbonneau@gmail.com', NULL, 0,
(SELECT id_specialite FROM specialites WHERE label = 'Coiffeur')),

('Leala Dennis', 3.8, 'Chambéry',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'l.dennos@hotmail.com', 'https://coiffure-leala-chambery.fr', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Coiffeur')),

('C\'est sup\'hair', 4.1, 'Romans-sur-Isère',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'sup-hair@gmail.com', 'https://sup-hair.fr', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Coiffeur')),

('Le monde des fleurs', 4.6, 'Annonay',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Coiffeur')),

('Valérie Laderoute', 4.5, 'Valence',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'v-laderoute@gmail.com', NULL, 0,
(SELECT id_specialite FROM specialites WHERE label = 'Toiletteur')),

('CM Graphisme', 4.4, 'Valence',
'Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0,
(SELECT id_specialite FROM specialites WHERE label = 'Webdesign'));


COMMIT;

