Ce fichier constitue la base du **dossier PDF final** destiné à l’évaluateur.

---

## 🚀 Statut du projet

🟢 **Phase 5 - Fonctionnalités et qualité finalisées**
Le projet a été développé par phases successives, conformément au cahier des charges pédagogique.
L’ensemble des fonctionnalités prévues est opérationnel.
Le travail actuel concerne la **finalisation du livrable** et la **préparation de la soutenance**.

---

## 🧩 Maquettage de l'interface utilisateur

Les maquettes du projet **Trouve ton artisan** ont été réalisées à l'aide de l'outil **Figma**, selon une approche **Mobile First**.

La conception a débuté par la réalisation d'un **zoning**, afin d’identifier les différentes zones de l’application.
Ce zoning a été réalisé avec l’outil **Excalidraw**.

Un **wireframe** a ensuite été conçu pour définir :

- la structure des écrans,
- la hiérarchie des informations,
- le parcours utilisateur.

Les maquettes graphiques finales ont été déclinées pour les formats **mobile, tablette et desktop**, tout en conservant une cohérence visuelle et fonctionnelle.

Une attention particulière a été portée à l’accessibilité :

- hiérarchie claire des contenus,
- lisibilité renforcée avec une taille de texte minimale de **16 px**,
- éléments interactifs suffisamment espacés,
- information non dépendante uniquement de la couleur.

Le parcours utilisateur principal est le suivant :

**Accueil → Catégorie → Liste des artisans → Fiche artisan → Contact**

---

## 🗄️ Modélisation de la base de données

La base de données du projet **Trouve ton artisan** a été modélisée en amont à l’aide de la méthode **Merise**, afin de garantir la cohérence des données et le respect des règles métier avant toute implémentation technique.

Un **Modèle Conceptuel de Données (MCD)** a été réalisé afin d’identifier les entités principales du système :

- Catégorie,
- Spécialité,
- Artisan,

ainsi que leurs attributs et relations.

Les cardinalités définies dans le MCD traduisent fidèlement les contraintes fonctionnelles du projet, notamment :

- l’appartenance d’une spécialité à une seule catégorie,
- l’exercice d’une seule spécialité par artisan.

À partir du **MCD validé**, un **Modèle Logique de Données (MLD)** a été construit pour préparer la création de la base de données relationnelle.

Le MLD définit :

- les tables de la base de données,
- les clés primaires,
- les clés étrangères traduisant les relations entre entités.

Ce modèle logique a servi de base à la création des scripts SQL permettant :

- la création de la base de données,
- la définition des tables et des contraintes d’intégrité,
- l’insertion d’un jeu de données de test cohérent.

---

## 🌐 API REST – Présentation et rôle

L’API REST constitue la **couche d’accès aux données** de l’application **Trouve ton artisan**.

Elle permet :

- la consultation des catégories et des artisans,
- l’affichage des fiches détaillées,
- l’envoi de messages via un formulaire sécurisé.

Le frontend consomme exclusivement cette API via des requêtes HTTP.

### 🧠 Choix techniques

- **API REST publique**
  - aucun compte utilisateur,
  - aucun système d’authentification (choix volontaire et justifié),
- **Format JSON**,
- **Express + Sequelize**,
- **MySQL relationnel**.

L’architecture est volontairement simple et pédagogique, adaptée à un projet de formation.

### 🔁 Schéma logique simplifié (texte)

Frontend (React)
→ Requêtes HTTP (GET / POST)
→ API REST Express
→ Sequelize
→ Base de données MySQL

### 🔐 Sécurité de l’API

Les mesures de sécurité mises en place sont adaptées à une API ouverte :

- validation stricte des données entrantes,
- limitation du nombre de requêtes (rate limiting),
- restriction des origines autorisées (CORS),
- protection anti-spam sur le formulaire de contact,
- gestion centralisée des erreurs.

---

## ⚛️ Frontend React – Phase 4

### 🎯 Rôle du frontend

Le frontend constitue la **couche de présentation** de l’application.

Il permet à l’utilisateur de :

- consulter les catégories et les artisans,
- accéder aux fiches détaillées,
- contacter un artisan via un formulaire sécurisé,
- naviguer de manière fluide dans une application **SPA**.

Le frontend n’accède jamais directement à la base de données et communique uniquement avec l’API REST.

---

### 🧠 Choix technologiques

- **React** pour la création de composants réutilisables et dynamiques,
- **Vite** comme environnement de développement moderne et performant,
- **React Router DOM** pour la gestion du routage SPA,
- **Bootstrap** pour une base responsive fiable,
- **Sass** pour la structuration et la personnalisation des styles.

Ces choix garantissent lisibilité, maintenabilité et conformité aux bonnes pratiques frontend.

---

### 🔁 Logique SPA

L’application fonctionne comme une **Single Page Application** :

- une seule page HTML initiale,
- navigation sans rechargement,
- chargement dynamique des données,
- gestion centralisée des routes, incluant une route 404.

---

### 📱 Approche Mobile First

Le développement frontend suit une approche **Mobile First** :

- conception prioritaire pour les écrans mobiles,
- adaptation progressive pour tablette et desktop,
- composants responsives,
- navigation optimisée pour le tactile.

---

### ♻️ Réutilisation des composants

L’interface repose sur des composants réutilisables :

- cartes artisans,
- affichage des notes sous forme d’étoiles,
- composants de chargement et d’erreur,
- éléments de navigation.

Cette approche améliore la cohérence visuelle et la maintenabilité du code.

---

### ✉️ Formulaire de contact

Le formulaire de contact est sécurisé pour garantir la sécurité des données. il permet de à un utilisateur d'envoyer un message à un artisan depuis sa fiche, sans exposer directement d'adresse mail.

#### 🔁 Flux de fonctionnement

** Formulaire (React) -> API REST -> SMTP -> réception mail**

* validation côté client (UX),
* validation côté serveur (sécurité),
* envoi du message par email via SMTP.

#### 🔐 Sécurité et anti-spam

* validation des champs côté serveur,
* honeypot anti-spam,
* rate limiting spécifique,
* envoi centralisé via l'API.

#### 🛡️ Conformité RGPD

* aucune donnée saisie n'est stockée,
* aucune persistance en base de données,
* les informations sont utilisées uniquement pour l'envoi du message.

## 📄 Pages développées

### 🏠 Page d’accueil

La page d’accueil constitue le **point d’entrée de l’application**.

Elle permet :

- de présenter le service,
- de charger dynamiquement catégories et artisans,
- de guider l’utilisateur vers la navigation principale.

Elle est entièrement responsive et conforme aux maquettes.

---

### 📋 Liste des artisans

Cette page affiche dynamiquement les artisans via l’API REST.

Fonctionnalités :

- récupération des données via API,
- recherche par nom côté frontend,
- synchronisation de la recherche avec l’URL,
- gestion des états (chargement, erreur, aucun résultat).

---

### 👤 Fiche artisan

Accessible via une **route dynamique** `/artisans/:id`.

Elle permet :

- le chargement des données par identifiant,
- l’affichage des informations détaillées de l’artisan,
- l’accès à un formulaire de contact sécurisé.

Les cas d’erreur (artisan introuvable, problème API) sont gérés.

---

### 📑 Pages légales

Les pages légales incluent :

- les mentions légales,
- la politique de confidentialité.

Elles contiennent un contenu statique et sont accessibles via la navigation ou le pied de page, sans rechargement.

---

### 🚫 Page 404

Une page 404 est prévue pour gérer les routes inexistantes.

Elle permet :

- d’informer clairement l’utilisateur,
- d’éviter une erreur technique,
- de proposer un lien de retour vers l’accueil.

---

## 🚀 Mise en production

La mise en production du projet **Trouve ton artisan** a été réalisée en conditions réelles sur un hébergement mutualisé  **o2switch** , afin de démontrer la capacité à déployer une application fullstack complète dans un environnement proche du contexte professionnel.

### 🎯 Objectifs de la mise en production

* Rendre l’application accessible publiquement
* Déployer le frontend et le backend de manière indépendante
* Sécuriser les échanges (HTTPS, CORS)
* Externaliser toutes les données sensibles
* Mettre en place une architecture reproductible

---

### 🌍 Environnement de production

* **Hébergeur** : o2switch (mutualisé)
* **Frontend** : application React buildée (Vite)
* **Backend** : API REST Node.js / Express
* **Serveur Node** : Phusion Passenger
* **Base de données** : MySQL (MariaDB)
* **Sécurisation** : HTTPS (certificats SSL)
* **Gestion des ports** : automatique via Passenger

---

### 🔗 URLs de production

* **Frontend** :
  [https://trouve-ton-artisan.alexandrebourlier.fr](https://trouve-ton-artisan.alexandrebourlier.fr)
* **API REST** :
  [https://api.trouve-ton-artisan.alexandrebourlier.fr](https://api.trouve-ton-artisan.alexandrebourlier.fr)

---

### 🧱 Architecture de déploiement

```bash
Navigateur
   ↓ HTTPS
Frontend React (build statique)
   ↓ Fetch API (CORS autorisé)
API REST Node.js / Express (Passenger)
   ↓ Sequelize
Base de données MySQL
```

Cette architecture permet une séparation claire des responsabilités entre les différentes couches de l’application.

### ⚛️ Déploiement du frontend

Le frontend React est déployé sous forme d’application statique :

* build réalisé avec `npm run build` (Vite),
* génération d’un dossier `dist`,
* upload du contenu du dossier `dist` sur le sous-domaine frontend,
* configuration de l’URL de l’API via une variable d’environnement `VITE_API_URL`.

Avec Vite, les variables d’environnement sont injectées  **au moment du build** , ce qui impose un nouveau build à chaque changement de configuration.

---

### 🌐 Déploiement du backend

Le backend est déployé sur un sous-domaine dédié :

* installation des dépendances Node.js en production,
* exécution de l’API via  **Phusion Passenger** ,
* utilisation d’une version **Node.js LTS** compatible hébergement mutualisé,
* configuration des variables d’environnement via l’interface o2switch,
* redémarrage de l’application depuis le panneau d’administration.

Le port d’écoute de l’API est automatiquement fourni par l’environnement (`process.env.PORT`).

---

### ⚙️ Variables d’environnement et sécurité

Toutes les informations sensibles sont externalisées :

* identifiants de base de données,
* paramètres SMTP,
* URL frontend autorisée pour le CORS.

Aucune donnée sensible n’est stockée dans le dépôt GitHub.

La politique CORS est restrictive et autorise uniquement l’origine du frontend de production.

---

### 🧪 Tests de validation en production

Les tests suivants ont été réalisés après mise en ligne :

* navigation complète sur le frontend,
* appels API en conditions réelles (CORS),
* affichage des catégories et artisans,
* accès aux fiches artisans,
* envoi du formulaire de contact,
* réception effective des emails via SMTP,
* vérification HTTPS,
* absence d’erreurs JavaScript en console.

L’ensemble des tests est  **validé** .

## 🔗 Liens utiles

- Dépôt GitHub : [https://github.com/Alexdessine/trouve-ton-artisan](https://github.com/Alexdessine/trouve-ton-artisan)
- Maquettes Figma : [https://www.figma.com/design/oubmIaGB7Ijlqf2OeEeRYa/trouve_ton_artisan](https://www.figma.com/design/oubmIaGB7Ijlqf2OeEeRYa/trouve_ton_artisan)
- Site en ligne : [https://trouve-ton-artisan.alexandrebourlier.fr](🧱 Architecture de déploiement)

---

## 👤 Auteur

Projet réalisé par **Alexandre Bourlier**
Dans le cadre d’un projet de formation en développement web.
