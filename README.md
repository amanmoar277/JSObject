# JSObject
A dependency free JS library which provides additional methods, other than methods which Object provides us in JS.

### Functions available
```
1. freeze
2. cloneWithDescriptor    (clone deeply with property descriptors)
3. seal
4. isSealed
5. isFrozen
6. addProperty
7. keys
8. values
9. entries
10. keysDeep
11. valuesDeep
12. entriesDeep
13. flattenObj
14. deepClone
15. deepFreeze
16. newFreezedInstance
```

### How to import
```
import JSObject from 'object-js'
```

### Methods

```
// Let an example object

let obj = {
    outer: "dummy",
    nested: {
        inner: 'inner dummy',
    }
}
```
##### 1. JSObject.freeze( objectToBefreezed )
```
// It freezes the passed object and also return it

JSObject.freeze(obj)
// OR
const freezedObj = JSObject.freeze(obj)
```

##### 2. JSObject.cloneWithDescriptor( objectToBeCloned )
```
// It clone deeply with property descriptors
// It do nothing to passed object and returns cloned object (including the descriptors)

const freezedObj = JSObject.cloneWithDescriptor(obj)
```

##### 3. JSObject.seal( objectToBeSealed )
```
// It seals the passed object and also return it

JSObject.seal(obj)
// OR
const sealedObj = JSObject.seal(obj)
```

##### 4. JSObject.isSealed( objectToBeChecked )
```
// It return true if passed object is sealed, otherwise false

const isSealed = JSObject.isSealed(obj)
```

##### 5. JSObject.isFrozen( objectToBeChecked )
```
// It return true if passed object is freezed, otherwise false

const isFrozen = JSObject.isFrozen(obj)
```

##### 6. JSObject.addProperty( objInWhichPropertyToBeAdded, propertyName, propertyValue, isWritable, isEnumerable, isConfigurable )
```
// It add property to passed object and also returns it
// It is different then : obj['propertyName'] = 'propertyValue', because this way all descriptor flags are set to true

const isFrozen = JSObject.isFrozen(obj)
```

##### 7. JSObject.keys( objWhoseKeysToBeFound )
```
// It returns array of keys name

const objKeysArray = JSObject.keys(obj)
```

##### 8. JSObject.keysDeep( objWhoseKeysToBeFound, isSymbolicKeysAlsoRequired )
```
// It returns array of keys name
// if isSymbolicKeysAlsoRequired = true : returns symbolic keys also
// if isSymbolicKeysAlsoRequired = false : returns non-symbolic keys (all keys irrespective of enumerable flag value)

const objKeysArrayIncludingSymbolicKeys = JSObject.keysDeep(obj, true)
const objKeysArrayExcludingSymbolicKeys = JSObject.keysDeep(obj)
```

##### 9. JSObject.values( objWhoseValuesToBeFound )
```
// It returns array of values

const objValuesArray = JSObject.values(obj)
```

##### 10. JSObject.valuesDeep( objWhoseValuesToBeFound, isSymbolicValuesAlsoRequired )
```
// It returns array of values
// if isSymbolicValuesAlsoRequired = true : returns symbolic values also
// if isSymbolicValuesAlsoRequired = false : returns non-symbolic values

const objValuesArrayIncludingSymbolicValues = JSObject.valuesDeep(obj, true)
const objValuesArrayExcludingSymbolicValues = JSObject.valuesDeep(obj)
```

##### 11. JSObject.entries( objWhoseEntriesToBeFound )
```
// It returns array of [key, value]

const objEntriesArray = JSObject.entries(obj)
```

##### 12. JSObject.entriesDeep( objWhoseEntriesToBeFound, isSymbolicEntriesAlsoRequired )
```
// It returns array of values
// if isSymbolicEntriesAlsoRequired = true : returns symbolic entries also
// if isSymbolicEntriesAlsoRequired = false : returns non-symbolic entries

const objEntriesArrayIncludingSymbolicEntries = JSObject.entriesDeep(obj, true)
const objEntriesArrayExcludingSymbolicEntries = JSObject.entriesDeep(obj)
```

#### Let's take some other example for other methods
```
const obj = {
    name: 'aman',  
    class: '1',  
    nested1: { 
        nested2: { 
            name: "moar", 
            nested3: { 
                arr: ["1",'2'] 
            } 
        } 
    } 
}; 
```
##### 13. JSObject.flattenObj( objToBeFlattened );
```
// returns an object with all keys-value pair at 0 level

const flattenedObj = JSObject.flattenObj(obj)
flattenedObj         // { name: 'moar', class: '1', arr: [ '1', '2' ] }
```

##### 14. JSObject.deepClone( objToBeCloned, alreadyExistingVariableOrObject )     // OR
##### const result2 = JSObject.deepClone( objToBeCloned )                          // OR
##### const result3 = JSObject.deepClone( objToBeCloned, {}) 

```
// Object.clone(obj) put same refernce as of parent for nexted object
// But this method clone it into new Object by creating new Object and not any reference


const result = {initialValue: 1}
JSObject.deepClone(obj, result)

const isEqual = result == obj;  // false 

result.nested1.nested2.name = "someName"  
result.nested1.nested2.name  // someName 
obj.nested1.nested2.name     // moar 
```

##### 15. JSObject.deepFreeze( objToBeFreezed )

```
// Object.freeze(obj) freezes only keys-value at 0 level
// But this method freeze the whole object, even inner objects


const obj = { prop: { innerProp: 1 } };
JSObject.deepFreeze(obj);

obj.prop.innerProp = 5;
console.log(obj.prop.innerProp); // 1  
```

##### 16. const newInstance = JSObject.newFreezedInstance( referenceObj )
```
// Returns a new freezed object


const obj = { prop: { innerProp: 1 } };
JSObject.newFreezedInstance(obj);

obj.prop.innerProp = 5;
console.log(obj.prop.innerProp); // 1  
```
