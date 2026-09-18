import axios from 'axios';
import type { Reminder } from '../types';

class ReminderService {
  private readonly http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  async getReminders() {
    const response = await this.http.get<Reminder[]>('/todos');
    return response.data;
  }

  async addReminder(title: string) {
    const response = await this.http.post<Reminder>('/todos', { title });
    return response.data;
  }

  async removeReminder(id: number) {
    await this.http.delete(`/todos/${id}`);
  }
}

export default new ReminderService();
