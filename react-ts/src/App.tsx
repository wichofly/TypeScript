import { useState } from 'react';
import ReminderList from './components/ReminderList';
import type { Reminder } from './types';

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: 'bag' },
  ]);
  // const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl text-amber-600 font-semibold text-center">
          Beginning of React TS
        </h1>

        <ReminderList items={reminders} />
      </div>
    </>
  );
}

export default App;
