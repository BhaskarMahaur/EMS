import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export const generateToken = (
  payload: JwtPayload
): string => {

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: "1d",
  };

  return jwt.sign(
    payload,
    secret,
    options
  );
};