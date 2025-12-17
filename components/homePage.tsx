import React from "react";
import Image from "next/image";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Video */}
      <video
        src="/images/christmas_background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Luxury Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/40 via-black/50 to-black/70" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>

      {/* Header & Main Content Section */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4">
        {/* Combined Header and Content */}
        <div className="max-w-3xl text-center space-y-8 float-in">
          <h1 className="font-great-vibes text-6xl md:text-8xl text-white bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-orange-500 drop-shadow-2xl glow-pulse text-[70px]!">
            Merry Christmas 10A!
          </h1>

          <p className="text-orange-200 font-lora md:text-xl tracking-widest opacity-90 text-[30px]!">
            A celebration of our year together
          </p>

          <div className="h-1 w-112.5! mx-auto bg-linear-to-r from-transparent via-orange-400 to-transparent"></div>

          <h2 className="font-great-vibes text-4xl md:text-6xl bg-linear-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-white drop-shadow-2xl glow-pulse pt-8 text-[50px]!">
            Our memories together
          </h2>

          <div className="h-1 w-50 mx-auto bg-linear-to-r from-transparent via-orange-400 to-transparent"></div>

          <p className="font-lora text-white/95 text-base md:text-lg leading-relaxed tracking-wide">
            This year brought us incredible moments, laughter, and memories that
            will last a lifetime. Watch as we celebrate the bonds we've built in
            Class 10A!
          </p>

          <div className="flex justify-center pt-4">
            <Link
              href="/video"
              className="relative group inline-block rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-r from-orange-300 via-orange-400 to-orange-500 transform transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 shimmer" />

              <span className="relative z-10 inline-flex items-center gap-2 px-10 py-4 font-playfair text-white text-lg font-bold uppercase tracking-widest">
                ▶ Play Video
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        id="about"
        className="relative z-10 bg-gray-700/50 backdrop-blur-sm border-t border-orange-400/40 px-4 py-3 flex flex-row items-center justify-around gap-4 mt-auto"
      >
        <div className="text-left">
          <p className="text-white/80 font-playfair text-sm tracking-widest uppercase">
            Class 10A
          </p>
          <p className="text-white/60 font-lora text-xs">
            Year {new Date().getFullYear()}
          </p>
        </div>

        <nav>
          <a
            href="https://www.facebook.com/groups/513869559311973"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-block no-underline!"
            aria-label="Facebook group link"
          >
            <span className="text-white font-lora text-sm md:text-base relative z-10 group-hover:text-orange-300! hover:text-orange-400! transition-all duration-300">
              Facebook
            </span>

            <span
              className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-400 underline-grow rounded"
              aria-hidden="true"
            />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
