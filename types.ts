export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export enum View {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  REVIEWS = 'REVIEWS',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}