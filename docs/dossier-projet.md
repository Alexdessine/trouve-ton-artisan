Ce fichier constitue la base du **dossier PDF final** destiné à l’évaluateur.

---

## 🚀 Statut du projet

🟡 **En cours de développement**
Le projet est développé par phases successives, conformément au cahier des charges pédagogique.

---

## 🧩 Maquettage de l'interface utilisateur

Les maquettes du projet **Trouve ton artisan** ont été réalisées à l'aide de l'outil Figma, selon une approche **Mobile First**.

La conception a débuté par la réalisation d'un zoning pour déterminer les différentes zones de l'application. Ce zoning a été réalisé avec l'outil Excalidraw. Puis par la réalisation d'un wireframe afin de définir la structure des écrans, la hierarchie des informations et le parcours utilisateur. Ce wireframe a été réalisé avec l'outil Figma.

Les maquettes graphiques finales ont ensuite été déclinées pour les formats mobile, tablette et desktop, en conservant une cohérence visuelle et fonctionnelle entre les supports.

Une attention particulière a été portée à l'accessibilité :

- hiérarchie claire des contenus,
- lisibilité renforcée avec une taille de texte minimale de **16 px**,
- éléments interactifs suffisamment espacés,
- information non dépendante uniquement de la couleur.

Le parcours utilisateur principal est le suivant :

Accueil -> Catégorie -> Liste des artisans -> Fiche artisan -> Contact.

---

## 🗄️ Modélisation de la base de données

La base de données du projet **Trouve ton arisan** a été modélisée en amont à l'aide de la méthode **Merise**, afin de garantir la cohérence des données et le respect des règles métier avant toute implantation technique.

un **Modèle Conceptuel de Données (MCD)** a été réalisé pour identifier les entités principales du système (Catégorie, Spécialité, Artisan), leurs attributs ainsi que les relations qui les lient.

Les cardinalités définies dans le MCD traduisent fidèlement les contraintes fonctionnelles du projet, notamment :
- l'appartenance d'une spécialité à une seule catégorie,
- l'exercice d'une seule spécialité par artisan.

Ce travail constitue la base de la phase suivante, consacrée à la transformation du MCD en **Modèle Logique de Données (MCD)**, puis à la création des tables de la base de données relationnelles MySQL.

A partir du **Modèle Conceptuel de Données (MCD)** validé, un **Modèle Logique de Données (MLD)** a été construit afin de préparer la création de la base de données relationnelle du projet **Trouve ton artisan**.

Le MLD permet de définir : 

- les tables de la base de données, 
- les clés primaires,
- les clés étrangères traduisant les relations entre les entités, tout en restant indépendant des choix techniques d'implémentation. 

## 🔗 Liens utiles

- Dépôt GitHub : [https://github.com/Alexdessine/trouve-ton-artisan](https://github.com/Alexdessine/trouve-ton-artisan)
- Maquettes Figma : [https://www.figma.com/design/oubmIaGB7Ijlqf2OeEeRYa/trouve_ton_artisan](https://www.figma.com/design/oubmIaGB7Ijlqf2OeEeRYa/trouve_ton_artisan)
- Site en ligne : *(à compléter)*

---

## 👤 Auteur

Projet réalisé par **Alexandre Bourlier**
Dans le cadre d’un projet de formation en développement web.
