function flattenObj(objToBeFlatten, newObj) {
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
function deepClone(objToBeCloned, newObj) {
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
function deepFreeze(objToBeFreezed) {
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

function newFreezedInstance(objToBeFreezed) {
    const result = deepClone(objToBeFreezed);
    deepFreeze(result);
    return result;
}

function deepCloneWithPropertyDescriptors(objToBeCloned) {
    
}


module.exports = {
    flattenObj,
    deepClone,
    deepFreeze,
    newFreezedInstance
}