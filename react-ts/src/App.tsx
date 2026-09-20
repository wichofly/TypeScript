import { useEffect } from 'react';
import NewReminder from './components/NewReminder';
import ReminderList from './components/ReminderList';
import useRemindersStore from './store/remindersStore';

function App() {
  const reminders = useRemindersStore((state) => state.reminders);
  const loadReminders = useRemindersStore((state) => state.loadReminders);
  const addReminder = useRemindersStore((state) => state.addReminder);
  const removeReminder = useRemindersStore((state) => state.removeReminder);

  useEffect(() => {
    void loadReminders();
  }, [loadReminders]);

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
