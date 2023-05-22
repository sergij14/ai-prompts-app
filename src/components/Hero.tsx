import Image from "next/image";

const Hero = () => {
  return (
    <div className="container">
      <div className="my-8 rounded-md overflow-hidden min-h-[300px] relative">
        <Image
          src="/ai.jpg"
          width="0"
          alt=""
          height="0"
          sizes="100vw"
          className="absolute object-cover -z-10 left-0 top-0 w-full h-full"
        />
        <h3 className="select-none pt-10 drop-shadow-lg text-white max-w-md mx-auto uppercase text-center text-2xl sm:text-3xl md:text-4xl font-black">
          Discover & share <br /> AI-powered prompts
        </h3>
      </div>
    </div>
  );
};

export default Hero;
