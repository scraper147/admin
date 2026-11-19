# Admin Agri-Garden

Application d'administration des caisses. Le menu principal a un module par activité, chacun avec ses onglets :

- **Bar** : Catalogue, Bilan (Caisse Bar).
- **Chlorophylle Night** : Catalogue, Stock (comptage par événement), Bilan (Caisse Soirée).
- **Gestion sapin** : Catalogue, Stock, Caisse, Bilan, Historique de vente (Caisse Sapins).
- **Paramètres**.

Chaque Bilan et chaque Catalogue ne montre que sa caisse : un fichier d'une autre caisse est refusé avec un message qui indique où l'ouvrir.

L'accueil propose aussi des liens vers les applications des caisses (Bar, Soirée, Sapins).

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
   - Repository access : **Only select repositories** → `bar`, `sapin`, `soiree`, `admin-donnees` et `ventes` ;
   - Permissions → Repository → **Contents : Read and write**. Rien d'autre.
3. Donnez un **nom** à la clé (ex. « Admin saison 2026 », pour la reconnaître ; il n'est pas secret), collez le jeton, choisissez une **phrase de passe de 4 à 5 mots**, cliquez **Chiffrer et ajouter le jeton**. La section **Clés chiffrées** liste les clés avec leur nom (**Renommer** possible) ; le test d'accès indique quelle clé ouvre chaque dépôt.
4. Envoyez le texte chiffré à Claude : il le place dans `index.html` (constante `CLE_CHIFFREE`). Redéposez `index.html` et augmentez le cache de `sw.js`.

Ni le jeton ni la phrase ne sont dans le code : seule la version chiffrée y est, illisible sans la phrase.

### Sur chaque appareil

**Paramètres → Phrase de passe admin → Déverrouiller.** Ensuite, dans l'onglet **Catalogue** du module (Bar, Chlorophylle Night ou Gestion sapin) : **Publier la version N**.
**Verrouiller cet appareil** efface le jeton de l'appareil.

### Ajouter un deuxième jeton

Si un dépôt est couvert par un autre jeton, préparez une clé de plus dans **Paramètres → Préparer une clé chiffrée**, avec **la même phrase de passe**. Les clés s'ajoutent (elles ne se remplacent pas). Envoyez le texte à Claude, qui l'ajoute dans `index.html` (`CLES_SUPP`). Au déverrouillage, l'app ouvre tous les jetons et choisit pour chaque dépôt celui qui y a accès (**Tester l'accès aux dépôts** indique « jeton 1 », « jeton 2 »).

Plus simple quand c'est possible : modifier le jeton existant sur GitHub (**Edit**) pour lui ajouter le dépôt ; aucune nouvelle clé n'est alors nécessaire.

### En cas de perte d'un appareil ou de fuite de la phrase

Supprimez le jeton sur GitHub (Settings → Developer settings → Personal access tokens), puis refaites une clé chiffrée avec un nouveau jeton et une nouvelle phrase.

## Bilan depuis le dépôt des ventes

Les caisses envoient leurs exports dans le dépôt privé `ventes`. Le Bilan peut les lire directement :

1. Ajoutez le dépôt `ventes` au jeton de l'app Admin (**Settings → Developer settings → Fine-grained tokens** → votre jeton → **Edit** → Repository access → ajoutez `ventes` → **Update**). La clé chiffrée reste valable.
2. **Bar → Bilan** (dossier `bar`), **Chlorophylle Night → Bilan** (dossier `soiree`) ou **Gestion sapin → Bilan** (dossier `sapin`) → **Charger depuis le dépôt** (ou **+ Depuis le dépôt**) : les fichiers de cette caisse rangés par jour (date lue dans le nom du fichier). Cochez ceux voulus, ou **Charger les ventes** (Caisse Bar : le jour et le lendemain, pour les ventes après minuit).
3. **Chlorophylle Night → Bilan** (dossier `soiree`) : un fichier par appareil et par soirée ; « Charger les ventes » charge tous les appareils de la soirée. Le bilan montre la recette (entrées et tickets, cash et Bancontact), les entrées (payantes, préventes, VIP), les cases vendues et barrées avec l'écart, les boissons par catégorie, l'activité heure par heure, le détail par appareil (avec les tables VIP) et les enregistrements annulés. Par défaut, toutes les dates chargées sont sélectionnées ; « Retirer les fichiers » vide le Bilan. Un enregistrement présent dans deux fichiers n'est compté qu'une fois ; un export plus ancien du même appareil est ignoré.

## Chlorophylle Night → Stock (comptage par événement)

### Une seule fois : le dépôt privé des données

Le stock est enregistré dans un dépôt **privé** `admin-donnees` (un fichier par événement dans `stock/`), partagé par toutes les tablettes.

1. Sur GitHub, **New** : Repository name `admin-donnees`, cochez **Private**, cochez **Add a README file**, **Create repository**.
2. Ajoutez ce dépôt au jeton existant, sans le changer : **Settings → Developer settings → Personal access tokens → Fine-grained tokens** → votre jeton → **Edit** → Repository access : ajoutez `admin-donnees` → **Update**. La clé chiffrée de l'app reste valable.
3. Dans l'app : **Paramètres → Tester l'accès aux dépôts** doit indiquer « écriture autorisée » pour les données du stock.

### Pendant l'événement

1. **Chlorophylle Night → Stock → Nouvel événement** : nom et premier jour (vous pouvez reprendre les articles et le stock restant d'un événement précédent).
2. **Articles et stock de départ** : la liste des articles, leur unité et la quantité avant le premier jour.
3. Chaque jour, **Comptage du jour** : notez les **livraisons** et comptez le **restant** en fin de journée. Consommé = début + livré − restant. Stock réparti à plusieurs endroits : notez le premier comptage, puis le bouton **+** à côté du champ ajoute les suivants (7, puis + 8 = 15).
4. Les modifications sont gardées sur la tablette et envoyées sur GitHub quelques secondes après (ou dès le retour d'internet). Deux tablettes peuvent compter en même temps.
Dans le comptage : champ **Rechercher un article**, filtres **À compter seulement** et **Stock bas seulement**. Un article passe en **stock bas** (pastille rouge) quand ce qui a été consommé dans la journée dépasse le restant compté le même jour : pensez à réapprovisionner. Cochez **Dernier jour de l'événement** pour ne pas avoir ces alertes le dernier jour ; l'app ne propose alors plus d'ajouter un jour après celui-ci.
5. En fin d'événement : **Bilan et clôture → Clôturer l'événement**. Le bilan jour par jour s'exporte pour Excel.

## Gestion sapin

Tout ce qui concerne la vente des sapins est regroupé dans le menu **Gestion sapin**, avec cinq onglets :

- **Catalogue** : produits, prix et points de vente de la Caisse Sapins, publiés sur GitHub (dépôt `sapin`), comme dans le menu Catalogue.
- **Stock** : stock de la saison (un par année, par exemple « Sapins 2026 »), enregistré dans le dépôt privé `ventes`, fichier `sapin/stock/<saison>.json`.
  - **Créer la saison** : nom et stand de stockage (Spy), une seule fois par an.
  - **Encoder une livraison** : date, puis la quantité livrée pour chaque article (articles du catalogue de la Caisse Sapins, regroupés par catégorie, avec une recherche). Touche Entrée = article suivant.
  - **Article absent du catalogue** : libellé, catégorie (ou nouvelle catégorie) et prix de vente. Il est ajouté directement au catalogue de la Caisse Sapins (nouvelle version publiée), puis on encode sa quantité.
  - **+ Transfert** : date, stand de départ, stand d'arrivée (n'importe lequel vers n'importe lequel), puis les quantités. La colonne « Dispo. » montre le stock restant au stand de départ ; si on dépasse, l'app prévient et demande de confirmer.
  - **Stock par stand** : le restant de chaque stand, article par article (livré + reçu − envoyé − vendu). Cliquer un stand donne le détail (Livré, Reçu, Envoyé, Vendu, Restant). Un stock négatif est signalé en rouge.
  - **Ventes** : l'app lit les fichiers de la Caisse Sapins dans le dépôt `ventes` (dossier `sapin`) et retire ce qui a été vendu à chaque stand depuis le premier mouvement de la saison. Ventes annulées et articles libres (hors catalogue) ne sont pas retirés ; pour un même stand et un même jour, seul l'export le plus récent compte. **Relire les ventes** pour prendre les derniers envois des caisses.
  - **Mouvements** : livraisons et transferts, avec Modifier et Supprimer.
  - Un article retiré du catalogue reste visible dans le stock (« Plus dans le catalogue ») tant qu'il y en a.
  - Sans internet, la livraison est gardée sur l'appareil et envoyée au retour du réseau.
  - **Le jeton doit avoir l'écriture (Contents : Read and write) sur `ventes`** (Paramètres → Tester l'accès aux dépôts).
- **Caisse** : choisissez le jour et le point de vente, puis saisissez le **fond de caisse**, les **retraits** (dépôt au coffre, remboursement, dépense, autre), les **ajouts** (monnaie, autre) et le **décompte final** (montant total ou par billets et pièces, laissé pour demain obligatoire, Enregistrer reste grisé tant qu'il n'est pas rempli ; l'app calcule l'écart et la recette retirée). Les ventes cash viennent du fichier de ventes envoyé par la tablette. Chaque saisie est datée de l'heure de son enregistrement (non modifiable). Le journal montre toutes les saisies (Admin et tablette) et permet d'en supprimer. Tout est enregistré dans le dépôt `ventes`, fichier `sapin/caisse/<jour>_<point de vente>.json`, partagé avec la Caisse Sapins (qui doit être mise à jour pour le lire) ; le Bilan l'utilise en priorité. Sans internet, les saisies attendent sur l'appareil.
- **Bilan** : ventes de la Caisse Sapins, fichiers déposés ou **Charger depuis le dépôt** (dossier `sapin` du dépôt `ventes`).
  - **Caisse** : par stand et par jour, fond, ventes cash, apports, retraits (avec leurs motifs), attendu, compté, écart (vert si nul, rouge sinon), laissé pour demain, et les badges « Non comptée », « À recompter », « Comptée le lendemain », « Fond non saisi ». Toucher un jour montre les mouvements, les comptages successifs et les billets. En dessous, les totaux de la période par stand (écarts, jours non comptés ou à recompter, recettes retirées, dépôts au coffre, autres retraits et apports).
  - **Livraisons** : nombre de livraisons par stand et par jour (le bandeau indique le chiffre « Sapins et accessoires » et le nombre de livraisons).
  - **Par article** : quantités vendues par point de vente (Spy, Eghezee, Meux, Boninne), puis le total de tous les stands, le montant et la part.
  - **Remises** : total des remises par stand et par jour (sur article, sur ticket, total).
  - **Tiroir-caisse** : ouvertures et ouvertures sans vente, avec leurs motifs.
  - **Exporter pour Excel** donne un troisième fichier `bilan-caisse_….csv` (une ligne par stand et par jour : caisse, livraisons, tiroir).
  - Un fichier peut être renvoyé par la tablette après coup (livraison ajoutée, caisse comptée le lendemain) : en rouvrant **+ Depuis le dépôt**, l'app signale les fichiers modifiés et propose de les recharger.
  - Les anciens fichiers (sans caisse ni tiroir) s'affichent sans ces sections. Ce Bilan est séparé de celui du menu Bilan : chacun garde ses propres fichiers. Un fichier de la Caisse Bar ou Soirée déposé ici est refusé avec un message (et inversement).

- **Historique de vente** : choisissez un fichier de ventes (liste du dossier `sapin` du dépôt `ventes`, ou **Ouvrir un fichier de l'appareil**). Les ventes s'affichent comme dans l'Historique de la Caisse Sapins, mais de la première à la dernière de la journée : heure, numéro de vente, articles (remises, articles libres), remise ticket, livraison ajoutée ou payée à part, annulation et motif, paiement, total. En tête : nombre de ventes, total, cash et Bancontact.

## Mettre à jour l'app

Remplacez les fichiers sur GitHub (**Add file → Upload files**, puis **Commit**).
**À chaque nouvelle version, augmentez le numéro de cache dans `sw.js`** (`PREFIX + 'v1'` → `'v2'`…).
Les appareils prennent la nouvelle version à la prochaine ouverture avec du réseau.

## Bon à savoir

- Stock : un événement qui n'a pas pu être envoyé sur GitHub reste sur la tablette et apparaît dans « Pas encore enregistrés sur GitHub », avec la raison. Il est envoyé dès qu'on l'ouvre sur la tablette déverrouillée avec un jeton qui a accès à `admin-donnees`. Ne pas vider les données du navigateur avant.
- Stock, secours sans GitHub : « Exporter (fichier) » dans un événement, ou « Exporter tout » dans la liste, télécharge le stock en fichier. « Importer un fichier » sur une autre tablette (même verrouillée) le reprend ; si l'événement existe déjà, l'app montre les deux versions et demande avant de remplacer.
- Le Bilan ne garde pas les fichiers de ventes : rechargez-les à chaque ouverture. Les fichiers déposés à la main ne quittent pas l'appareil.
- Le catalogue en cours de modification est gardé sur l'appareil jusqu'à sa publication.
- L'app partage la mémoire du navigateur avec les caisses installées sur le même appareil (adresse scraper147.github.io) ; elle n'y garde que des données très légères.
