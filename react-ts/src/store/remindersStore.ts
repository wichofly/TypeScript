import { create } from 'zustand';
import reminderService from '../services/axios';
import type { Reminder } from '../types';

interface ReminderStore {
  reminders: Reminder[];
  loadReminders: () => Promise<void>;
  addReminder: (title: string) => Promise<void>;
  removeReminder: (id: number) => Promise<void>;
}

const useRemindersStore = create<ReminderStore>((set) => ({
  reminders: [],

  loadReminders: async () => {
    try {
      const loadedReminders = await reminderService.getReminders();
      set({ reminders: loadedReminders });
    } catch (error) {
      console.error('Unable to load reminders:', error);
    }
  },

  addReminder: async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    set((state) => ({
      reminders: [newReminder, ...state.reminders],
    }));
  },

  removeReminder: async (id: number) => {
    try {
      await reminderService.removeReminder(id);
      set((state) => ({
        reminders: state.reminders.filter((reminder) => reminder.id !== id),
      }));
    } catch (error) {
      console.error('Unable to remove reminder:', error);
    }
  },
}));

export default useRemindersStore;
