import { useState, type SubmitEvent } from 'react';

interface NewReminderProps {
  onAddReminder: (title: string) => Promise<void>;
}

const NewReminder = ({ onAddReminder }: NewReminderProps) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim(); // removes spaces from the beginning and end of a string. It also helps detect input containing only spaces

    if (!trimmedTitle) {
      setError('Please enter a reminder.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await onAddReminder(trimmedTitle);
      setTitle('');
    } catch {
      setError('The reminder could not be added. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <label htmlFor="title" className="font-medium text-slate-700">
        New reminder
      </label>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        id="title"
        type="text"
        placeholder="Add a reminder"
        aria-describedby={error ? 'title-error' : undefined}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />

      {error && (
        <p id="title-error" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isSubmitting ? 'Adding...' : 'New Reminder'}
      </button>
    </form>
  );
};

export default NewReminder;
