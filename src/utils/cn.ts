import { separators } from "../constants/separators";
import { PlainObject } from "../models/plainObject";

export function getClassNamesFromObject(obj: PlainObject): string {
  return Object.keys(obj)
    .map((key) => (obj[key] ? key : null))
    .filter((v) => v)
    .join(separators.space);
}

export function cn(...args: (string | PlainObject | undefined | null)[]): string {
  return args
    .map((arg) => {
      if (!arg) {
        return arg;
      }

      if (Array.isArray(arg)) {
        return cn(...arg);
      }

      if (typeof arg === "object") {
        return getClassNamesFromObject(arg);
      }

      return String(arg);
    })
    .filter((v) => v)
    .join(separators.space);
}
