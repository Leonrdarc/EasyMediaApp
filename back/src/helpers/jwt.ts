import jwt, { JwtPayload } from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRATION } from "../config/env";

/**
 * Generate a new JWT.
 * @param {object} payload - Payload data to encode in the JWT.
 * @param {string} expiresIn - Duration for JWT expiration.
 * @returns {string} The generated JWT.
 */
export const encodeJWT = (
  payload: object,
  expiresIn: string = JWT_EXPIRATION
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Decode a JWT.
 * @param {string} token - The JWT to decode.
 * @returns {object | null} Decoded payload if token is valid, null otherwise.
 */
export const decodeJWT = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
