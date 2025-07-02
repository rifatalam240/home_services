import React from 'react';

const FAQ = () => {
  return (
    <div className="join join-vertical bg-base-100 max-w-2xl mx-auto my-10 flex">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#e3006e]">Frequently Asked Questions</h2>

      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="faq-accordion" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I book a service?
        </div>
        <div className="collapse-content text-sm">
          You can easily book a service by clicking the "Book Now" button on the homepage and filling in the required details.
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          How long does it take to get the service?
        </div>
        <div className="collapse-content text-sm">
          After confirmation, our professional usually arrives within 1 hour based on availability and location.
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          How can I make the payment?
        </div>
        <div className="collapse-content text-sm">
          You can pay via cash, bKash, or use our secure online payment gateway.
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          Can I reschedule or cancel a booking?
        </div>
        <div className="collapse-content text-sm">
          Yes, you can reschedule or cancel your booking from your account dashboard or by contacting our support.
        </div>
      </div>

      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          Are your service professionals verified?
        </div>
        <div className="collapse-content text-sm">
          Yes, all of our service providers are background-checked, trained, and verified for safety and reliability.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
