'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SolarCalculator = React.lazy(() => import('./SolarCalculator'));

const CalculatorSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-6">
            <Calculator className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your Solar Savings
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how much you can save with solar energy. Our interactive calculator 
            provides personalized estimates based on your energy usage and location.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Suspense
            fallback={
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center h-96">
                  <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
                </div>
              </div>
            }
          >
            <SolarCalculator />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;