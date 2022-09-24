import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T = any> {
  public setItem(info: { data: T; key: string }): void {
    localStorage.setItem(info.key, JSON.stringify(info.data));
  }

  public getItem(key: string): T | null {
    const value = localStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value);
  }
}
