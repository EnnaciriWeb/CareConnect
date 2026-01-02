import React, { useState } from 'react';
import { Appointment } from '../types';

interface BookingFormProps {
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ addNotification }) => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const doctors = [
    "Dr. Sarah Johnson (Cardiology)",
    "Dr. Michael Chen (Dermatology)",
    "Dr. Emily Davis (Pediatrics)",
    "Dr. Robert Wilson (General Practice)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      addNotification(`Appointment booked with ${formData.doctor} on ${formData.date} at ${formData.time}`, 'success');
      setFormData({ doctor: '', date: '', time: '', reason: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-100 my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <i className="fas fa-calendar-check text-primary mr-3"></i>
        Book an Appointment
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
          <div className="relative">
            <select
              name="doctor"
              required
              value={formData.doctor}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="">Choose a specialist...</option>
              {doctors.map((doc, idx) => (
                <option key={idx} value={doc}>{doc}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3.5 text-gray-400 pointer-events-none">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="absolute right-3 top-3.5 text-gray-400 pointer-events-none">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
          <textarea
            name="reason"
            rows={3}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly describe your symptoms or reason for visit..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition duration-300 shadow-lg flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><i className="fas fa-spinner fa-spin mr-2"></i> Booking...</>
          ) : (
            'Confirm Appointment'
          )}
        </button>
      </form>
    </div>
  );
};