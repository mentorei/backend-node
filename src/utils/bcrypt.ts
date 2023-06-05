import { compareSync, genSaltSync, hash } from 'bcrypt';

export const encodePassword = async (rawPassword: string): Promise<string> => {
  const SALT = genSaltSync();
  return hash(rawPassword, SALT);
};

export const comparePassword = (rawPassword: string, hash: string): boolean => {
  return compareSync(rawPassword, hash);
};
