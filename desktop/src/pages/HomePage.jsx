import React from "react";

export default function HomePage() {
  return (
    <div className="bg-background text-text min-h-screen flex flex-col items-center">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Seamless Customer Support</h1>
        <p className="text-lg mt-2">
          Chat, Voice, and Translation for your business
        </p>
        <a
          href="#get-started"
          className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </a>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 w-full max-w-4xl">
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Live Chat</h2>
          <p className="mt-2">Instant chat support for your customers.</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Voice Calls</h2>
          <p className="mt-2">
            High-quality voice support for better engagement.
          </p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Auto-Translation</h2>
          <p className="mt-2">
            Break language barriers with real-time translation.
          </p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Easy Integration</h2>
          <p className="mt-2">
            Add support to any platform with simple integration.
          </p>
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-semibold">What Our Clients Say</h2>
        <p className="mt-4 text-lg italic">
          "Amazing chat service! Our customers love it."
        </p>
      </section>

      <section id="get-started" className="text-center py-12">
        <h2 className="text-3xl font-semibold">
          Enhance Your Customer Support Today
        </h2>
        <a
          href="#"
          className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
}
