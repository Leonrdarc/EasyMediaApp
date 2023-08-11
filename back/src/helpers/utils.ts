import bcrypt from "bcrypt";

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
export const comparePasswords = async (
  plaintext: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(plaintext, hashed);
};

export const getFilters = (userId: string, stringDate?: string) => {
  let filter: { userId: string; date?: unknown } = { userId: userId };
  if (stringDate) {
    // Parse the date, considering "date" is in the format "YYYY-MM-DD"
    const parsedDate = new Date(stringDate as string);
    const nextDay = new Date(parsedDate);
    nextDay.setDate(parsedDate.getDate() + 1); // Set to start of the next day

    // Add to the filter object
    filter["date"] = { $gte: parsedDate, $lt: nextDay };
  }
  return filter;
};

export const getLimitAndSkip = (limit = '3', page = '1') => {
  const numLimit = parseInt(limit as string);
  const numPage = parseInt(page as string);

  return { numLimit, numSkip: (numPage - 1) * numLimit };
};
