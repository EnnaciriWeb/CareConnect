import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { BookingForm } from './components/BookingForm';
import { Reviews } from './components/Reviews';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Notification } from './components/Notification';
import { ChatBot } from './components/ChatBot';
import { View, NotificationType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView(View.HOME); // Or redirect to LOGIN
    addNotification("You have been signed out.", "info");
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <Hero onChangeView={setCurrentView} />;
      case View.BOOKING:
        return isLoggedIn ? (
          <BookingForm addNotification={addNotification} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={setCurrentView} addNotification={addNotification} />
        );
      case View.REVIEWS:
        return <Reviews addNotification={addNotification} />;
      case View.PROFILE:
        return isLoggedIn ? (
          <Profile addNotification={addNotification} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={setCurrentView} addNotification={addNotification} />
        );
      case View.LOGIN:
        return <Login onLogin={handleLogin} onNavigate={setCurrentView} addNotification={addNotification} />;
      case View.SIGNUP:
        return <SignUp onNavigate={setCurrentView} addNotification={addNotification} />;
      default:
        return <Hero onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
              <div className="bg-primary text-white p-2 rounded-lg mr-2">
                <i className="fas fa-heartbeat text-xl"></i>
              </div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">CareConnect</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentView(View.HOME)}
                className={`text-sm font-medium transition ${currentView === View.HOME ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentView(View.BOOKING)}
                className={`text-sm font-medium transition ${currentView === View.BOOKING ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Appointments
              </button>
              <button 
                onClick={() => setCurrentView(View.REVIEWS)}
                className={`text-sm font-medium transition ${currentView === View.REVIEWS ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Reviews
              </button>
              
              {isLoggedIn && (
                <button 
                  onClick={() => setCurrentView(View.PROFILE)}
                  className={`text-sm font-medium transition ${currentView === View.PROFILE ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Profile
                </button>
              )}

              {isLoggedIn ? (
                 <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition shadow-sm text-sm font-semibold"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setCurrentView(View.LOGIN)}
                    className="text-gray-700 hover:text-primary font-medium text-sm px-3 py-2"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setCurrentView(View.SIGNUP)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition shadow-sm text-sm font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button (simplified) */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-500 hover:text-gray-900 focus:outline-none">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
        {notifications.map(n => (
          <Notification key={n.id} notification={n} onClose={removeNotification} />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-grow fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2023 CareConnect Health Services. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-primary transition"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-primary transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-primary transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

export default App;