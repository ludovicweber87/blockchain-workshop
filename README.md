# 🚀 Projet Blockchain Éducatif

## 📋 Vue d'ensemble

Ce projet est conçu pour apprendre les concepts fondamentaux de la blockchain en implémentant une blockchain simple en TypeScript. C'est un projet éducatif qui permet de comprendre les mécanismes de base comme le minage, les transactions, et la validation de chaîne.

## 🎯 Objectifs d'apprentissage

### Concepts à maîtriser :

- **Bloc Genesis** : Le premier bloc de la blockchain
- **Proof of Work** : Algorithme de consensus par minage
- **Hachage** : Calcul d'empreintes uniques pour les blocs
- **Chaînage** : Liaison des blocs entre eux
- **Transactions** : Transferts de valeur entre adresses
- **Validation** : Vérification de l'intégrité de la chaîne

## 📁 Structure du projet

```
src/app/blockchain/
├── index.ts    # Classe Blockchain principale
└── block.ts    # Classe Block individuel
```

## 🔧 Ce qui est attendu

### 1. Fichier `block.ts` - Classe Block

#### Constructeur

```typescript
constructor(index, timestamp, data, previousHash) {
    // TODO: Initialiser toutes les propriétés du bloc
}
```

**À implémenter :**

- Assigner les paramètres aux propriétés de la classe
- Initialiser `nonce` à 0
- Initialiser `hash` à null

#### Méthode `calculateHash()`

```typescript
async calculateHash(): Promise<string> {
    // TODO: Calculer et retourner le hash
}
```

**À implémenter :**

- Créer une chaîne de caractères avec tous les éléments du bloc
- Utiliser `CryptoUtils.sha256()` pour calculer le hash
- Retourner le hash calculé

#### Méthode `mineBlock(difficulty)`

```typescript
async mineBlock(difficulty: number): Promise<void> {
    // TODO: Implémenter le minage du bloc
}
```

**À implémenter :**

- Créer la cible (ex: "000" pour difficulté 3)
- Boucle infinie pour tester différents nonces
- Vérifier si le hash commence par la cible
- Incrémenter le nonce si le hash n'est pas valide
- Sortir de la boucle quand un hash valide est trouvé

### 2. Fichier `index.ts` - Classe Blockchain

#### Constructeur

```typescript
constructor() {
    // TODO: Initialiser les propriétés ici
}
```

**À implémenter :**

- Initialiser `chain` comme tableau vide
- Définir `difficulty` (ex: 3)
- Initialiser `data` comme tableau vide
- Définir `miningReward` (ex: 0.0001)

#### Méthode `initBlockchain()`

```typescript
async initBlockchain() {
    // TODO: Implémenter l'initialisation
}
```

**À implémenter :**

- Créer un bloc Genesis avec `createGenesisBlock()`
- Ajouter ce bloc à la chaîne

#### Méthode `createGenesisBlock()`

```typescript
async createGenesisBlock() {
    // TODO: Créer et retourner le bloc Genesis
}
```

**À implémenter :**

- Créer un nouveau Block avec index=0, timestamp actuel, data=[], previousHash='0'
- Calculer son hash
- Retourner le bloc

#### Méthode `getLatestBlock()`

```typescript
getLatestBlock() {
    // TODO: Retourner le dernier bloc
}
```

**À implémenter :**

- Retourner le dernier élément du tableau `chain`

#### Méthode `addBlock(newBlock)`

```typescript
async addBlock(newBlock: Block) {
    // TODO: Implémenter l'ajout de bloc
}
```

**À implémenter :**

- Définir le `previousHash` du nouveau bloc
- Miner le bloc avec la difficulté actuelle
- Ajouter le bloc à la chaîne

#### Méthode `createTransaction(transaction)`

```typescript
createTransaction(transaction) {
    // TODO: Ajouter la transaction aux données en attente
}
```

**À implémenter :**

- Ajouter la transaction au tableau `data`

#### Méthode `mineData(miningRewardAddress)`

```typescript
async mineData(miningRewardAddress: string) {
    // TODO: Implémenter le minage
}
```

**À implémenter :**

- Ajouter une transaction de récompense pour le mineur
- Créer un nouveau bloc avec les transactions
- Miner le bloc
- Ajouter le bloc à la chaîne
- Vider le tableau `data`

#### Méthode `isChainValid()`

```typescript
async isChainValid() {
    // TODO: Implémenter la validation de la chaîne
}
```

**À implémenter :**

- Vérifier le bloc Genesis (index 0)
- Pour chaque bloc suivant :
    - Vérifier que son hash est correct
    - Vérifier qu'il pointe vers le bon bloc précédent
- Retourner true si tout est valide, false sinon

## 🧪 Tests et validation

### Test de base

```typescript
// Créer une blockchain
const blockchain = new Blockchain();
await blockchain.initBlockchain();

// Ajouter des transactions
blockchain.createTransaction({
    fromAddress: 'Alice',
    toAddress: 'Bob',
    amount: 100,
});

// Miner un bloc
await blockchain.mineData('MinerAddress');

// Vérifier la validité
const isValid = await blockchain.isChainValid();
console.log('Blockchain valide:', isValid);
```

## 📚 Ressources d'apprentissage

### Concepts clés à comprendre :

1. **Hash** : Fonction mathématique qui transforme des données en empreinte unique
2. **Nonce** : Nombre utilisé pour modifier le hash jusqu'à obtenir un résultat valide
3. **Difficulté** : Nombre de zéros requis au début du hash pour qu'il soit valide
4. **Proof of Work** : Algorithme qui nécessite du travail de calcul pour valider un bloc
5. **Chaînage** : Chaque bloc contient le hash du bloc précédent, créant une chaîne immuable

### Ordre d'implémentation recommandé :

1. Commencer par le constructeur de `Block`
2. Implémenter `calculateHash()`
3. Implémenter `mineBlock()`
4. Passer à la classe `Blockchain`
5. Implémenter le constructeur et `initBlockchain()`
6. Implémenter `createGenesisBlock()` et `getLatestBlock()`
7. Implémenter `addBlock()` et `createTransaction()`
8. Implémenter `mineData()`
9. Enfin, implémenter `isChainValid()`

## 🎉 Objectifs de réussite

Un projet réussi devrait permettre de :

- ✅ Créer une blockchain avec un bloc Genesis
- ✅ Ajouter des transactions
- ✅ Miner de nouveaux blocs
- ✅ Vérifier l'intégrité de la chaîne
- ✅ Comprendre les concepts de base de la blockchain

## 🚨 Conseils

- **Prenez votre temps** : La blockchain est un concept complexe
- **Testez chaque étape** : Vérifiez que chaque fonction marche avant de passer à la suivante
- **Utilisez les logs** : Les logs dans `mineBlock()` vous aideront à comprendre le processus
- **Comprenez le hash** : Le hash est la base de tout le système
- **Visualisez la chaîne** : Dessinez les blocs et leurs liens pour mieux comprendre

## 🔗 Liens utiles

- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
- [Blockchain Basics](https://www.investopedia.com/terms/b/blockchain.asp)
- [Proof of Work Explained](https://www.investopedia.com/terms/p/proof-work.asp)

---

**Bon courage dans votre apprentissage de la blockchain ! 🚀**
