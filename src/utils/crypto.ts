import CryptoJS from 'crypto-js';

export class CryptoUtils {
    /**
     * Hash une chaîne avec SHA-256
     */
    static sha256(data: string): string {
        return CryptoJS.SHA256(data).toString();
    }

    /**
     * Hash une chaîne avec MD5
     */
    static md5(data: string): string {
        return CryptoJS.MD5(data).toString();
    }

    /**
     * Chiffre une chaîne avec AES
     */
    static encryptAES(data: string, secretKey: string): string {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    /**
     * Déchiffre une chaîne avec AES
     */
    static decryptAES(encryptedData: string, secretKey: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    /**
     * Génère un hash HMAC
     */
    static hmac(data: string, secretKey: string): string {
        return CryptoJS.HmacSHA256(data, secretKey).toString();
    }

    /**
     * Génère un salt aléatoire
     */
    static generateSalt(length: number = 16): string {
        return CryptoJS.lib.WordArray.random(length).toString();
    }

    /**
     * Hash un mot de passe avec salt
     */
    static hashPassword(password: string, salt: string): string {
        return CryptoJS.PBKDF2(password, salt, {
            keySize: 256 / 32,
            iterations: 1000,
        }).toString();
    }

    /**
     * Vérifie un mot de passe
     */
    static verifyPassword(
        password: string,
        salt: string,
        hash: string
    ): boolean {
        const computedHash = this.hashPassword(password, salt);
        return computedHash === hash;
    }
}
