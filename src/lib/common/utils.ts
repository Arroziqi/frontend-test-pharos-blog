// TODO: create service to generate uuid for id
/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  // Check if crypto.randomUUID is available
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  // Fallback manual generator (RFC4122 compliant v4)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// TODO: create service to make sure created at is in the right format
export function getCurrentIsoDate(): string {
  return new Date().toISOString();
}

export function ensureValidCreatedAt(date?: string): string {
  return date && !isNaN(Date.parse(date)) ? date : new Date().toISOString();
}

// TODO: create service to automatically generate slug based on title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
