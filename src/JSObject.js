// 'use-strict'

const JSObject = {}

JSObject.freeze = function (obj) {
    const keys = Object.getOwnPropertyNames(obj);

    for(let key of keys) {
        Object.defineProperty(obj, key, { writable: false, configurable: false }) 
    }

    // Forbids adding properties to freezed objects
    const nonExtenableObject = Object.preventExtensions(obj)
    return nonExtenableObject;
}


JSObject.cloneWithDescriptor = function (obj) {
    // It deep clone with property descriptors
    const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
    return clone;
}


JSObject.seal = function (obj) {
    const keys = Object.getOwnPropertyNames(obj);

    for(let key of keys) {
        Object.defineProperty(obj, key, { configurable: false }) 
    }
    
    // Forbids adding properties to freezed objects
    const nonExtenableObject = Object.preventExtensions(obj)
    return nonExtenableObject;
}


JSObject.isSealed = function (obj) {
    const values = Object.getOwnPropertyDescriptors(obj);

    const keys = Object.getOwnPropertyNames(obj);
    for(let key of keys) {
        if(values[key]["configuration"] === true) {
            return false;
        }
    }

    const canAddProperty = Object.isExtensible(obj)
    return canAddProperty === false;
}


JSObject.isFrozen = function (obj) {
    const values = Object.getOwnPropertyDescriptors(obj)

    const keys = Object.getOwnPropertyNames(obj)
    for(let key of keys) {
        if(values[key]["configuration"] === true || values[key]["writable"] === true) {
            return false;
        }
    }

    const canAddProperty = Object.isExtensible(obj)
    return canAddProperty === false;
}


// Add property with descriptors
JSObject.addProperty = (obj, key, keyValue, writable = true, enumerable = true, configurable = true) => {
    if(!obj || !key || !keyValue) {
        return;
    }

    Object.defineProperty(obj, key, {
        value: keyValue,
        writable,
        enumerable,
        configurable
    });

    return obj;
}

JSObject.keys = (obj) => {
    const keys = [];
    for(const key in obj) {
        keys.push(key);
    }
    return keys;
}

JSObject.values = (obj) => {
    const values = [];
    for(const key in obj) {
        values.push(obj[key]);
    }
    return values;
}

JSObject.entries = (obj) => {
    const entries = [];
    for(const key in obj) {
        entries.push(
            [key, obj[key]]
        );
    }
    return entries;
}



// Get all keys including symbols and non-enumerable keys
JSObject.keysDeep = (obj, fetchSymbols = false) => {
    // to get non-symbol keys (enumerable keys will be fetched by this)
    const keysAll = Object.getOwnPropertyNames(obj);
    if(fetchSymbols) {
        // To get all Symbol keys also
        Object.getOwnPropertySymbols(obj).forEach(key => {
            keysAll.push(key)
        })
    }
    return keysAll;
}

JSObject.valuesDeep = (obj, fetchSymbols = false) => {
    const keysAll = Object.getOwnPropertyNames(obj);
    if(fetchSymbols) {
        // To get all Symbol keys also
        Object.getOwnPropertySymbols(obj).forEach(key => {
            keysAll.push(key)
        })
    }
    const values = [];
    for(const key of keysAll) {
        values.push(obj[key]);
    }
    return values;
}

JSObject.entriesDeep = (obj, fetchSymbols = false) => {
    const keysAll = Object.getOwnPropertyNames(obj);
    if(fetchSymbols) {
        // To get all Symbol keys also
        Object.getOwnPropertySymbols(obj).forEach(key => {
            keysAll.push(key)
        })
    }
    const entries = [];
    for(const key of keysAll) {
        entries.push(
            [key, obj[key]]
        );
    }
    return entries;
}

module.exports = JSObject;