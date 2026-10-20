# Admin Chlorophylle Night

Application d'administration des caisses : **Bilan des ventes** de la Caisse Bar et de la Caisse Sapins (fichiers déposés ou lus dans le dépôt privé `ventes`), **Catalogue** (publié directement sur GitHub), **Stock** (comptage quotidien par événement) et **Paramètres**.

Elle s'installe sur un PC ou une tablette (Chrome / Edge) et fonctionne hors ligne. La publication du catalogue demande internet.

## Mise en ligne sur GitHub Pages (une seule fois)

1. Sur https://github.com, cliquez sur **New** :
   - Repository name : `admin`
   - Cochez **Public**
   - **Create repository**
2. Cliquez sur **uploading an existing file** et glissez **tout le contenu** du dossier : `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` et le dossier `icons`.
3. **Commit changes**.
4. **Settings → Pages** : Source **Deploy from a branch**, branche **main**, dossier **/ (root)**, **Save**.
5. Après 1 à 2 minutes, l'app est à l'adresse https://scraper147.github.io/admin/

⚠️ Une fois les appareils installés, ne renommez plus le dépôt.

## Installation sur un appareil

1. Ouvrez https://scraper147.github.io/admin/ dans **Chrome** (ou Edge).
2. Menu **⋮ → Installer l'application** (ou **Ajouter à l'écran d'accueil**).
3. Lancez **« Admin »** depuis l'icône.

## Publier le catalogue depuis n'importe quel appareil

### Une seule fois par saison : la clé chiffrée

1. Dans l'app : **Paramètres → Préparer la clé chiffrée**.
2. Créez le jeton GitHub (lien dans l'app) :
   - type **Fine-grained token**, expiration : fin de saison ;
   - Repository access : **Only select repositories** → `bar`, `sapin`, `admin-donnees` et `ventes` ;
   - Permissions → Repository → **Contents : Read and write**. Rien d'autre.
3. Collez le jeton, choisissez une **phrase de passe de 4 à 5 mots**, cliquez **Chiffrer le jeton**.
4. Envoyez le texte chiffré à Claude : il le place dans `index.html` (constante `CLE_CHIFFREE`). Redéposez `index.html` et augmentez le cache de `sw.js`.

Ni le jeton ni la phrase ne sont dans le code : seule la version chiffrée y est, illisible sans la phrase.

### Sur chaque appareil

**Paramètres → Phrase de passe admin → Déverrouiller.** Ensuite, **Catalogue → Publier la version N**.
**Verrouiller cet appareil** efface le jeton de l'appareil.

### Ajouter un deuxième jeton

Si un dépôt est couvert par un autre jeton, préparez une clé de plus dans **Paramètres → Préparer une clé chiffrée**, avec **la même phrase de passe**. Les clés s'ajoutent (elles ne se remplacent pas). Envoyez le texte à Claude, qui l'ajoute dans `index.html` (`CLES_SUPP`). Au déverrouillage, l'app ouvre tous les jetons et choisit pour chaque dépôt celui qui y a accès (**Tester l'accès aux dépôts** indique « jeton 1 », « jeton 2 »).

Plus simple quand c'est possible : modifier le jeton existant sur GitHub (**Edit**) pour lui ajouter le dépôt ; aucune nouvelle clé n'est alors nécessaire.

### En cas de perte d'un appareil ou de fuite de la phrase

Supprimez le jeton sur GitHub (Settings → Developer settings → Personal access tokens), puis refaites une clé chiffrée avec un nouveau jeton et une nouvelle phrase.

## Bilan depuis le dépôt des ventes

Les caisses envoient leurs exports dans le dépôt privé `ventes`. Le Bilan peut les lire directement :

1. Ajoutez le dépôt `ventes` au jeton de l'app Admin (**Settings → Developer settings → Fine-grained tokens** → votre jeton → **Edit** → Repository access → ajoutez `ventes` → **Update**). La clé chiffrée reste valable.
2. **Bilan → Charger depuis le dépôt** (ou **+ Depuis le dépôt**) : un onglet par dossier du dépôt (Bar, Sapin…), puis les fichiers rangés par jour (date lue dans le nom du fichier). Cochez ceux voulus, ou **Charger les ventes** (Caisse Bar : le jour et le lendemain, pour les ventes après minuit). Si des ventes Bar et Sapins sont chargées, un choix **Caisse** apparaît dans les filtres : les totaux ne mélangent jamais les deux caisses.

## Stock (comptage par événement)

### Une seule fois : le dépôt privé des données

Le stock est enregistré dans un dépôt **privé** `admin-donnees` (un fichier par événement dans `stock/`), partagé par toutes les tablettes.

1. Sur GitHub, **New** : Repository name `admin-donnees`, cochez **Private**, cochez **Add a README file**, **Create repository**.
2. Ajoutez ce dépôt au jeton existant, sans le changer : **Settings → Developer settings → Personal access tokens → Fine-grained tokens** → votre jeton → **Edit** → Repository access : ajoutez `admin-donnees` → **Update**. La clé chiffrée de l'app reste valable.
3. Dans l'app : **Paramètres → Tester l'accès aux dépôts** doit indiquer « écriture autorisée » pour les données du stock.

### Pendant l'événement

1. **Stock → Nouvel événement** : nom et premier jour (vous pouvez reprendre les articles et le stock restant d'un événement précédent).
2. **Articles et stock de départ** : la liste des articles, leur unité et la quantité avant le premier jour.
3. Chaque jour, **Comptage du jour** : notez les **livraisons** et comptez le **restant** en fin de journée. Consommé = début + livré − restant. Stock réparti à plusieurs endroits : notez le premier comptage, puis le bouton **+** à côté du champ ajoute les suivants (7, puis + 8 = 15).
4. Les modifications sont gardées sur la tablette et envoyées sur GitHub quelques secondes après (ou dès le retour d'internet). Deux tablettes peuvent compter en même temps.
Dans le comptage : champ **Rechercher un article**, filtres **À compter seulement** et **Stock bas seulement**. Un article passe en **stock bas** (pastille rouge) quand ce qui a été consommé dans la journée dépasse le restant compté le même jour : pensez à réapprovisionner. Cochez **Dernier jour de l'événement** pour ne pas avoir ces alertes le dernier jour ; l'app ne propose alors plus d'ajouter un jour après celui-ci.
5. En fin d'événement : **Bilan et clôture → Clôturer l'événement**. Le bilan jour par jour s'exporte pour Excel.

## Mettre à jour l'app

Remplacez les fichiers sur GitHub (**Add file → Upload files**, puis **Commit**).
**À chaque nouvelle version, augmentez le numéro de cache dans `sw.js`** (`PREFIX + 'v1'` → `'v2'`…).
Les appareils prennent la nouvelle version à la prochaine ouverture avec du réseau.

## Bon à savoir

- Le Bilan ne garde pas les fichiers de ventes : rechargez-les à chaque ouverture. Les fichiers déposés à la main ne quittent pas l'appareil.
- Le catalogue en cours de modification est gardé sur l'appareil jusqu'à sa publication.
- L'app partage la mémoire du navigateur avec les caisses installées sur le même appareil (adresse scraper147.github.io) ; elle n'y garde que des données très légères.
