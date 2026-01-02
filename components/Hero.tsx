import React from 'react';
import { View } from '../types';

interface HeroProps {
  onChangeView: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ onChangeView }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Healthcare <span className="text-primary">Simplified</span> for You
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Book appointments with top specialists, manage your health profile, and consult with our AI assistant instantly. Your well-being is our priority.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <button
                onClick={() => onChangeView(View.BOOKING)}
                className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sky-600 transition shadow-lg transform hover:-translate-y-1"
              >
                Book Now
              </button>
              <button
                onClick={() => onChangeView(View.REVIEWS)}
                className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-sm"
              >
                Read Reviews
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-user-md text-2xl text-primary mr-2"></i>
                <span className="font-medium">50+ Specialists</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-star text-2xl text-yellow-400 mr-2"></i>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
            <img 
              src="https://picsum.photos/600/400" 
              alt="Medical Team" 
              className="rounded-2xl shadow-2xl transform lg:rotate-2 hover:rotate-0 transition duration-500 object-cover w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};