"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const values = [
  { icon: "💡", label: "Innovation", bg: "bg-[#101a2b]" },
  { icon: "🔬", label: "Research", bg: "bg-[#112033]" },
  { icon: "💻", label: "Software Development", bg: "bg-[#191d3b]" },
  { icon: "🧬", label: "Biotechnology", bg: "bg-[#183e36]" },
  { icon: "🤖", label: "AI Systems", bg: "bg-[#1b3145]" },
  { icon: "⛓️", label: "Blockchain", bg: "bg-[#322b3b]" },
  { icon: "🦾", label: "Biomechatronics", bg: "bg-[#245445]" },
  { icon: "🚁", label: "Collision Avoidance", bg: "bg-[#333d29]" },
  { icon: "🐦", label: "Animal Behaviour", bg: "bg-[#3b271d]" },
  { icon: "🐝", label: "Bio Inspired Drone", bg: "bg-[#233b42]" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -45 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 45 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 22 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function CoreValuesGrid() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
    >
      {values.map((item) => (
        <motion.div
          key={item.label}
          variants={scaleIn}
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`flex items-center rounded-xl border border-white/10 ${item.bg} p-5 shadow-sm backdrop-blur transition hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
        >
          <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-2xl text-white">
            {item.icon}
          </span>

          <span className="text-base font-semibold text-white">
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-10 md:pt-20 md:pb-14">
      <div className="pointer-events-none absolute inset-0">
      <motion.div
          className="absolute -inset-24 opacity-90 blur-1xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 0.95, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(...)",
          }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-4"
      >
        <div className="mx-auto max-w-3xl text-center">

          <motion.div
            variants={fadeUp}
            className="flex justify-center items-center"
          >
       
              {/* Replace the emoji below with your actual logo image if you have one */}
              <img src="/image.png" alt="NeuroFlight Lab Logo" className="h-42 w-42 object-contain" />
         
          </motion.div>
     
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            NeuroFlight Lab
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-3 text-sm font-semibold italic text-white/70 md:text-base"
          >
            &quot;Sky is the Limit&quot;
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]"
          >
            We are a multidisciplinary research organization working at the
            intersection of AI, robotics, biotechnology, and software systems to
            build intelligent and impactful solutions for the future.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-5 text-sm font-semibold text-[#081022] transition hover:-translate-y-0.5"
            >
              Explore Research
            </Link>

            <Link
              href="/publications"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore Development
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Stay Updated
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 flex justify-center"
        >
          <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
            <motion.div
              variants={fadeLeft}
              whileHover={{ y: -6 }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 md:w-[420px]"
            >
              <div className="text-sm font-semibold text-white">Mission</div>

              <p className="mt-3 text-sm leading-7 text-white/65">
                To advance interdisciplinary research and innovation at the
                intersection of AI, robotics, biotechnology, and software
                systems—through collaboration, education, and real-world impact.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              whileHover={{ y: -6 }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 md:w-[420px]"
            >
              <div className="text-sm font-semibold text-white">Vision</div>

              <p className="mt-3 text-sm leading-7 text-white/65">
                To become a globally recognized hub for AI-driven
                interdisciplinary innovation across research and
                industry—building systems that are transparent, reliable, and
                beneficial.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-3 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200"
          >
            What We Stand For
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-3xl font-extrabold text-white"
          >
            Core Values
          </motion.h2>

          <CoreValuesGrid />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
          >
            {values.map((item) => (
              <motion.span
                key={item.label}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}