import type { Reminder } from '../types';

interface ReminderListProps {
  items: Reminder[];
  onRemoveReminder: (id: number) => Promise<void>;
}

const ReminderList = ({ items, onRemoveReminder }: ReminderListProps) => {
  if (items.length === 0) {
    return (
      <p className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm">
        No reminders found.
      </p>
    );
  }

  return (
    <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-amber-50"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700">
            {item.id}
          </span>
          <span className="text-slate-700">{item.title}</span>
          <button
            type="button"
            onClick={() => void onRemoveReminder(item.id)}
            className="ml-auto cursor-pointer rounded-lg bg-red-400 px-3 py-1 text-white hover:bg-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;
