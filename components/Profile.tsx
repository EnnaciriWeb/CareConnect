import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Profile: React.FC<ProfileProps> = ({ addNotification }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Wellness Way, Healthy City, HC 10001"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    addNotification("Profile updated successfully!", 'success');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
               <img src="https://picsum.photos/200/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${
                isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-primary text-white hover:bg-sky-600'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-gray-800">
                    <i className="fas fa-envelope w-6 text-primary"></i>
                    {profile.email}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-gray-800">
                    <i className="fas fa-phone w-6 text-primary"></i>
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-gray-800">
                    <i className="fas fa-map-marker-alt w-6 text-primary"></i>
                    {profile.address}
                  </div>
                )}
              </div>

               <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Member Since</label>
                <div className="mt-1 flex items-center text-gray-800">
                   <i className="fas fa-calendar-alt w-6 text-primary"></i>
                   January 15, 2023
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Health Stats Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-gray-600">Upcoming Appointments</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-500">12</div>
                <div className="text-sm text-gray-600">Past Visits</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-500">100%</div>
                <div className="text-sm text-gray-600">Profile Complete</div>
              </div>
               <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-500">5</div>
                <div className="text-sm text-gray-600">Reviews Given</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};