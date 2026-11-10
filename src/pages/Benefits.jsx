import React from 'react';

const benefits = [
  { title: 'Natural Ingredients', text: 'Made with carefully selected fruits and vegetables for fresh, vibrant taste.' },
  { title: 'Hydration & Refreshment', text: 'A delicious way to stay refreshed throughout your day.' },
  { title: 'Everyday Wellness', text: 'Thoughtfully prepared blends to complement a balanced lifestyle.' },
  { title: 'Convenient Goodness', text: 'Ready-to-enjoy drinks that fit busy schedules without compromising quality.' },
  { title: 'Variety of Flavors', text: 'From citrusy juices to smooth blends, there is something for every mood.' },
  { title: 'Made with Care', text: 'Prepared with attention to quality and consistency in every bottle.' },
];

function Benefits() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-deep-green mb-4">Benefits</h1>
          <p className="text-lg text-gray-700">Enjoy refreshing drinks crafted to bring more goodness into your routine.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white p-6 rounded-3xl shadow-lg">
              <div className="w-12 h-12 rounded-full bg-light-orange flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-10 text-center">Our drinks are part of a balanced lifestyle and are not intended to diagnose, treat, cure, or prevent any disease.</p>
      </div>
    </section>
  );
}

export default Benefits;
