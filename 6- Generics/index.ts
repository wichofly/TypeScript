/**
 * Generic class
 * A generic class allows us to create a reusable class that works with different data types while preserving type safety.
 *
 * TypeScript automatically understands that the key is a number and the value is a string. When is used <number, string>
 *
 * Use generics when:
 * - You want to reuse the same class with different types.
 * - You want type safety without using any.
 * - The class logic stays the same, but the data types may change.
 *
 * Usually, omitting the types is better because the code is shorter and TypeScript can infer them correctly.
 */

class KeyValuePair<TKey, TValue> {
  constructor(
    public key: TKey,
    public value: TValue,
  ) {}
}

// const pair = new KeyValuePair<number, string>(1, 'Wicho');

const pair = new KeyValuePair('2', 'Wicho');
console.log(pair.key);

/**
 * Generic function
 * A generic function works with different data types while keeping type safety.
 * 
 * Because the method is static, you call it using the class name.
 */

class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}

const utils = ArrayUtils.wrapInArray('22');
console.log(utils);
