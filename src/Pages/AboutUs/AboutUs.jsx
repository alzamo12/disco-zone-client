const AboutUs =()=> {
  return (
    <section className="bg-primary rounded-xl text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
          About Disco Zone
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl leading-relaxed text-neutral-200 max-w-3xl">
          <span className="text-accent font-semibold">Disco Zone</span> is a 
          modern, community-driven <span className="font-semibold">forum platform</span> 
          where conversations flow freely, knowledge is shared, and ideas thrive. 
          Whether you’re here to learn, discuss, or connect, Disco Zone is the 
          perfect place to engage with like-minded individuals.
        </p>

        {/* Extra Highlight */}
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl">
          Built with simplicity, speed, and interaction in mind — Disco Zone 
          ensures a smooth experience across all devices so you can stay connected 
          anytime, anywhere.
        </p>
      </div>
    </section>
  );
};

export default AboutUs
