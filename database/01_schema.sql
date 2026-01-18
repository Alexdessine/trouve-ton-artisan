-- ====================================================================
-- Database Schema Definition
-- ====================================================================

-- ====================================================================
-- 01_schema.sql
-- Objectif : Créer les tables + PK/FK + contraintes
-- Contraintes métier : 
--   - Un artisant -> une seule spécialité
--   - Une spécialité -> une seule catégorie
-- ====================================================================

USE trouve_ton_artisan;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

-- -------------------------------------------------------------------
-- Création de la table catégories
-- -------------------------------------------------------------------
CREATE TABLE categories (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    CONSTRAINT uq_categories_label UNIQUE(label)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------------------------------------------
-- Création de la table spécialités
-- - Une spécialité appartient à une catégorie (FK obligatoire)
-- -------------------------------------------------------------------
CREATE TABLE specialites (
    id_specialite INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    
    CONSTRAINT fk_spcialites_categories
        FOREIGN KEY (id_categorie)
        REFERENCES categories(id_categorie)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT uq_specialites_label UNIQUE(label),
    INDEX idx_specialites_categorie (id_categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------------------------------------------
-- Création de la table artisans
-- - Un artisan a une spécialité (FK obligatoire)
-- -------------------------------------------------------------------
CREATE TABLE artisans (
    id_artisan INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    note DECIMAL(2,1) DEFAULT NULL,
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(150) NOT NULL UNIQUE,
    site VARCHAR(255) DEFAULT NULL,
    is_favori TINYINT(1) NOT NULL DEFAULT 0,
    id_specialite INT UNSIGNED NOT NULL,

    CONSTRAINT fk_artisans_specialites
        FOREIGN KEY (id_specialite) 
        REFERENCES specialites(id_specialite)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_artisans_id_specialite (id_specialite),
    INDEX idx_artisans_ville (ville),
    INDEX idx_artisans_nom (nom),
    CONSTRAINT chk_artisans_note CHECK (note IS NULL or (note >= 0 AND note <= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;