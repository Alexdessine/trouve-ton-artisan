# 🔧 Trouve ton artisan

Projet web permettant de rechercher et consulter des artisans locaux par catégorie et spécialité, avec une approche **mobile first**, **accessible** et **sécurisée**.

---

## 🎯 Objectif du projet

L’objectif de ce projet est de concevoir une application web complète permettant :

- La consultation d’artisans par **catégorie** et **spécialité**
- L’accès à une **fiche artisan détaillée**
- La mise en avant d’artisans recommandés
- Un formulaire de **contact sécurisé**
- Une architecture professionnelle **frontend / API / base de données**

Ce projet s’inscrit dans un cadre **pédagogique et professionnalisant**.

---

## 🧱 Architecture du projet

Le projet suit une architecture **simple-repo** :

trouve-ton-artisan/

├── frontend/     # Application React (Vite)
├── backend/      # API REST Node.js / Express
├── database/     # Scripts SQL (MySQL)
├── docs/         # Documentation et dossier projet (PDF)

## 🗄️ Base de données (MySQL)

⚠️ Important
Toutes les commandes ci-dessous doivent être exécutées depuis le dossier `database` du projet :

```bash
cd chemin/vers/le/projet/trouve_ton_artisan/database
```

### 🎯 Objectif

Mettre en place la base de données MySQL du projet **Trouve ton artisan** :
création de la base et de l’utilisateur, définition du schéma relationnel, insertion des données d’exemple et exécution des scripts de tests.

### ⚙️ Prérequis

* MySQL installé localement
* Accès à la ligne de commande MySQL (CLI)
* Droits suffisants pour exécuter une commande en tant que root

### 🧰 Environnement utilisé

* **SGBD** : MySQL Community Server
* **Version utilisée** :
```bash
mysql Ver 8.4.3 for Win64 on x86_64 (MySQL Community Server - GPL)
```
* **Encodage** : utf8mb4
* **Interface** : MySQL CLI (ligne de commande)

Le projet a été développé et testé avec cette version.

### 📁 Scripts SQL

Les scripts nécessaires à l’installation de la base sont situés dans le dossier :

```bash
database/
├── 00_create_database.sql   # Création de la base + utilisateur
├── 01_schema.sql            # Schéma relationnel (tables, contraintes)
├── 02_seed.sql              # Données de démonstration
└── 03_tests.sql             # Requêtes de tests et validations
```

#### ▶️ Exécution des scripts (ordre impératif)
##### 1️⃣ Création de la base de données et de l’utilisateur

```bash
mysql -u root -p < 00_create_database.sql
```
* Le mot de passe `root` est demandé.
* La base et l’utilisateur MySQL sont créés.
* Aucune sortie à l’écran = succès.

##### 2️⃣ Création du schéma relationnel

```bash
mysql -u tta_user -p --default-character-set=utf8mb4 < 01_schema.sql
```
* Création des tables et des contraintes.
* Encodage UTF-8 forcé pour garantir la gestion des accents.

##### 3️⃣ Insertion des données de démonstration

```bash
mysql -u tta_user -p --default-character-set=utf8mb4 < 02_seed.sql
```
* Insertion des données fournies pour le projet.
* Respect des dépendances entre tables.
* Données compatibles avec l’API backend.

##### 4️⃣ Exécution des tests de validation

```bash
mysql -u tta_user -p --default-character-set=utf8mb4 < 03_tests.sql
```
Ce script permet de vérifier :
* la présence des tables,
* la cohérence des relations,
* l’intégrité des données,
* le bon fonctionnement des requêtes attendues.

### 🔐 Sécurité

Le mot de passe utilisateur **ttapassword** est utilisé uniquement en environnement local de formation.

⚠️ En production, les identifiants de base de données ne doivent jamais être versionnés.

L’utilisation de variables d’environnement est obligatoire.

### ⚡ Commandes rapides

```bash
mysql -u root -p < 00_create_database.sql
mysql -u tta_user -p --default-character-set=utf8mb4 < 01_schema.sql
mysql -u tta_user -p --default-character-set=utf8mb4 < 02_seed.sql
mysql -u tta_user -p --default-character-set=utf8mb4 < 03_tests.sql
```

---

## 🛠️ Technologies utilisées

### Frontend
- React (Vite)
- React Router
- Bootstrap
- Sass
- Fetch API
- react-helmet-async (SEO)

### Backend
- Node.js
- Express
- Sequelize
- JWT (authentification)
- MySQL

### Outils & environnement
- Git & GitHub
- Figma (maquettage)
- Postman (tests API)
- Laragon (local)
- o2switch (production)
---
## 🔐 Sécurité & bonnes pratiques

- Authentification JWT
- Validation serveur des entrées
- CORS restrictif
- Rate limiting
- Gestion centralisée des erreurs
- Variables d’environnement sécurisées
- Aucune donnée sensible versionnée

---

## ♿ Accessibilité & qualité

- Approche **Mobile First**
- Conformité **WCAG 2.1**
- HTML valide (W3C)
- Vérifications Lighthouse
- SEO technique et sémantique

---

## 📄 Documentation

La documentation complète du projet est disponible dans le dossier :

docs\dossier-projet.md