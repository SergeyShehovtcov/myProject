import { makeAutoObservable } from "mobx";
import { Product } from "src/serverTypes";

export default class BasketStore {
  private _products: Product[];
  
  constructor() {
    this._products = [];
    makeAutoObservable(this);
  }

  add(product: Product): void {
    this._products.push(product);
  }

  delete(index: number): void {
    this._products.splice(index, 1);
  }

  get products(): Product[] {
    return this._products.filter((e) => e !== null);
  }

  get count(): number {
    return this._products.length;
  }

  get sum(): number {
    let sum = 0;
    this._products.map(p => sum += p.price);
    return sum;
  }
}
