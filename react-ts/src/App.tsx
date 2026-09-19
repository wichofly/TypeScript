import { useEffect, useState } from 'react';
import ReminderList from './components/ReminderList';
import reminderService from './services/axios';
import type { Reminder } from './types';
import NewReminder from './components/NewReminder';

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const loadedReminders = await reminderService.getReminders();
        setReminders(loadedReminders);
      } catch (error) {
        console.error('Unable to load reminders:', error);
      }
    };

    void loadReminders(); // indicates that we intentionally do not await the promise returned inside the effect.
  }, []);

  const addReminder = async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
  };

  const removeReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-semibold text-amber-600">
          Reminder List
        </h1>

        <NewReminder onAddReminder={addReminder} />

        <ReminderList items={reminders} onRemoveReminder={removeReminder} />
      </div>
    </main>
  );
}

export default App;
