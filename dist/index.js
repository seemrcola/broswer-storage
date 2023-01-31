var Dic;
(function (Dic) {
    Dic["forever"] = "forever";
    Dic["expire"] = "__expire__";
})(Dic || (Dic = {}));

class Storage {
    set(key, value, expire = Dic.forever) {
        const data = {
            value,
            [Dic.expire]: expire
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            const data = JSON.parse(value);
            const now = new Date().getTime();
            //判断有没有过期
            if (typeof data[Dic.expire] === 'number' && now > data[Dic.expire]) {
                this.remove(key);
                return {
                    message: `[storage warning]: ${key}已过期`,
                    value: null
                };
            }
            else {
                return {
                    message: 'success',
                    value: data.value
                };
            }
        }
        else {
            return {
                message: "[storage warning] 值无效",
                value: null
            };
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}

export { Storage as default };
