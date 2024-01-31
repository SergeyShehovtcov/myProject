import { makeAutoObservable } from "mobx";
import { Category, Brand, Product } from "src/serverTypes";

export default class ProductStore {
  private _categories: Category[];
  private _brands: Brand[];
  private _products: Product[];
  private _selectedCategory: Category;
  private _selectedBrand: Brand;
  private _page: number;
  private _totalCount: number;
  private _limit: number;

  constructor() {
    this._categories = [];
    this._brands = [];
    this._products = [];
    this._selectedCategory = null;
    this._selectedBrand = null;
    this._page = 1;
    this._totalCount = 0;
    this._limit = 4;
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]): void {
    this._categories = categories;
  }

  setBrands(brands: Brand[]): void {
    this._brands = brands;
  }

  setProducts(products: Product[]): void {
    this._products = products;
  }

  setSelectedCategory(category: Category): void {
    this._selectedCategory = category;
  }

  setSelectedBrand(brand: Brand): void {
    this._selectedBrand = brand;
  }

  setPage(page: number): void {
    this._page = page;
  }

  setTotalCount(count: number): void {
    this._totalCount = count;
  }

  get categories(): Category[] {
    return this._categories;
  }

  get brands(): Brand[] {
    return this._brands;
  }

  get products(): Product[] {
    return this._products;
  }

  get selectedCategory(): Category {
    this.setPage(1);
    return this._selectedCategory;
  }

  get selectedBrand(): Brand {
    this.setPage(1);
    return this._selectedBrand;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get page(): number {
    return this._page;
  }

  get limit(): number {
    return this._limit;
  }
}
