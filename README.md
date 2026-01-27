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

```bash
├── frontend/     # Application React (Vite)
├── backend/      # API REST Node.js / Express
├── database/     # Scripts SQL (MySQL)
├── docs/         # Documentation et dossier projet (PDF)
```

## 🎨 Frontend (React)

Le frontend est une application web développée avec ReactJS, initialisée vite Vite, destinée à afficher plusieurs pages fonctionnelles

### 🛠️ Technologies frontend

* ReactJS (JSX)
* Vite (outil de build)
* Bootstrap
* Sass

### 📦 Installation

```bash
cd frontend
npm install
```

### ▶️ Lancement en développement

```bash
npm run dev
```

Par défaut, l'application est accessible à l'adresse :

```bash
http://localhost:5173
```

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

## 🌐 API REST - Présentation

L'application **Trouve ton artisan** repose sur **API REST publique** développée en **Node.js / Express**, connectée à une base de données **MySQL** via **Sequelize**.

L'API fournit les données nécessaire au frontend (React) et gère l'envoi de message via un formulaire de contact sécurisé.

### Caractéristiques principales

* API RES **publique** (sans authentification)
* Echanges au format JSON
* Architecture **stateless**
* Séparation claire **frontend / backend**
* Sécurité adaptée à une API ouverte (validation, CORS, rate limit)

## 🔗 Endpoints disponibles

### 📁 Catégories

`GET /api/categories`
Retourne la liste des catégories d'artisans.

**Réponse (200)**

```bash
[
  {
    "id": 1,
    "label": "Alimentation"
  },
  {
    "id": 2,
    "label": "Bâtiment"
  }
]
```

### 👷 Artisans

`GET /api/artisans`
Retourne la liste complète des artisans.

**Réponse (200)**

```bash
[
  {
    "id": 1,
    "nom": "Boucherie Dumont",
    "ville": "Lyon",
    "note": 4.5,
    "categorie": "Alimentation",
    "specialite": "Boucher"
  }
]
```

`GET /api/artisans/:id`
Retourne le détail d'un artisan

**Paramètres**

* `id` *(number)* : identifiant de l'artisan

**Réponse (200)**

```bash
{
  "id": 1,
  "nom": "Boucherie Dumont",
  "ville": "Lyon",
  "note": 4.5,
  "a_propos": "Lorem ipsum...",
  "email": "contact@exemple.fr",
  "site": null,
  "categorie": "Alimentation",
  "specialite": "Boucher"
}
```

**Erreur possible**

* `404` : artisan non trouvé

### ✉️ Contact

`POST /api/artisans/:id/contact`
Permet l'envoi d'un message à un artisan via le formulaire de contact.

**Champs attendus**

* `nom` *(string, requis)*
* `email` *(string, requis, format email)*
* `message` *(string, requis)*
* `website` *(string, honeypot - doit être vide)*

**Exemple de requête**

```bash
{
  "nom": "Jean Dupont",
  "email": "jean.dupont@email.com",
  "message": "Bonjour, je souhaite vous contacter.",
  "website": ""
}
```

**Réponses (200)**

```bash
{
  "message": "Message envoyé avec succès"
}
```

**Erreurs possibles**

* `400` : validation des champs
* `429` : trop de requêtes (rate limiting)

## 🔐 Sécurité de l’API

* Validation serveur des entrées (**express-validator**)
* Protection anti-spam (**honeypot**)
* **Rate limiting**
  * global sur `/api`
  * renforcé sur `/api/contact`
* **CORS resctrictif** (origines autorisée uniquement)
* Gestion centralisée des erreurs
* Aucune stacktrace exposée en production

---

## 🚀 Mise en production

L'application **Trouve ton artisan** est déployée en conditions réelles sur un hébergement mutualisé **o2switch**, avec une séparation claire entre le frontend statique et l'API backend.

### 🌍 URLs de production

* **Frontend** : [https://trouve-ton-artisan.alexandrebourlier.fr](https://trouve-ton-artisan.alexandrebourlier.fr)
* **API REST** : [https://api.trouve-ton-artisan.alexandrebourlier.fr](https://api.trouve-ton-artisan.alexandrebourlier.fr/api)

### 🏗️ Architecture de déploiement

```bash
Navigateur
   │
   │ HTTPS
   ▼
Frontend React (Vite - build statique)
   │
   │ Fetch API (CORS autorisé)
   ▼
API REST Node.js / Express (Passenger)
   │
   │ Sequelize
   ▼
Base de données MySQL (MariaDB)
```

**Choix techniques**

* **Frontend** servi comme site statique (build Vite)
* **Backend Node.js** exécuté via **Phusion Passenger**
* **Base de données MySQL** hébergée sur le même serveur
* **HTTPS** activé sur les deux sous-domaines
* Aucun port exposé manuellement (gestion autormatique par Passenger)

### ⚙️ Variables d’environnement

**Frontend (Vite)**

Les variables frontend sont injectées **au moment du build**

📁 `frontend/.env.production`

```bash
VITE_API_URL=https://api.trouve-ton-artisan.alexandrebourlier.fr
```

⚠️ Avec Vite, toute modification de variable nécessite un nouveau build.

---

**Backend (API - o2switch)

Les variables backend sont définies via **cPanel** -> **Setup Node.js App** -> **Environnement Variables**

**Variables utilisées (noms uniquement)**

```bash
NODE_ENV
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD

SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS

MAIL_FROM
CONTACT_RECEIVER_EMAIL

FRONTEND_URL
FRONTEND_URL_WWW
```

📌 **Aucune donnée sensible n’est versionnée.**
📌 Les variables sont injectées au runtime par Passenger.

---

### 🔐 CORS en production

L'API applique une politique **CORS restrictive**, basée sur une **liste blanche d'origines**

**Origines autorisées**

* [https://trouve-ton-artisan.alexandrebourlier.fr](https://trouve-ton-artisan.alexandrebourlier.fr)

Le conrôle est effectué via un middleware dédié, configuré à partir des variables d'environnement :

```bash
FRONTEND_URL
FRONTEND_URL_WWW
FRONTEND_URL_PREVIEW
```

Toute requête provenant d'une origine non autorisée est automatiquement rejetée.

---

### 🔁 Procédure de déploiement (reproductible)

#### 1️⃣ Frontend

```bash
1cd frontend
npm install
npm run build
```

* upload du dossier `dist`sur le sous-domaine frontend

#### 2️⃣ Backend

* Upload du code API
* Installation des dépendances avec Node LTS
* Configuration des variables d'environnement via cPanel
* Redémarrage de l'application Node (Passenger)

#### 3️⃣ Base de données

* Création via cPanel
* Import des scripts SQL (`01_schema.sql`, `02_seed.sql`)
* Connexion vérifiée via Sequelize

---

### 🧪 Tests de validation en production

Les tests suivants ont été effectués après déploiement :

* Accès frontend (navigation complète)
* Appels API depuis le frontend (CORS)
* Endpoints publics (`/categories`, `/artisans`, `/artisans/:id`)
* Envoi de message via formulaire de contact
* Réception effective de l'email (SMTP réel)
* Vérification HTTPS
* Absence d'erreurs console

Tous les tests sont **validés**

---

## 🛠️ Technologies utilisées

### Frontend

- ReactJS (Vite, JSX)
- Bootstrap
- Sass
  (React Router, Fetch API et SEO prévus dans les phases suivantes)

### Backend

- Node.js
- Express
- Sequelize
- MySQL

### Outils & environnement

- Git & GitHub
- Figma (maquettage)
- Postman (tests API)
- Laragon (local)
- o2switch (production)

---

## 🔐 Sécurité & bonnes pratiques

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
