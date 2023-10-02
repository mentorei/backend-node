import { AES, enc, mode } from 'crypto-js';
import { compareSync, genSaltSync, hash } from 'bcrypt';

export const encodePassword = async (rawPassword: string): Promise<string> => {
  const SALT = genSaltSync();
  return hash(rawPassword, SALT);
};

export const comparePassword = (rawPassword: string, hash: string): boolean => {
  return compareSync(rawPassword, hash);
};

export const decryptPassword = (encryptPassword: string): string => {
  const privateKey = enc.Utf8.parse(process.env.CRYPTO_PRIVATE_KEY);
  const iv = enc.Utf8.parse(process.env.CRYPTO_IV);
  const bytes = AES.decrypt(encryptPassword, privateKey, {
    iv,
    mode: mode.CBC,
  });

  return bytes.toString(enc.Utf8);
};
