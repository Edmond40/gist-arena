import React from 'react';

const AdZones = () => {
  return (
    <>
      {/* Ad Zone 1 - After Article */}
      <div className="md:w-[75%] mx-auto mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-yellow-300">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Sponsored Content</h3>
          <p className="text-gray-600 mb-4">Discover the latest trends in Ghana's business landscape</p>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500">Advertisement Space</span>
            </div>
          </div>
          <button className="mt-3 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="md:w-[75%] mx-auto mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-4">Get the latest news delivered to your inbox every morning</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">No spam, unsubscribe at any time</p>
        </div>
      </div>
      
      {/* Ad Zone 2 - Before Related Articles */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Advertisement</h4>
          <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">Premium Ad Space</span>
          </div>
        </div>
      </div>
      
      {/* Ad Zone 3 - Sidebar */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Featured</h4>
          <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center mb-3">
            <span className="text-gray-500 text-sm">Sidebar Ad</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Special offer for our readers</p>
          <button className="w-full px-3 py-1 bg-yellow-400 text-gray-800 rounded text-sm hover:bg-yellow-500 transition-colors">
            View Offer
          </button>
        </div>
      </div>
    </>
  );
};

export default AdZones;
