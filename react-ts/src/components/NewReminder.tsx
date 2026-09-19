import React, { useState, type FormEvent } from 'react';

interface NewReminderProps {
  onAddReminder: (title: string) => void;
}

const NewReminder = ({ onAddReminder }: NewReminderProps) => {
  const [title, setTitle] = useState('');

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) return alert('You need to write a reminder');
    onAddReminder(title);
    setTitle('');
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title"></label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        type="text"
        placeholder="Add a reminder"
        className="border border-mist-400 py-1 px-2"
      />

      <button
        type="submit"
        className="rounded-lg bg-sky-400 hover:bg-sky-500 text-white text-xl my-4 px-3 py-1 cursor-pointer"
      >
        New Remind
      </button>
    </form>
  );
};

export default NewReminder;
