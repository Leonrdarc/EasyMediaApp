import bcrypt from 'bcrypt';

/**
 * The number of rounds to use when salting the password hash.
 * A higher value increases the time taken to hash the password,
 * providing better security but at a cost of slower performance.
 * Typically, 10 is a good compromise, but this can be adjusted
 * based on security needs and performance constraints.
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plaintext password.
 *
 * @param password - The plaintext password.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plaintext password with a hashed password.
 *
 * @param plaintext - The plaintext password.
 * @param hashed - The hashed password.
 * @returns True if they match, false otherwise.
 */
export const comparePasswords = async (plaintext: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(plaintext, hashed);
};