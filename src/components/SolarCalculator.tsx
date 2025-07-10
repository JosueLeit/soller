'use client';

import React, { useState, memo } from 'react';
import { Calculator, Zap, TreePine, DollarSign, Clock, Home, Building, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSolarCalculator } from '@/hooks/useSolarCalculator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SolarCalculator = memo(() => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { ref, isInView } = useScrollAnimation();
  
  const {
    data,
    results,
    isLoading,
    updateData,
    resetCalculator,
  } = useSolarCalculator();

  const steps = [
    {
      title: 'Monthly Electric Bill',
      subtitle: 'How much do you spend on electricity monthly?',
      icon: DollarSign,
      field: 'monthlyBill',
      type: 'currency',
      min: 0,
      max: 1000,
      step: 10,
    },
    {
      title: 'Roof Area',
      subtitle: 'What is your available roof space?',
      icon: Home,
      field: 'roofArea',
      type: 'area',
      min: 0,
      max: 1000,
      step: 10,
    },
    {
      title: 'Location',
      subtitle: 'Where is your property located?',
      icon: MapPin,
      field: 'location',
      type: 'location',
    },
    {
      title: 'Daily Sunlight Hours',
      subtitle: 'Average daily sunlight hours in your area',
      icon: Zap,
      field: 'sunlightHours',
      type: 'hours',
      min: 1,
      max: 12,
      step: 0.5,
    },
    {
      title: 'Property Type',
      subtitle: 'What type of property is this for?',
      icon: Building,
      field: 'systemType',
      type: 'select',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    updateData({ [field]: value });
  };

  const handleReset = () => {
    resetCalculator();
    setCurrentStep(0);
    setShowResults(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const currentStepData = steps[currentStep];
  const isCurrentStepValid = () => {
    const field = currentStepData.field as keyof typeof data;
    const value = data[field];
    
    if (currentStepData.type === 'location') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    
    return typeof value === 'number' && value > 0;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (showResults) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Solar Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Based on your inputs, here&apos;s what solar can do for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 text-center"
          >
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              25-Year Savings
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(results.estimatedSavings)}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 text-center"
          >
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              System Size
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatNumber(results.systemSize, 1)} kW
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 text-center"
          >
            <Home className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Panels Needed
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {formatNumber(results.panelsNeeded)}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-6 text-center"
          >
            <DollarSign className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Installation Cost
            </h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(results.installationCost)}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl p-6 text-center"
          >
            <Clock className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Payback Period
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {formatNumber(results.paybackPeriod, 1)} years
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-xl p-6 text-center"
          >
            <TreePine className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              CO2 Reduction
            </h3>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatNumber(results.co2Reduction / 1000, 1)}t
            </p>
          </motion.div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Energy Production
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Monthly Production</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(results.monthlyProduction, 0)} kWh
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Yearly Production</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(results.yearlyProduction, 0)} kWh
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 font-medium"
          >
            Calculate Again
          </button>
          <button
            onClick={() => {
              // Here you would typically handle the next step (contact form, etc.)
              console.log('Get Quote clicked');
            }}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Get Free Quote
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
          <Calculator className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Solar Savings Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calculate your potential solar savings in minutes
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-yellow-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
              <currentStepData.icon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {currentStepData.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {currentStepData.type === 'currency' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={data.monthlyBill}
                    onChange={(e) => handleInputChange('monthlyBill', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter amount"
                    min={currentStepData.min}
                    max={currentStepData.max}
                    step={currentStepData.step}
                  />
                </div>
              </div>
            )}

            {currentStepData.type === 'area' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Roof Area (sq ft)
                </label>
                <input
                  type="number"
                  value={data.roofArea}
                  onChange={(e) => handleInputChange('roofArea', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter roof area"
                  min={currentStepData.min}
                  max={currentStepData.max}
                  step={currentStepData.step}
                />
              </div>
            )}

            {currentStepData.type === 'location' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City, State
                </label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your location"
                />
              </div>
            )}

            {currentStepData.type === 'hours' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Sunlight Hours
                </label>
                <input
                  type="number"
                  value={data.sunlightHours}
                  onChange={(e) => handleInputChange('sunlightHours', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter hours"
                  min={currentStepData.min}
                  max={currentStepData.max}
                  step={currentStepData.step}
                />
              </div>
            )}

            {currentStepData.type === 'select' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <div className="space-y-2">
                  {currentStepData.options?.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="systemType"
                        value={option.value}
                        checked={data.systemType === option.value}
                        onChange={(e) => handleInputChange('systemType', e.target.value)}
                        className="mr-3 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentStepValid() || isLoading}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculating...
            </>
          ) : (
            <>
              {currentStep === steps.length - 1 ? 'Calculate' : 'Next'}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
});

SolarCalculator.displayName = 'SolarCalculator';

export default SolarCalculator;