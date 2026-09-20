import { useEffect, useState } from 'react';
import reminderService from '../services/axios';
import type { Reminder } from '../types';

const useReminders = () => {
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

    void loadReminders();
  }, []);

  const addReminder = async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    setReminders((currentReminders) => [newReminder, ...currentReminders]);
  };

  const removeReminder = async (id: number) => {
    try {
      await reminderService.removeReminder(id);
      setReminders((currentReminders) =>
        currentReminders.filter((reminder) => reminder.id !== id),
      );
    } catch (error) {
      console.error('Unable to remove reminder:', error);
    }
  };

  return { reminders, addReminder, removeReminder };
};

export default useReminders;
