# JSObject
A JS library which provides additional methods other then methods which Object provides in JS.

### Functions available
```
freeze
cloneWithDescriptor
seal
isSealed
isFrozen
addProperty
keys
values
entries
keysDeep
valuesDeep
entriesDeep
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
1. JSObject.freeze( objectToBefreezed )
```
// It freezes the passed object and also return it

JSObject.freeze(obj)
// OR
const freezedObj = JSObject.freeze(obj)
```

2. JSObject.cloneWithDescriptor( objectToBeCloned )
```
// It do nothing to passed object and returns cloned object (including the descriptors)

const freezedObj = JSObject.cloneWithDescriptor(obj)
```

3. JSObject.seal( objectToBeSealed )
```
// It seals the passed object and also return it

JSObject.seal(obj)
// OR
const sealedObj = JSObject.seal(obj)
```

4. JSObject.isSealed( objectToBeChecked )
```
// It return true if passed object is sealed, otherwise false

const isSealed = JSObject.isSealed(obj)
```

5. JSObject.isFrozen( objectToBeChecked )
```
// It return true if passed object is freezed, otherwise false

const isFrozen = JSObject.isFrozen(obj)
```

6. JSObject.addProperty( objInWhichPropertyToBeAdded, propertyName, propertyValue, isWritable, isEnumerable, isConfigurable )
```
// It add property to passed object and also returns it
// It is different then : obj['propertyName'] = 'propertyValue', because this way all descriptor flags are set to true

const isFrozen = JSObject.isFrozen(obj)
```

7. JSObject.keys( objWhoseKeysToBeFound )
```
// It returns array of keys name

const objKeysArray = JSObject.keys(obj)
```

8. JSObject.keysDeep( objWhoseKeysToBeFound, isSymbolicKeysAlsoRequired )
```
// It returns array of keys name
// if isSymbolicKeysAlsoRequired = true : returns symbolic keys also
// if isSymbolicKeysAlsoRequired = false : returns non-symbolic keys (all keys irrespective of enumerable flag value)

const objKeysArrayIncludingSymbolicKeys = JSObject.keysDeep(obj, true)
const objKeysArrayExcludingSymbolicKeys = JSObject.keysDeep(obj)
```

9. JSObject.values( objWhoseValuesToBeFound )
```
// It returns array of values

const objValuesArray = JSObject.values(obj)
```

10. JSObject.valuesDeep( objWhoseValuesToBeFound, isSymbolicValuesAlsoRequired )
```
// It returns array of values
// if isSymbolicValuesAlsoRequired = true : returns symbolic values also
// if isSymbolicValuesAlsoRequired = false : returns non-symbolic values

const objValuesArrayIncludingSymbolicValues = JSObject.valuesDeep(obj, true)
const objValuesArrayExcludingSymbolicValues = JSObject.valuesDeep(obj)
```

11. JSObject.entries( objWhoseEntriesToBeFound )
```
// It returns array of [key, value]

const objEntriesArray = JSObject.entries(obj)
```

12. JSObject.entriesDeep( objWhoseEntriesToBeFound, isSymbolicEntriesAlsoRequired )
```
// It returns array of values
// if isSymbolicEntriesAlsoRequired = true : returns symbolic entries also
// if isSymbolicEntriesAlsoRequired = false : returns non-symbolic entries

const objEntriesArrayIncludingSymbolicEntries = JSObject.entriesDeep(obj, true)
const objEntriesArrayExcludingSymbolicEntries = JSObject.entriesDeep(obj)
```
