import ReminderList from './components/ReminderList';
import type { Reminder } from './types';

const reminders: Reminder[] = [
  {
    id: 1,
    title: 'bag',
  },
];

function App() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl text-amber-600 font-semibold text-center">
          Beginning of React TS
        </h1>

        <div className="flex justify-center mt-4">
          <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-md p-2 font-semibold cursor-pointer transition-colors">
            Check here
          </button>
        </div>

        <ReminderList items={reminders} />
      </div>
    </>
  );
}

export default App;
