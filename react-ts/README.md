# Reminder List — React & TypeScript

I built this small reminder app to learn more about TypeScript and practice using it in a React project. It brings together typed components, form handling, shared state, and HTTP requests in a simple application.

## What the app does

- Loads reminders from an API when the app opens.
- Displays each reminder's ID and title, or an empty message when there are no reminders.
- Adds reminders through a form and displays the new reminder at the top of the list.
- Deletes reminders after the API request succeeds.
- Rejects empty or whitespace-only titles, disables the submit button while adding a reminder, and shows a message if adding fails.

## What I practiced

- **Interfaces:** `Reminder` defines the data model with a numeric `id` and a string `title`. Component props and the store also have interfaces to describe the values and functions they accept.
- **Typed props and callbacks:** Components receive callbacks such as `(title: string) => Promise<void>`, making their expected inputs and asynchronous behavior explicit.
- **React hooks and events:** `useState` manages the form's title, error message, and submission state. The submit handler uses `SubmitEvent<HTMLFormElement>`, and `useEffect` loads reminders when the app mounts.
- **Generics:** Axios calls use types such as `get<Reminder[]>`, and Zustand uses `create<ReminderStore>` to describe the store's state and actions.
- **Async functions:** API methods declare return types such as `Promise<Reminder[]>`, `Promise<Reminder>`, and `Promise<void>`. The form uses `try`, `catch`, and `finally` to handle requests and reset its submission state.
- **Classes and access modifiers:** `ReminderService` groups the API operations and keeps its Axios client in a `private readonly` property.
- **Immutable state updates:** Adding a reminder creates a new array with the spread operator; deleting one creates a filtered array.

The API response types help TypeScript check how data is used in the code. They do not validate the actual response at runtime.

## How the code is organized

| File                              | Responsibility                                                              |
| --------------------------------- | --------------------------------------------------------------------------- |
| `src/types/index.ts`              | Defines the shared `Reminder` interface.                                    |
| `src/services/axios.ts`           | Creates the Axios client and implements API requests.                       |
| `src/store/remindersStore.ts`     | Stores reminders and implements load, add, and remove actions with Zustand. |
| `src/components/NewReminder.tsx`  | Handles the controlled form, input validation, and submission feedback.     |
| `src/components/ReminderList.tsx` | Renders the reminders and delete buttons.                                   |
| `src/App.tsx`                     | Connects the components to the store and triggers the initial load.         |
| `src/index.css`                   | Imports Tailwind CSS for styling.                                           |

User actions flow from the components to the Zustand store, then to the API service. Successful requests update the store, and React renders the updated list. Loading and deletion errors are logged to the console; adding errors appear in the form.

## Run locally

From the `react-ts` directory, install the dependencies:

```bash
npm install
```

Create or update `.env.local` with your API's base URL:

```env
VITE_API_URL=http://localhost:3000
```

The URL above is an example. The app needs a separately running API that supports these endpoints:

| Method   | Endpoint     | Expected behavior                                                                  |
| -------- | ------------ | ---------------------------------------------------------------------------------- |
| `GET`    | `/todos`     | Returns an array of reminders with `id` and `title`.                               |
| `POST`   | `/todos`     | Accepts `{ "title": "My reminder" }` and returns the created reminder with its ID. |
| `DELETE` | `/todos/:id` | Deletes the reminder with the given ID.                                            |

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite. Restart the development server after changing `.env.local`.

## Available scripts

- `npm run dev` — starts the Vite development server.
- `npm run build` — checks TypeScript and creates a production build in `dist`.
- `npm run lint` — runs ESLint.
- `npm run preview` — serves the production build locally after building it.

Built with React, TypeScript, Vite, Zustand, Axios, and Tailwind CSS.
