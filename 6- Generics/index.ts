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
console.log(echo3({ name: 'Cristiano' }));
echo4(new Player('Ronaldo'));
echo4(new Customer('Wicho'));

/**
 * Extending Generic Classes
 * “Extending generic classes” means creating a child class from a generic parent class while keeping, restricting, or fixing its type parameter.
 *
 * CompressibleStore<T> passes its type to Store<T>.
 * The child class remains flexible and can work with different types.
 *
 * SearchableStore<T extends { name: string }>
 * The constraint guarantees that every T has a name property. This allows the class to safely use:
 * "obj.name"
 *
 * ProductStore can only store Product1 objects.
 * It is no longer generic because its type is fixed.
 *
 * Use this pattern when a parent class contains reusable logic, but child classes need additional features while keeping strong type safety.
 */

interface Product1 {
  name: string;
  price: number;
}

class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
}

// const store = new Store<Product1>()
// store.objects = []

// Pass on the generic type parameter
class CompressibleStore<T> extends Store<T> {
  compress() {}
}

const store = new CompressibleStore<Product1>();
store.add({ name: 'Laptop', price: 499 });
store.compress();

// Restrict the generic type parameter
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}

// Fix the generic type parameter
class ProductStore extends Store<Product1> {
  filterByCategory(category: string): Product1[] {
    return [];
  }
}

/**
 * The Keyof operator
 * keyof creates a union of all property names of a type.
 *
 * T becomes Product1, so property can only be:
 * 'name' or 'price'
 *
 * Use keyof when a function should accept only valid property names of an object.
 * It is useful for searching, sorting, filtering, or reading object properties while avoiding spelling mistakes and invalid keys.
 */

class Store2<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  // T is Product1
  // Keyof T = 'name' | 'price'
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}

const store2 = new Store2<Product1>();
store2.add({ name: 'Figo', price: 25000 });
store2.find('name', 'James');
store2.find('price', 2);
store2.find('Hello', false); // Argument of type '"Hello"' is not assignable to parameter of type 'keyof Product1'.

/**
 * Type Mapping
 * Type mapping, or mapped types, creates a new type by transforming the properties of an existing type.
 * Instead of rewriting every property manually, TypeScript loops through the keys of a type and applies a change.
 *
 * Use mapped types when we need a modified version of an existing type, such as:
 * - Making all properties readonly.
 * - Making all properties optional.
 * - Changing property types.
 * - Creating reusable utility types.
 */

type ReadOnlyProduct = {
  readonly [Property in keyof Product1]: Product1[Property];
};

const example: ReadOnlyProduct = {
  name: 'Freddy',
  price: 31,
};
console.log(example);

// Much better to use the generic 'T'. This version works with any type: class or interface created we want
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

const product: ReadOnly<Customer> = {
  name: 'Ozil',
};
console.log(product);

const example2: ReadOnly<Product> = {
  title: 'Playing Generic',
};
console.log(example2);

// https://www.typescriptlang.org/docs/handbook/2/generics.html 'Generic'
// https://www.typescriptlang.org/docs/handbook/utility-types.html 'Utility Types'

//------------------------------------ EXERCISES -----------------------------------

// 1- Convert the function below to a generic function:

// function exercise(arg) {
//   return arg;
// }

function exercise<T>(arg: T) {
  return arg;
}

// 2-  When compiling the following piece of code, we get an error saying ‘Property name does not exist on type T’.
//     How can we solve this problem?

// function printName<T>(obj: T) {
//   console.log(obj.name);
// }

// Answer:
// We need to apply a constraint on the generic Type parameter so the TypeScript compiler knows that objects of type 'T' have a name property.
function printName<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}

// 3- An Entity should have a unique identifier. The type of identifier, however, is dependent on the use case.
// In some cases, the ID might be a number, in other cases, it might be a string, GUID, etc. Represent the entity using a generic class.

class Entity<T> {
  constructor(public id: T) {}
}

const entitySting = new Entity('1');
const entityNumber = new Entity(2);
console.log(entitySting);
console.log(entityNumber);

// 4- Given the following interface what does Keyof User return?
// Answer:
// It returns a union of properties of User: `userId` | `username`

interface User {
  userId: number;
  userName: string;
}
