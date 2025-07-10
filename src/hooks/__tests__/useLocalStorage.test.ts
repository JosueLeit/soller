import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    
    expect(result.current[0]).toBe('default-value');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('returns stored value when localStorage contains data', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    
    expect(result.current[0]).toBe('stored-value');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('handles complex objects in localStorage', () => {
    const complexObject = { name: 'test', age: 30, hobbies: ['reading', 'coding'] };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(complexObject));
    
    const { result } = renderHook(() => useLocalStorage('test-key', {}));
    
    expect(result.current[0]).toEqual(complexObject);
  });

  it('sets value in localStorage when setValue is called', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  it('handles function updates correctly', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(10));
    
    const { result } = renderHook(() => useLocalStorage('counter', 0));
    
    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });
    
    expect(result.current[0]).toBe(11);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('counter', JSON.stringify(11));
  });

  it('handles localStorage getItem errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
    expect(consoleSpy).toHaveBeenCalledWith('Error reading localStorage key "test-key":', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('handles localStorage setItem errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Error setting localStorage key "test-key":', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('handles malformed JSON in localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
    expect(consoleSpy).toHaveBeenCalledWith('Error reading localStorage key "test-key":', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('works with boolean values', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(true));
    
    const { result } = renderHook(() => useLocalStorage('boolean-key', false));
    
    expect(result.current[0]).toBe(true);
    
    act(() => {
      result.current[1](false);
    });
    
    expect(result.current[0]).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('boolean-key', JSON.stringify(false));
  });

  it('works with array values', () => {
    const initialArray = [1, 2, 3];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialArray));
    
    const { result } = renderHook(() => useLocalStorage('array-key', [] as number[]));
    
    expect(result.current[0]).toEqual(initialArray);
    
    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });
    
    expect(result.current[0]).toEqual(newArray);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('array-key', JSON.stringify(newArray));
  });

  it('returns initial value when window is undefined (SSR)', () => {
    // Mock window being undefined
    const originalWindow = global.window;
    // @ts-expect-error - Intentionally deleting window for SSR test
    delete global.window;
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'ssr-default'));
    
    expect(result.current[0]).toBe('ssr-default');
    
    // Restore window
    global.window = originalWindow;
  });
});