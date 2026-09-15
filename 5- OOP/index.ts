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

  getBalance = (): number => {
    return this._balance;
  };
}

// Creating an Object

const account = new Account(1, 'Juan', 0);
account.deposit(100);
// console.log(account._balance); // output: 100 // Property '_balance' is private and only accessible within class 'Account'
console.log(account instanceof Account); // output: true

// account.id = 0; Error: Cannot assign to 'id' because it is a read-only property

console.log(account.getBalance()); // output: 100
