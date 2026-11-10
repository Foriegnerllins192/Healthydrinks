import React from 'react';

function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark-text mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center mb-4">
              <span className="text-orange text-xl">★★★★★</span>
            </div>
            <p className="text-gray-600 mb-4">
              "The Green Detox Juice is amazing! I feel so refreshed and energized after drinking it. Highly recommend!"
            </p>
            <p className="font-medium">- Ama Asante</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center mb-4">
              <span className="text-orange text-xl">★★★★★</span>
            </div>
            <p className="text-gray-600 mb-4">
              "Fast delivery and delicious drinks. The Pineapple Ginger Juice is my favorite. Will order again!"
            </p>
            <p className="font-medium">- Kofi Mensah</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center mb-4">
              <span className="text-orange text-xl">★★★★☆</span>
            </div>
            <p className="text-gray-600 mb-4">
              "Great quality products. The subscription option would be a wonderful addition for regular customers."
            </p>
            <p className="font-medium">- Nana Yaa</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
