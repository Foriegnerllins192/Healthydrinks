import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-deep-green mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700">We would love to hear from you. Reach out with questions or feedback.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-dark-text mb-2">Get in touch</h2>
            <p className="text-gray-700"><span className="font-medium">Email:</span> info@healthydrinks.com</p>
            <p className="text-gray-700"><span className="font-medium">Phone:</span> +233 55 123 4567</p>
            <p className="text-gray-700"><span className="font-medium">Address:</span> 123 Fresh Street, Accra</p>
            <p className="text-gray-700"><span className="font-medium">Hours:</span> Mon–Sat, 8:00 AM – 6:00 PM</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            {sent ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-semibold text-deep-green mb-2">Message received</h3>
                <p className="text-gray-700">Thank you for contacting us. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-dark-text font-medium mb-2" htmlFor="name">Name</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full p-4 rounded-full border-2 border-fresh-green focus:outline-none focus:border-deep-green" />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="w-full p-4 rounded-full border-2 border-fresh-green focus:outline-none focus:border-deep-green" />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2" htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={onChange} required rows="4" className="w-full p-4 rounded-3xl border-2 border-fresh-green focus:outline-none focus:border-deep-green"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
