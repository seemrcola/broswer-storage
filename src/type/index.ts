import { Dic } from "../enum";

export interface IData<T> {
  value: T;
  [Dic.expire]: Expire;
}
export interface IResult<T> {
  message: string;
  value: T | null;
}
export type Key = string
export type Expire = Dic.forever | number
export interface IStorage {
  get: <T>(key: Key) => IResult<T>;
  set: <T>(key: Key, value: T, expire: Expire) => void;
  remove: (key: Key) => void;
  clear: () => void;
}

