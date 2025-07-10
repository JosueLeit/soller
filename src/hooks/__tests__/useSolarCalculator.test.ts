import { renderHook, act } from '@testing-library/react';
import { useSolarCalculator } from '../useSolarCalculator';

// Mock timers for setTimeout
jest.useFakeTimers();

describe('useSolarCalculator', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useSolarCalculator());

    expect(result.current.data).toEqual({
      monthlyBill: 0,
      roofArea: 0,
      location: '',
      sunlightHours: 5,
      systemType: 'residential',
    });

    expect(result.current.results).toEqual({
      estimatedSavings: 0,
      systemSize: 0,
      panelsNeeded: 0,
      installationCost: 0,
      paybackPeriod: 0,
      co2Reduction: 0,
      monthlyProduction: 0,
      yearlyProduction: 0,
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('updates data correctly', () => {
    const { result } = renderHook(() => useSolarCalculator());

    act(() => {
      result.current.updateData({
        monthlyBill: 100,
        location: 'California',
      });
    });

    expect(result.current.data.monthlyBill).toBe(100);
    expect(result.current.data.location).toBe('California');
    expect(result.current.data.sunlightHours).toBe(5); // Should preserve other values
  });

  it('calculates solar results correctly', async () => {
    const { result } = renderHook(() => useSolarCalculator());

    const testData = {
      monthlyBill: 150,
      roofArea: 1000,
      location: 'California',
      sunlightHours: 6,
      systemType: 'residential' as const,
    };

    act(() => {
      result.current.updateData(testData);
    });

    // Fast-forward time to complete the calculation
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Wait for the async calculation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.results.systemSize).toBeGreaterThan(0);
    expect(result.current.results.panelsNeeded).toBeGreaterThan(0);
    expect(result.current.results.installationCost).toBeGreaterThan(0);
    expect(result.current.results.monthlyProduction).toBeGreaterThan(0);
    expect(result.current.results.yearlyProduction).toBeGreaterThan(0);
  });

  it('handles loading state during calculation', async () => {
    const { result } = renderHook(() => useSolarCalculator());

    const testData = {
      monthlyBill: 150,
      roofArea: 1000,
      location: 'California',
      sunlightHours: 6,
      systemType: 'residential' as const,
    };

    act(() => {
      result.current.updateData(testData);
    });

    // Should be loading initially
    expect(result.current.isLoading).toBe(true);

    // Fast-forward time to complete the calculation
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Wait for the async calculation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('resets calculator to initial state', () => {
    const { result } = renderHook(() => useSolarCalculator());

    // Set some data first
    act(() => {
      result.current.updateData({
        monthlyBill: 200,
        location: 'Texas',
      });
    });

    // Reset
    act(() => {
      result.current.resetCalculator();
    });

    expect(result.current.data).toEqual({
      monthlyBill: 0,
      roofArea: 0,
      location: '',
      sunlightHours: 5,
      systemType: 'residential',
    });

    expect(result.current.results).toEqual({
      estimatedSavings: 0,
      systemSize: 0,
      panelsNeeded: 0,
      installationCost: 0,
      paybackPeriod: 0,
      co2Reduction: 0,
      monthlyProduction: 0,
      yearlyProduction: 0,
    });
  });

  it('calculates correct system size based on consumption', async () => {
    const { result } = renderHook(() => useSolarCalculator());

    const testData = {
      monthlyBill: 120, // $120/month
      roofArea: 800,
      location: 'Arizona',
      sunlightHours: 7,
      systemType: 'residential' as const,
    };

    act(() => {
      result.current.updateData(testData);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // With $120/month at $0.12/kWh = 1000 kWh/month
    // Daily consumption = 1000/30 = 33.33 kWh/day
    // System size = 33.33 / (7 * 0.8) = ~5.95 kW
    expect(result.current.results.systemSize).toBeCloseTo(5.95, 0);
  });

  it('limits panels based on available roof area', async () => {
    const { result } = renderHook(() => useSolarCalculator());

    const testData = {
      monthlyBill: 300, // High bill requiring more panels
      roofArea: 100, // Small roof area
      location: 'California',
      sunlightHours: 6,
      systemType: 'residential' as const,
    };

    act(() => {
      result.current.updateData(testData);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // With 100 sq ft roof and 2.2 sq ft per panel = max 45 panels
    expect(result.current.results.panelsNeeded).toBeLessThanOrEqual(45);
  });

  it('calculates CO2 reduction correctly', async () => {
    const { result } = renderHook(() => useSolarCalculator());

    const testData = {
      monthlyBill: 100,
      roofArea: 500,
      location: 'California',
      sunlightHours: 5,
      systemType: 'residential' as const,
    };

    act(() => {
      result.current.updateData(testData);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // CO2 reduction should be positive and based on 25 years of production
    expect(result.current.results.co2Reduction).toBeGreaterThan(0);
    expect(result.current.results.co2Reduction).toBe(
      result.current.results.yearlyProduction * 0.4 * 25
    );
  });

  it('does not calculate when monthly bill is zero', () => {
    const { result } = renderHook(() => useSolarCalculator());

    act(() => {
      result.current.updateData({
        monthlyBill: 0,
        location: 'California',
      });
    });

    // Should not be loading since no calculation triggered
    expect(result.current.isLoading).toBe(false);
    expect(result.current.results.systemSize).toBe(0);
  });
});