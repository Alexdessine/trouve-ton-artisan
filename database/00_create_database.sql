-- ============================================================================
-- 00_create_database.sql
-- Objectif : créer la base de données trouve_ton_artisan et définir les paramètres initiaux.
-- ============================================================================

DROP DATABASE IF EXISTS trouve_ton_artisan;
CREATE DATABASE trouve_ton_artisan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;


-- ---------------------------------------------------------------------------
-- Création de l'utilisateur MySQL dédié
-- ---------------------------------------------------------------------------
DROP USER IF EXISTS 'tta_user'@'localhost';
CREATE USER 'tta_user'@'localhost' IDENTIFIED BY 'ttapassword';

-- ---------------------------------------------------------------------------
-- Attribution des privilèges sur la base trouve_ton_artisan
-- ---------------------------------------------------------------------------
GRANT ALL PRIVILEGES ON trouve_ton_artisan.* TO 'tta_user'@'localhost';
FLUSH PRIVILEGES;

-- ---------------------------------------------------------------------------
-- TEST DE VALIDATION (à exécuter manuellement)
-- ---------------------------------------------------------------------------
-- 1) Exécuter ce script depuis un terminal :
--      mysql -u root -p < 00_create_database.sql
--
--      Résultat attendu :
--       - Aucune erreur affichée (succès de l'exécution)
--
-- 2) Vérifier l'existence de la base de données :
--      mysql -u root -p
--      SHOW DATABASES;
--
--      Résultat attendu :
--       - La base 'trouve_ton_artisan' apparaît dans la liste
--
-- 3) Vérifier la création de l'utilisateur :
--      SELECT user, host FROM mysql.user WHERE user = 'tta_user';
--
--      Résultat attendu :
--       - tta_user | localhost
--
-- 4) Tester la connexion avec l'utilisateur dédié :
--      mysql -u tta_user -p trouve_ton_artisan
--
--      Résultat attendu :
--       - Connexion réussie sans message d'erreur
--       - Accès autorisé à la base 'trouve_ton_artisan'