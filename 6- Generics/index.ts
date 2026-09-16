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

/**
 * Generic interfaces
 * This provides reusable code and type safety without duplicating interfaces for every endpoint.
 *
 * Lets imagine we have a website that has different endpoints.
 * - http//:website.com/users
 * - http//:website.com/products
 */

// Not reusable
// interface Result {
//   data: User | Product
// }

interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: 'Not found' };
}

interface User {
  username: string;
}

interface Product {
  title: string;
}

const result = fetch<User>('url');
result.data?.username;

/**
 * Generic Constraints
 * A generic constraint limits the types that can be used with a generic.
 * It uses extends to say: “T must have this type or structure.
 *
 * Use generic constraints when:
 * - You need to restrict the accepted types.
 * - Your function needs to access specific properties or methods.
 * - You want flexibility while maintaining type safety.
 * - You want to prevent invalid values from being passed.
 *
 * Without a constraint, TypeScript does not know what properties T has. 
 * With a constraint, you can safely use those properties.
 */

// This function accepts only numbers or strings:
function echo<T extends number | string>(value: T): T {
  return value;
}

interface IPlayer {
  name: string;
}

class Player {
  constructor(public name: string) {}
}

class Customer extends Player {}

// Constraint by object
function echo2<T extends { name: string }>(value: T): T {
  return value;
}

// Constraint by Interface
function echo3<T extends IPlayer>(value: T): T {
  return value;
}

function echo4<T extends Customer>(value: T): T {
  return value;
}

console.log(echo(22));
echo2({ name: 'Messi' });
echo3({ name: 'Cristiano' });
echo4(new Player('Ronaldo'));
echo4(new Customer('Wicho'));
