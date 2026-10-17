# Admin Chlorophylle Night

Application d'administration des caisses : **Bilan des ventes**, **Catalogue** (publié directement sur GitHub) et **Paramètres**. Les modules Points de vente, Stock et Clôture viendront ensuite.

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
   - Repository access : **Only select repositories** → `bar` et `sapin` ;
   - Permissions → Repository → **Contents : Read and write**. Rien d'autre.
3. Collez le jeton, choisissez une **phrase de passe de 4 à 5 mots**, cliquez **Chiffrer le jeton**.
4. Envoyez le texte chiffré à Claude : il le place dans `index.html` (constante `CLE_CHIFFREE`). Redéposez `index.html` et augmentez le cache de `sw.js`.

Ni le jeton ni la phrase ne sont dans le code : seule la version chiffrée y est, illisible sans la phrase.

### Sur chaque appareil

**Paramètres → Phrase de passe admin → Déverrouiller.** Ensuite, **Catalogue → Publier la version N**.
**Verrouiller cet appareil** efface le jeton de l'appareil.

### En cas de perte d'un appareil ou de fuite de la phrase

Supprimez le jeton sur GitHub (Settings → Developer settings → Personal access tokens), puis refaites une clé chiffrée avec un nouveau jeton et une nouvelle phrase.

## Mettre à jour l'app

Remplacez les fichiers sur GitHub (**Add file → Upload files**, puis **Commit**).
**À chaque nouvelle version, augmentez le numéro de cache dans `sw.js`** (`PREFIX + 'v1'` → `'v2'`…).
Les appareils prennent la nouvelle version à la prochaine ouverture avec du réseau.

## Bon à savoir

- Le Bilan ne garde pas les fichiers de ventes : rechargez-les à chaque ouverture. Ils ne quittent jamais l'appareil.
- Le catalogue en cours de modification est gardé sur l'appareil jusqu'à sa publication.
- L'app partage la mémoire du navigateur avec les caisses installées sur le même appareil (adresse scraper147.github.io) ; elle n'y garde que des données très légères.
