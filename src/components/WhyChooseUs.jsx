import React from 'react';

function WhyChooseUs() {
  return (
    <section className="bg-cream py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark-text mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-fresh-green mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4a4 4 0 008 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">We use only the freshest natural ingredients sourced locally.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-fresh-green mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">Naturally Refreshing</h3>
            <p className="text-gray-600">Our drinks are packed with natural flavors and nutrients.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-fresh-green mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">Quality Preparation</h3>
            <p className="text-gray-600">Prepared with care in our state-of-the-art facility.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-fresh-green mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">Convenient Delivery</h3>
            <p className="text-gray-600">Fast and reliable delivery straight to your door.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
