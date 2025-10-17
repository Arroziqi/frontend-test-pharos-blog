export class LocalStorage {
  /**
   * Read typed array from localStorage by key
   */
  static read<T>(key: string): T[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T[]) : [];
  }

  /**
   * Write array data to localStorage by key
   */
  static write<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Remove item from localStorage
   */
  static clear(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }
}
