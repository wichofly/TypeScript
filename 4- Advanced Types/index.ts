// Type Aliases
// Type aliases allow you to create a new name for a type. This is useful for creating more readable and maintainable code.

type Employee = {
  id: number;
  name: string;
  retire: (date: Date) => void;
};

const employee: Employee = {
  id: 1,
  name: 'John Doe',
  retire: (date: Date) => {
    console.log(date);
  },
};

// Union Types
// Union types allow you to define a variable that can hold multiple types. This is useful when a value can be of more than one type.

type Status = 'pending' | 2 | 'completed';

let currentStatus: Status = 'pending';

// Intersection Types
// Intersection types allow you to combine multiple types into one. This is useful when you want to create a type that has all the properties of multiple types.

type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

const widget: UIWidget = {
  drag: () => {
    console.log('Dragging...');
  },
  resize: () => {
    console.log('Resizing...');
  },
};

// Literal Types
// Literal types allow you to specify exact values that a variable can hold.

type Quantity = 50 | 100;
const quantity: Quantity = 50;

type Metric = 'cm' | 'inch';
const metric: Metric = 'cm';

// Nullish coalescing operator
// The nullish coalescing operator (??) allows you to provide a default value for a variable if it is null or undefined.

const speed: number | null = null;
const ride = {
  speed: speed ?? 30, // Default to 30 if speed is null
};

// Type Assertions
// Type assertions allow you to override TypeScript's inferred type and specify a more specific type for a value.

const element = document.getElementById('myButton') as HTMLInputElement;
element.value = 'Click me!';