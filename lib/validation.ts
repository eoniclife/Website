export function isValidUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export function isValidEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) && str.length <= 255;
}

export function isValidIndianWhatsApp(str: string): boolean {
  return /^\+91[6-9]\d{9}$/.test(str);
}

export function isValidScore(n: unknown): n is 0 | 1 | 2 {
  return n === 0 || n === 1 || n === 2;
}

export function isValidTime(str: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(str);
}

export function isValidQuestionId(str: string): boolean {
  return /^Q([1-9]|[12]\d|3[0-6])$/.test(str);
}
