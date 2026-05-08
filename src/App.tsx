/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { StorySection } from "./components/StorySection";
import { FarmerReflection } from "./components/FarmerReflection";
import { StatsGrid } from "./components/StatsGrid";
import { MousePointer2, Sprout, Wind, Droplets, ArrowDown, ChevronRight } from "lucide-react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative bg-earth-950 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(184,115,51,0.05),transparent_70%)]" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-clay-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-harvest-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2600" 
            alt="Field at Dawn" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-950/20 via-transparent to-earth-950" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-clay-500/30 text-clay-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">
              <Sprout size={12} /> The Soil's Echo
            </span>
            <h1 className="text-7xl sm:text-9xl font-serif font-medium tracking-tight mb-8">
              The Silent <span className="italic text-clay-500">Acre</span>
            </h1>
            <p className="max-w-2xl mx-auto text-stone-400 text-lg sm:text-xl leading-relaxed mb-12">
              A journey into the heart of the village, where every furrow in the earth 
              tells a tale of survival, legacy, and the quiet weight of the horizon.
            </p>
            <motion.div 
              style={{ opacity }}
              className="flex flex-col items-center gap-4 text-stone-500"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-clay-500/50 to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll to Begin</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Path */}
      <div className="relative z-10">
        <StorySection 
          id="morning"
          subtitle="Chapter I: The Morning Toil"
          title="Gold in the Dust"
          content={`Before the sun claims the sky, Hari is already one with the earth. The sound of the plow cutting through dry clay is the music he has known for forty years.

"The soil is a demanding mother," he says. "She gives only what we sacrifice in sweat. But lately, she seems tired. The rains don't come when promised, and the dust grows thicker every year."`}
          image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600"
        />

        <StorySection 
          id="water"
          subtitle="Chapter II: The Thirst"
          alignment="right"
          title="Waiting for the Sky"
          content={`Water used to be a blessing; now it's a currency few can afford. The village well has deepened thrice in the last decade, yet the bottom remains parched.

The children help carry plastic jars from the community tanker, their laughter a sharp contrast to the cracked earth beneath their bare feet. Every drop is measured, every cloud a potential savior that often passes without a glance.`}
          image="https://images.unsplash.com/photo-1470115636492-6d2b5120ef69?auto=format&fit=crop&q=80&w=1600"
        />

        {/* Stats Section */}
        <section className="py-32 px-6 sm:px-12 bg-earth-900/30 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-800 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-6xl font-serif font-medium mb-6">The Unseen Weight</h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Behind every resilient smile in the field is a system that grows heavier 
                by the day. The economics of the village are changing.
              </p>
            </motion.div>
            <StatsGrid />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-800 to-transparent" />
        </section>

        <StorySection 
          id="debt"
          subtitle="Chapter III: The Shadow"
          title="The Ledger's Grip"
          content={`Debt is like the weeds in the monsoon—you pull them out today, and they double tomorrow. Seed money, fertilizer loans, the daughter's wedding... it all adds up in the moneylender's book.

Hari watches his son look at the trains passing by. "He wants to go to the city," he whispers. "I want him to stay, but I cannot ask him to inherit this burden. The land is my heart, but it is a heavy thing to carry."`}
          image="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1600"
        />

        {/* AI Interaction Section */}
        <section className="py-32 px-6 sm:px-12 relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <span className="text-clay-500 font-mono text-sm tracking-widest uppercase block mb-4">
                Chapter IV: The Echo
              </span>
              <h2 className="text-5xl sm:text-7xl font-serif font-medium leading-tight mb-8 text-stone-100">
                Voices of the <span className="italic">Horizon</span>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-12">
                Sit for a moment with Hari. Ask him about the stories passed down through 
                generations, the way he predicts the harvest, or the dreams he has for 
                the village. His answers are the lived truth of millions.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Wind size={20} />, text: "Nature's unpredictable cycles" },
                  { icon: <Droplets size={20} />, text: "The preciousness of resources" },
                  { icon: <Sprout size={20} />, text: "The resilience of the human spirit" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 text-stone-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-clay-500/10 flex items-center justify-center text-clay-500">
                      {item.icon}
                    </div>
                    <span className="font-serif italic text-xl">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <FarmerReflection />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 sm:px-12 border-t border-stone-900 text-center">
          <div className="max-w-3xl mx-auto">
            <h4 className="font-serif text-3xl font-medium mb-6">Seeds of Change</h4>
            <p className="text-stone-500 mb-12">
              Understanding is the first step toward empathy. This project is a tribute 
              to the millions of farmers who feed the world while facing the most 
              profound uncertainties of our age.
            </p>
            <div className="flex justify-center gap-8 text-stone-600 font-mono text-xs uppercase tracking-widest">
              <span className="hover:text-clay-500 transition-colors cursor-pointer">Support Local Farmers</span>
              <span className="hover:text-clay-500 transition-colors cursor-pointer">Climate Action</span>
              <span className="hover:text-clay-500 transition-colors cursor-pointer">Rural Development</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Scroll Indicator */}
      <motion.div 
        className="fixed bottom-8 left-8 z-50 flex items-center gap-4 glass px-4 py-2 rounded-full border-stone-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="w-1 h-8 bg-stone-800 rounded-full relative overflow-hidden">
          <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-0 bg-clay-500 origin-top"
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Progress</span>
      </motion.div>
    </div>
  );
}

