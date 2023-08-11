import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;
const JWT_SECRET = process.env.JWT_SECRET || "secret_key_for_development"; // You should use a more secure default or even not have a default.
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export { NODE_ENV, PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRATION };
