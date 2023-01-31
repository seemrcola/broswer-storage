import { IStorage, Key, Expire, IData, IResult } from "./type";
import { Dic } from "./enum";

class Storage implements IStorage {
  set<T>(key: Key, value : T, expire: Expire = Dic.forever) {
    const data: IData<T> = {
      value, 
      [Dic.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  get<T>(key: Key): IResult<T> {
    const value = localStorage.getItem(key)
    if(value) {
      const data: IData<T> = JSON.parse(value)
      const now = new Date().getTime()
      if(typeof data[Dic.expire] === 'number' && now > data[Dic.expire]) {
        this.remove(key)
        return {
          message: `[storage warning]: ${key}已过期`,
          value: null
        }
      }
      else {
        return {
          message: 'success',
          value: data.value
        }
      }
    }
    else {
      return {
        message: "[storage warning] 值无效",
        value: null
      }
    }
  }

  remove(key: Key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export default Storage
