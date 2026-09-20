import NewReminder from './components/NewReminder';
import ReminderList from './components/ReminderList';
import useReminders from './hooks/useReminders';

function App() {
  const { reminders, addReminder, removeReminder } = useReminders();

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
