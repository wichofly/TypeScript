import axios from 'axios';
import type { Reminder } from '../types';

class ReminderService {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  async getReminder() {
    const response = await this.http.get<Reminder[]>('/todos');
    return response.data;
  }

  async addReminder(title: string) {
    const response = await this.http.post<Reminder[]>('/todos');
    return response.data;
  }

  async removeReminder(id: number) {
    const response = await this.http.delete('/todos');
    return response.data;
  }
}

export default new ReminderService();
