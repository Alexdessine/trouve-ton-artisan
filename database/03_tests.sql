USE trouve_ton_artisan;

-- Vérifier les volumes
SELECT COUNT(*) AS nb_categories
FROM categories;
SELECT COUNT(*) AS nb_specialites
FROM specialites;
SELECT COUNT(*) AS nb_artisans
FROM artisans;

-- Vérifier les relations (jointure)
SELECT
    a.nom AS artisan,
    s.label AS specialite,
    c.label AS categorie
FROM artisans a
    JOIN specialites s ON s.id_specialite = a.id_specialite
    JOIN categories c ON c.id_categorie = s.id_categorie
ORDER BY c.label, s.label, a.nom;

-- Vérifier les "favoris"
SELECT nom, is_favori
FROM artisans
WHERE is_favori = 1;
