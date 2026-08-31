import { CryptoGeneratorPort } from 'src/common/domain/port/crypto-generator.port';
import * as crypto from 'crypto';
import { hashSync } from 'bcrypt';
export class CryptoAdapter implements CryptoGeneratorPort {
  generatePassword(length: number): string {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }

  generateHash(word: string, length: number = 10) {
    return hashSync(word, length);
  }
}