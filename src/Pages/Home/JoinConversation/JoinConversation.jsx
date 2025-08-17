import { FaArrowRight } from "react-icons/fa";

const JoinConversation = () => {
  return (
    <section className="bg-neutral-800 text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Text */}
        <div className="text-center md:text-left space-y-4 md:space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
            Ready to share your voice?
          </h2>
          <p className="text-neutral-300 text-base md:text-lg max-w-md">
            Join Disco Zone today and become part of a vibrant community. Start discussions, share knowledge, and connect with like-minded people.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition">
            Join Now <FaArrowRight />
          </button>
        </div>

        {/* Illustration */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co/7QpKsCX/forum-illustration.png"
            alt="Join the conversation illustration"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

      </div>
    </section>
  );
};

export default JoinConversation;
