import type { Reminder } from '../types';

interface ReminderListProps {
  items: Reminder[];
}

const ReminderList = ({ items }: ReminderListProps) => {
  return (
    <div className="text-center mt-4">
      <ul className="">
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
