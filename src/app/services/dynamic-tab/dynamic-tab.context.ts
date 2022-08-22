import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';

@Injectable()
export class DynamicTabContext {
  data: any;
  id!: string;

  // tslint:disable-next-line:variable-name
  private _resolve: (...args: any[]) => void = () => {};
  // tslint:disable-next-line:variable-name
  private _reject: (reason: any) => void = () => {};
  // tslint:disable-next-line:variable-name
  private _promise: Promise<any> | null = null;

  /**
   * Положительный вариант
   * @param args параметры ответа
   */
  resolve(...args: any[]): void {
    this._resolve(...args);
  }

  /**
   * Отрицательный вариант
   * @param reason параметры ответа
   */
  reject(reason?: any): void {
    this._reject(reason);
  }

  show(): Observable<any> {
    return from(
      this._promise ||
        (this._promise = new Promise((resolve, reject) => {
          this._resolve = resolve;
          this._reject = reject;
        }))
    );
  }
}
