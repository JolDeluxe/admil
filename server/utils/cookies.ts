import jwt from "jsonwebtoken";
import chalk from "chalk";

export function isCookieValid(cookie: any): boolean {
  const token = cookie;
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    return true;
  } catch (error) {
    chalk.red("ERROR on jwt verify", error);
    return false;
  }
}
