'use client';

import { Block } from './block';

/**
 * Classe Blockchain - Le cœur de notre système blockchain
 *
 * Cette classe représente une blockchain complète qui :
 * - Stocke une chaîne de blocs liés entre eux
 * - Gère les transactions entre utilisateurs
 * - Permet le minage de nouveaux blocs
 * - Vérifie l'intégrité de la chaîne
 */
export class Blockchain {
    // La chaîne de blocs - chaque bloc est lié au précédent par son hash
    public chain: Block[];

    // La difficulté de minage - plus elle est élevée, plus il faut de calculs
    public difficulty: number;

    // Les transactions en attente d'être minées dans le prochain bloc
    public data: {
        fromAddress: string | null; // Qui envoie (null = récompense de minage)
        toAddress: string; // Qui reçoit
        amount: number; // Montant de la transaction
    }[];

    // Récompense donnée au mineur qui valide un bloc
    public miningReward: number;

    /**
     * Constructeur - Initialise une nouvelle blockchain
     *
     * TODO: Initialiser les propriétés de base :
     * - chain : tableau vide pour stocker les blocs
     * - difficulty : niveau de difficulté pour le minage (ex: 3)
     * - data : tableau vide pour les transactions en attente
     * - miningReward : récompense pour le minage (ex: 0.0001)
     */
    constructor() {
        // TODO: Initialiser les propriétés ici
        this.chain = [];
        this.difficulty = 3;
        this.data = [];
        this.miningReward = 0.0001;
    }

    /**
     * Initialise la blockchain en créant le bloc Genesis
     *
     * Le bloc Genesis est le premier bloc de la chaîne.
     * Il n'a pas de bloc précédent et sert de point de départ.
     *
     * TODO:
     * 1. Créer un bloc Genesis avec createGenesisBlock()
     * 2. Ajouter ce bloc à la chaîne
     */
    async initBlockchain() {
        // TODO: Implémenter l'initialisation
    }

    /**
     * Crée le premier bloc de la blockchain (bloc Genesis)
     *
     * Le bloc Genesis a :
     * - index = 0 (premier bloc)
     * - timestamp = moment de création
     * - data = tableau vide (pas de transactions)
     * - previousHash = '0' (pas de bloc précédent)
     *
     * TODO:
     * 1. Créer un nouveau Block avec les paramètres du Genesis
     * 2. Calculer son hash
     * 3. Retourner le bloc
     */
    async createGenesisBlock() {
        // TODO: Créer et retourner le bloc Genesis
    }

    /**
     * Récupère le dernier bloc de la chaîne
     *
     * Utile pour créer de nouveaux blocs qui doivent
     * référencer le hash du bloc précédent.
     *
     * TODO: Retourner le dernier élément du tableau chain
     */
    getLatestBlock() {
        // TODO: Retourner le dernier bloc
    }

    /**
     * Ajoute un nouveau bloc à la chaîne
     *
     * Avant d'ajouter un bloc, il faut :
     * 1. Lier le nouveau bloc au précédent (previousHash)
     * 2. Miner le bloc (trouver un hash valide)
     * 3. L'ajouter à la chaîne
     *
     * TODO:
     * 1. Définir le previousHash du nouveau bloc
     * 2. Miner le bloc avec la difficulté actuelle
     * 3. Ajouter le bloc à la chaîne
     */
    async addBlock(newBlock: Block) {
        // TODO: Implémenter l'ajout de bloc
    }

    /**
     * Crée une nouvelle transaction
     *
     * Une transaction représente un transfert de valeur entre deux adresses.
     * Les transactions sont stockées en attente jusqu'au prochain minage.
     *
     * TODO: Ajouter la transaction au tableau data
     */
    createTransaction(transaction: {
        fromAddress: string | null; // Qui envoie (null = récompense de minage)
        toAddress: string; // Qui reçoit
        amount: number; // Montant
    }) {
        // TODO: Ajouter la transaction aux données en attente
    }

    /**
     * Mine les transactions en attente et crée un nouveau bloc
     *
     * Le minage consiste à :
     * 1. Ajouter une récompense pour le mineur
     * 2. Créer un nouveau bloc avec toutes les transactions
     * 3. Miner le bloc (trouver un hash valide)
     * 4. Ajouter le bloc à la chaîne
     * 5. Vider les transactions en attente
     *
     * TODO:
     * 1. Ajouter une transaction de récompense pour le mineur
     * 2. Créer un nouveau bloc avec les transactions
     * 3. Miner le bloc
     * 4. Ajouter le bloc à la chaîne
     * 5. Vider le tableau data
     */
    async mineData(miningRewardAddress: string) {
        // TODO: Implémenter le minage
    }

    /**
     * Vérifie l'intégrité de la blockchain
     *
     * Pour qu'une blockchain soit valide :
     * 1. Le bloc Genesis doit avoir un hash correct
     * 2. Chaque bloc doit avoir un hash valide
     * 3. Chaque bloc doit être lié au précédent (previousHash)
     *
     * TODO:
     * 1. Vérifier le bloc Genesis (index 0)
     * 2. Pour chaque bloc suivant :
     *    - Vérifier que son hash est correct
     *    - Vérifier qu'il pointe vers le bon bloc précédent
     * 3. Retourner true si tout est valide, false sinon
     */
    async isChainValid() {
        // TODO: Implémenter la validation de la chaîne
    }
}
