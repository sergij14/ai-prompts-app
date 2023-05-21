const Hero = () => {
  return (
    <div className="my-8 rounded-md overflow-hidden min-h-[300px] relative flex">
      <img
        src="/ai.jpg"
        className="absolute object-cover -z-10 left-0 top-0 w-full h-full"
      />
      <h3 className="pt-10 drop-shadow-lg text-white max-w-md mx-auto uppercase text-center text-2xl sm:text-3xl md:text-4xl font-black">
        Discover & share <br /> AI-powered prompts
      </h3>
    </div>
  );
};

export default Hero;
