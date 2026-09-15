// Object Oriented Programming (OOP) in TypeScript
// OOP is a programming paradigm that uses objects and classes to structure code. TypeScript provides support for OOP concepts such as classes, inheritance, and interfaces.

// Classes
// Classes are blueprints for creating objects. They encapsulate data and behavior related to that data.

class Account {
  nickname?: string;

  constructor(
    public readonly id: number, // readonly property cannot be modified after initialization
    public owner: string,
    private _balance: number,
  ) {}

  // function is a method inside the class
  deposit(amount: number) {
    if (amount <= 0) throw new Error('Deposit amount must be positive');
    this._balance += amount;
  }

  private calculateTax = () => {
    // private method can only be accessed within the class
  };

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error('Balance cannot be negative');

    this._balance = value;
  }
}

// Creating an Object

const account = new Account(1, 'Juan', 0);
account.deposit(100);
// console.log(account._balance); // output: 100 // Property '_balance' is private and only accessible within class 'Account'
console.log(account instanceof Account); // output: true

// account.id = 0; Error: Cannot assign to 'id' because it is a read-only property

console.log(account.balance); // output: 100
account.balance = 150;
console.log(account.balance); // output: 150

/**
 * Getters and Setters
 * In short, get reads a property and set changes it safely. They help protect data and maintain encapsulation.
 */

/**
 * Index signatures
 * Index signatures allow us to define properties with dynamic keys. They are useful when we want to create objects with properties that are not known at compile time.

  class SeatAssignment {
    [seatNumber: string]: string; 
  }

  const seats = new SeatAssignment();
  seats.A1 = 'Santiago';
  seats.A2 = 'Juan';
 */

/**
 * Static Properties and Methods
 * The static keyword makes a property or method belong to the class itself, not to individual objects.
 *
 * _activeRides is shared by all Ride objects. Every time a ride starts, the shared counter increases:
 *
 * In short, use static when a value or method should be shared by the entire class rather than stored separately in each object.
 */

class Ride {
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides() {
    return Ride._activeRides;
  }
}

// Ride.activeRides = 10; // Error: Cannot assign to 'activeRides' because it is a read-only property.

const ride1 = new Ride();
ride1.start();

const ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides);

/**
 * Inheritance
 * Inheritance allows us to create a new class based on an existing class.
 * The new class inherits properties and methods from the existing class, allowing us to reuse code and create a hierarchy of classes.
 *
 * In short, extends creates an inheritance relationship, allowing Student to reuse and add functionality to Person.
 */

class Person {
  constructor(
    public firstName: string,
    public lastName: string,
  ) {}

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  walk() {
    console.log('Walking.');
  }
}

class Student extends Person {
  constructor(
    public studentId: number,
    firstName: string,
    lastName: string,
  ) {
    super(firstName, lastName);
  }

  takeTest() {
    console.log('Taking a test.');
  }
}

const student = new Student(1, 'Juan', 'Sosa');
student.fullName; // output: 'Juan Sosa'
console.log(student);
console.log(student.fullName);
console.log(student.takeTest());

/**
 * Method Overriding
 * Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its superclass.
 * The overridden method in the subclass should have the same name, return type, and parameters as the method in the superclass.
 */

class Teacher extends Person {
  override get fullName() {
    return `Professor ${super.fullName}`;
  }
}

const teacher = new Teacher('Pablo', 'Sosa');
console.log(teacher.fullName);

/**
 * Polymorphism
 * Polymorphism means that different classes can be treated as the same parent type while providing different implementations of the same method or property.
 * The function does not need to know whether the object is a Student, Teacher, or Principal.
 * TypeScript automatically uses the correct implementation.
 *
 * Use polymorphism when:
 * Several classes share a common parent or interface.
 * They need the same method or property with different behavior.
 * We want to process different object types using one function.
 * We want to avoid repeated if or switch checks based on object type.
 */

class Principal extends Person {
  override get fullName() {
    return `Principal ${super.fullName}`;
  }
}

printNames([
  new Student(1, 'Elias', 'Solis'),
  new Teacher('Pablo', 'Alvarez'),
  new Principal('Maria', 'Gomez'),
]);

function printNames(people: Person[]) {
  for (let person of people) {
    console.log(person.fullName);
  }
}

// Abstract Classes are not recommended for use in TypeScript.
// They are a way to define a class that cannot be instantiated directly, but can be extended by other classes.
// Abstract classes can contain abstract methods, which must be implemented by subclasses.

/**
 * Interfaces
 * Interfaces define the structure of an object, specifying the properties and methods that an object must have. Not implementation is provided in the interfaces.
 *
 * Use an interface when you only need to define a common structure or contract.
 * Use an abstract class when related classes should share properties, a constructor, or implemented methods.
 *
 * Main difference:
 * A class can implement multiple interfaces.
 * A class can extend only one abstract class.
 * Interfaces have no implementation.
 * Abstract classes can contain shared implementation and state.
 */

// abstract class Calender {
//   constructor(public name: string) {}

//   abstract addEvent(): void;
//   abstract removeEvent(): void;
// }

interface Calender {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalender extends Calender {
  sync(): void;
}

class GoogleCalender implements Calender {
  constructor(public name: string) {}

  addEvent(): void {
    throw new Error('Method not implemented.');
  }
  removeEvent(): void {
    throw new Error('Method not implemented.');
  }
}
