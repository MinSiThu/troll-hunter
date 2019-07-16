let map = new Map();

class Container{
    static add(name,component){
        map.set(name,component);
    }

    static loop(callback){
        map.forEach(callback)
    }

    static get(name){
        return map.get(name);
    }
}

module.exports = Container;