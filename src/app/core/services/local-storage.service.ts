import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  read<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)!);
  }

  save<T>(key: string, itemValue: T): void {
    localStorage.setItem(key, JSON.stringify(itemValue));
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  addToArray<T>(key: string, value: T): T[] {
    let storage = this.read<T[]>(key) || [];
    storage.push(value);
    this.save(key, storage);
    return storage;
  }

  removeFromArray<T>(key: string, index: number): T[] {
    let storage = this.read<T[]>(key) || [];
    if (index == -1) return storage;
    storage.splice(index, 1);
    this.save(key, storage);
    return storage;
  }
}
