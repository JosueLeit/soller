'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SolarCalculatorData {
  monthlyBill: number;
  roofArea: number;
  location: string;
  sunlightHours: number;
  systemType: 'residential' | 'commercial';
}

export interface SolarCalculatorResults {
  estimatedSavings: number;
  systemSize: number;
  panelsNeeded: number;
  installationCost: number;
  paybackPeriod: number;
  co2Reduction: number;
  monthlyProduction: number;
  yearlyProduction: number;
}

const SOLAR_CONSTANTS = {
  PANEL_WATTAGE: 400, // Watts per panel
  PANEL_AREA: 2.2, // Square meters per panel
  EFFICIENCY_FACTOR: 0.8, // System efficiency
  COST_PER_WATT: 2.5, // Installation cost per watt
  ELECTRICITY_RATE: 0.12, // Cost per kWh
  CO2_FACTOR: 0.4, // kg CO2 per kWh
  INFLATION_RATE: 0.03, // Annual electricity price increase
};

export function useSolarCalculator() {
  const [data, setData] = useState<SolarCalculatorData>({
    monthlyBill: 0,
    roofArea: 0,
    location: '',
    sunlightHours: 5,
    systemType: 'residential',
  });

  const [results, setResults] = useState<SolarCalculatorResults>({
    estimatedSavings: 0,
    systemSize: 0,
    panelsNeeded: 0,
    installationCost: 0,
    paybackPeriod: 0,
    co2Reduction: 0,
    monthlyProduction: 0,
    yearlyProduction: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const calculateSolar = useCallback(async (inputData: SolarCalculatorData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Calculate monthly energy consumption (kWh)
      const monthlyConsumption = inputData.monthlyBill / SOLAR_CONSTANTS.ELECTRICITY_RATE;
      
      // Calculate required system size (kW)
      const dailyConsumption = monthlyConsumption / 30;
      const systemSize = dailyConsumption / (inputData.sunlightHours * SOLAR_CONSTANTS.EFFICIENCY_FACTOR);
      
      // Calculate panels needed
      const panelsNeeded = Math.ceil((systemSize * 1000) / SOLAR_CONSTANTS.PANEL_WATTAGE);
      
      // Check if roof area is sufficient and limit panels accordingly
      const actualPanels = inputData.roofArea > 0 ? 
        Math.min(panelsNeeded, Math.floor(inputData.roofArea / SOLAR_CONSTANTS.PANEL_AREA)) : 
        panelsNeeded;
      
      const actualSystemSize = (actualPanels * SOLAR_CONSTANTS.PANEL_WATTAGE) / 1000;
      
      // Calculate production
      const monthlyProduction = actualSystemSize * inputData.sunlightHours * 30 * SOLAR_CONSTANTS.EFFICIENCY_FACTOR;
      const yearlyProduction = monthlyProduction * 12;
      
      // Calculate costs and savings
      const installationCost = actualSystemSize * 1000 * SOLAR_CONSTANTS.COST_PER_WATT;
      const monthlySavings = Math.min(monthlyProduction * SOLAR_CONSTANTS.ELECTRICITY_RATE, inputData.monthlyBill);
      const yearlySavings = monthlySavings * 12;
      
      // Calculate payback period
      const paybackPeriod = installationCost / yearlySavings;
      
      // Calculate 25-year savings (accounting for inflation)
      let totalSavings = 0;
      for (let year = 1; year <= 25; year++) {
        const yearlyBill = inputData.monthlyBill * 12 * Math.pow(1 + SOLAR_CONSTANTS.INFLATION_RATE, year);
        const yearlySolarSavings = Math.min(yearlyProduction * SOLAR_CONSTANTS.ELECTRICITY_RATE * Math.pow(1 + SOLAR_CONSTANTS.INFLATION_RATE, year), yearlyBill);
        totalSavings += yearlySolarSavings;
      }
      const estimatedSavings = totalSavings - installationCost;
      
      // Calculate CO2 reduction
      const co2Reduction = yearlyProduction * SOLAR_CONSTANTS.CO2_FACTOR * 25; // 25 years
      
      const calculatedResults: SolarCalculatorResults = {
        estimatedSavings,
        systemSize: actualSystemSize,
        panelsNeeded: actualPanels,
        installationCost,
        paybackPeriod,
        co2Reduction,
        monthlyProduction,
        yearlyProduction,
      };
      
      setResults(calculatedResults);
      return calculatedResults;
    } catch (error) {
      console.error('Solar calculation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateData = useCallback((newData: Partial<SolarCalculatorData>) => {
    setData(prev => ({ ...prev, ...newData }));
  }, []);

  const resetCalculator = useCallback(() => {
    setData({
      monthlyBill: 0,
      roofArea: 0,
      location: '',
      sunlightHours: 5,
      systemType: 'residential',
    });
    setResults({
      estimatedSavings: 0,
      systemSize: 0,
      panelsNeeded: 0,
      installationCost: 0,
      paybackPeriod: 0,
      co2Reduction: 0,
      monthlyProduction: 0,
      yearlyProduction: 0,
    });
  }, []);

  // Auto-calculate when data changes
  useEffect(() => {
    if (data.monthlyBill > 0 && data.sunlightHours > 0) {
      calculateSolar(data);
    }
  }, [data, calculateSolar]);

  return {
    data,
    results,
    isLoading,
    updateData,
    calculateSolar,
    resetCalculator,
  };
}