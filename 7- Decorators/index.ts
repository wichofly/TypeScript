/**
 * A decorator is a special function that adds behavior to a class or class member.
 * It is written with @ and can be applied to classes, methods, properties, or accessors.
 * TypeScript decorators can observe, modify, or replace the decorated code.
 *
 * Use decorators when we need to apply repeated, cross-cutting behavior, such as:
 * - Logging
 * - Validation
 * - Authorization
 * - Caching
 * - Dependency injection
 * - Framework configuration
 *
 * We should use a decorator when the same behavior is needed in several classes or methods.
 * For a simple, one-time operation, a normal function is usually clearer.
 *
 * https://www.typescriptlang.org/docs/handbook/decorators.html
 */

/**
 * Method Decorator
 */
function Log(
  originalMethod: (...args: any[]) => any,
  context: ClassMethodDecoratorContext,
) {
  return function (this: unknown, ...args: any[]) {
    console.log(`Calling ${String(context.name)}`);
    return originalMethod.apply(this, args);
  };
}

class Person {
  @Log
  say(message: string) {
    console.log(`Person says ${message}`);
  }
}

const person = new Person();
person.say('Hello');

/**
 * Accessor Decorators
 * An Accessor Decorator is declared just before an accessor declaration. 
 * The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. 
 * An accessor decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).
 */

function Capitalize(
  originalGetter: () => string,
  context: ClassGetterDecoratorContext,
) {
  return function (this: unknown): string {
    const result = originalGetter.call(this);
    return result.toUpperCase();
  };
}

class Person2 {
  constructor(
    public firstName: string,
    public lastName: string,
  ) {}

  @Capitalize
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const person2 = new Person2('juan', 'pablo');
console.log(person2.fullName);

