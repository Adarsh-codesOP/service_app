import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    name: string;
    category: string;
    price: number;
    image: string;
  };
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log({ selectedDate, selectedTime, address });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <img
                src={service.image}
                alt={service.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                <p className="text-gray-600">{service.category}</p>
                <p className="text-lg font-bold text-indigo-600">₹{service.price}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border ${
                        selectedTime === time
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-gray-300 hover:border-indigo-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    className="pl-10 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-gray-600">
                  <p>Service Charge: ₹{service.price}</p>
                  <p className="text-sm">Additional charges may apply based on service requirements</p>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}