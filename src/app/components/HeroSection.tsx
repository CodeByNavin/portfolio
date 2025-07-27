"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/Navin.png"
          alt="Navin"
          width={160}
          height={160}
          className="rounded-full border-4 border-red-500 shadow-xl"
        />
      </motion.div>
      <motion.h1
        className="mt-6 text-5xl font-extrabold text-red-400 font-poppins"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Hey, I'm Navin
      </motion.h1>
      <motion.p
        className="mt-4 max-w-xl text-gray-300 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        A 15-year-old building innovative web experiences with code and passion.
      </motion.p>
      <motion.a
        href="#projects"
        className="mt-8 inline-block px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        See My Work
      </motion.a>
    </section>
  );
}
