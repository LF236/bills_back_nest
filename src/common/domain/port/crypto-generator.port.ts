export interface CryptoGeneratorPort {
  generatePassword(length: number) : string;
  generateHash(word: string, length: number);
}