import { makeAutoObservable } from "mobx";
import { User } from "src/serverTypes";

export default class UserStore {
  private _isAuth: boolean;
  private _user: User;

  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean): void {
    this._isAuth = bool;
  }

  setUser(user: User): void {
    this._user = user;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get user(): User {
    return this._user;
  }
}
