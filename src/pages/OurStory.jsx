import React from 'react';

function OurStory() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-deep-green mb-4">Our Story</h1>
          <p className="text-lg text-gray-700">We started with a simple belief: everyone deserves drinks that taste amazing and make you feel great.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
            alt="Fresh fruits and ingredients"
            className="rounded-3xl shadow-lg w-full h-80 object-cover"
          />
          <div className="space-y-4 text-gray-700">
            <p>Healthy Drinks was born from a passion for fresh, natural ingredients and a desire to bring convenient wellness to everyday life. We carefully select fruits, vegetables, and herbs to craft juices and blends that are refreshing and full of flavor.</p>
            <p>From our first small-batch press to serving customers across Ghana, our focus has stayed the same: quality preparation, honest ingredients, and a premium experience you can trust.</p>
            <p>Every bottle is made to help you feel good, drink fresh, and live better.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
