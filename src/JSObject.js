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

JSObject.flattenObj = (objToBeFlatten, newObj) => {
    if(!newObj) {
        var newObj = {};
    }

    for(let key in objToBeFlatten) {
        if(typeof objToBeFlatten[key] === 'object' && !Array.isArray(objToBeFlatten[key])) {
            flattenObj(objToBeFlatten[key], newObj);
        } else {
            newObj[key] = objToBeFlatten[key];
        }
    }
    return newObj;
}

// typeof [] -> 'object'
// Array.isArray([]) -> true
JSObject.deepClone = (objToBeCloned, newObj) => {
    const result = newObj || {};
    if(!objToBeCloned || typeof objToBeCloned != 'object') {
        return objToBeCloned;
    }

    // not passing reference
    if(Array.isArray(objToBeCloned)) {
        return [...objToBeCloned];
    }

    for(let key in objToBeCloned) {
        const keyVal = objToBeCloned[key];

        switch(true) { 
            case (keyVal instanceof Date):
                const date = new Date();
                date.setDate(keyVal.getDate);
                result[key] = date;
                break;
            
            case (keyVal instanceof Array):
                const arr = [];
                for(let ele of keyVal) {
                    arr.push(deepClone(ele))
                }
                result[key] = arr;
                break;
            
            case (keyVal instanceof Object):
                let tempObj = {};
                for(let childObjKey in keyVal) {
                    tempObj[childObjKey] = deepClone(keyVal[childObjKey]);
                }
                result[key]= tempObj;
                break;

            case (keyVal instanceof Function):
                result[key] = keyVal;
                break;

            default:
                result[key] = keyVal;
        }
    }
    return result;
}

const functionOrObject = ['object', 'function'];

JSObject.deepFreeze = (objToBeFreezed) => {
    if(!objToBeFreezed) return objToBeFreezed;
    Object.freeze(objToBeFreezed);

    Object.getOwnPropertyNames(objToBeFreezed).map(key => {
        const value = objToBeFreezed[key];

        const isNull = value == null;
        const isFunctionOrObject = functionOrObject.includes(typeof value);
        const isAlreadyFrozen = Object.isFrozen(value);

        if(!isNull && isFunctionOrObject && !isAlreadyFrozen) {
            deepFreeze(objToBeFreezed[key])
        }
    })

    return objToBeFreezed;
}

JSObject.newFreezedInstance = (objToBeFreezed) => {
    const result = deepClone(objToBeFreezed);
    deepFreeze(result);
    return result;
}

module.exports = JSObject;