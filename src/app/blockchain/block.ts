'use client';

import { CryptoUtils } from '@/utils/crypto';

/**
 * Classe Block - Représente un bloc dans la blockchain
 *
 * Chaque bloc contient :
 * - Des données (transactions)
 * - Un lien vers le bloc précédent (previousHash)
 * - Un hash unique calculé à partir de son contenu
 * - Un nonce utilisé pour le minage
 */
export class Block {
    // Position du bloc dans la chaîne (0 = Genesis, 1 = premier bloc, etc.)
    public index: number;

    // Moment de création du bloc (timestamp)
    public timestamp: number;

    // Les transactions contenues dans ce bloc
    public data: {
        fromAddress: string | null; // Qui envoie (null = récompense de minage)
        toAddress: string; // Qui reçoit
        amount: number; // Montant de la transaction
    }[];

    // Hash du bloc précédent (lien dans la chaîne)
    public previousHash: string | null;

    // Nombre utilisé pour le minage (Proof of Work)
    public nonce: number;

    // Hash unique de ce bloc (calculé à partir de tout le contenu)
    public hash: string | null;

    /**
     * Constructeur - Crée un nouveau bloc
     *
     * TODO: Initialiser toutes les propriétés du bloc :
     * - index : position dans la chaîne
     * - timestamp : moment de création
     * - data : les transactions
     * - previousHash : hash du bloc précédent
     * - nonce : commencer à 0
     * - hash : commencer à null (sera calculé plus tard)
     */
    constructor(
        index: number,
        timestamp: number,
        data: {
            fromAddress: string | null;
            toAddress: string;
            amount: number;
        }[],
        previousHash: string | null
    ) {
        // TODO: Initialiser toutes les propriétés
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = null;
    }

    /**
     * Calcule le hash du bloc
     *
     * Le hash est calculé à partir de :
     * - L'index du bloc
     * - Le hash du bloc précédent
     * - Le timestamp
     * - Les données (transactions)
     * - Le nonce
     *
     * TODO:
     * 1. Créer une chaîne de caractères avec tous les éléments
     * 2. Utiliser CryptoUtils.sha256() pour calculer le hash
     * 3. Retourner le hash
     */
    async calculateHash(): Promise<string> {
        // TODO: Calculer et retourner le hash
    }

    /**
     * Mine le bloc (Proof of Work)
     *
     * Le minage consiste à trouver un hash qui commence par un certain nombre de zéros.
     * Plus la difficulté est élevée, plus il faut de zéros au début.
     *
     * Processus :
     * 1. Calculer le hash actuel
     * 2. Vérifier s'il commence par le bon nombre de zéros
     * 3. Si non, incrémenter le nonce et recommencer
     * 4. Si oui, le bloc est miné !
     *
     * TODO:
     * 1. Créer la cible (ex: "000" pour difficulté 3)
     * 2. Boucle infinie :
     *    - Calculer le hash actuel
     *    - Vérifier s'il commence par la cible
     *    - Si oui, sortir de la boucle
     *    - Si non, incrémenter le nonce
     * 3. Afficher des logs pour suivre le processus
     */
    async mineBlock(difficulty: number): Promise<void> {
        // TODO: Implémenter le minage du bloc
        const target = '0'.repeat(difficulty);

        let attempts = 0;
        const startTime = Date.now();

        while (true) {
            this.hash = await this.calculateHash();
            attempts++;

            // Log chaque tentative avec le hash essayé
            console.log(
                `🔄 Tentative ${attempts}: Hash = ${this.hash.substring(0, 20)}... (Nonce: ${this.nonce})`
            );

            if (this.hash.startsWith(target)) {
                const duration = Date.now() - startTime;
                console.log(
                    '🔐 Hash calculé pour le bloc',
                    this.index,
                    ':',
                    this.hash.substring(0, 20) + '...'
                );
                console.log('📊 Statistiques:', {
                    nonce: this.nonce,
                    attempts: attempts,
                    duration: duration + 'ms',
                    hash: this.hash.substring(0, 20) + '...',
                });
                break;
            }

            this.nonce++;
        }
    }
}
