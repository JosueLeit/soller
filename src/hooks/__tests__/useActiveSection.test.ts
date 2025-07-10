import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '../useActiveSection';

// Mock document.getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

// Mock addEventListener and removeEventListener
const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

describe('useActiveSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('initializes with empty active section', () => {
    mockGetElementById.mockReturnValue(null);
    
    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about', 'contact'] })
    );

    expect(result.current).toBe('');
  });

  it('sets active section based on scroll position', () => {
    // Mock elements with different offsetTop values
    const mockElements = {
      home: { offsetTop: 0 },
      about: { offsetTop: 500 },
      contact: { offsetTop: 1000 },
    };

    mockGetElementById.mockImplementation((id: string) => mockElements[id as keyof typeof mockElements] || null);
    
    // Set scroll position to 600 (should activate 'about' section)
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });

    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about', 'contact'], offset: 100 })
    );

    // The hook should set 'about' as active since scrollY (600) + offset (100) = 700 > about.offsetTop (500)
    expect(result.current).toBe('about');
  });

  it('updates active section on scroll', () => {
    const mockElements = {
      home: { offsetTop: 0 },
      about: { offsetTop: 500 },
      contact: { offsetTop: 1000 },
    };

    mockGetElementById.mockImplementation((id: string) => mockElements[id as keyof typeof mockElements] || null);
    
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });

    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about', 'contact'], offset: 100 })
    );

    expect(result.current).toBe('home');

    // Simulate scroll to about section
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    
    // Get the scroll handler that was registered
    const scrollHandler = addEventListenerSpy.mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1] as () => void;

    act(() => {
      scrollHandler();
      jest.advanceTimersByTime(10); // Advance timer for throttling
    });

    expect(result.current).toBe('about');
  });

  it('adds and removes scroll event listener', () => {
    const { unmount } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about'] })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('handles missing elements gracefully', () => {
    mockGetElementById.mockReturnValue(null);
    
    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['nonexistent1', 'nonexistent2'] })
    );

    expect(result.current).toBe('');
  });

  it('uses default offset when not provided', () => {
    const mockElements = {
      home: { offsetTop: 0 },
      about: { offsetTop: 500 },
    };

    mockGetElementById.mockImplementation((id: string) => mockElements[id as keyof typeof mockElements] || null);
    
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });

    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about'] })
    );

    // With default offset of 100, scrollY (50) + offset (100) = 150 > home.offsetTop (0)
    expect(result.current).toBe('home');
  });

  it('selects the last qualifying section when multiple sections qualify', () => {
    const mockElements = {
      home: { offsetTop: 0 },
      about: { offsetTop: 200 },
      contact: { offsetTop: 400 },
    };

    mockGetElementById.mockImplementation((id: string) => mockElements[id as keyof typeof mockElements] || null);
    
    // Scroll position where multiple sections would qualify
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });

    const { result } = renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about', 'contact'], offset: 100 })
    );

    // Should select 'contact' as it's the last section that qualifies
    expect(result.current).toBe('contact');
  });

  it('throttles scroll events', () => {
    const mockElements = {
      home: { offsetTop: 0 },
      about: { offsetTop: 500 },
    };

    mockGetElementById.mockImplementation((id: string) => mockElements[id as keyof typeof mockElements] || null);

    renderHook(() => 
      useActiveSection({ sectionIds: ['home', 'about'] })
    );

    const scrollHandler = addEventListenerSpy.mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1] as () => void;

    // Call scroll handler multiple times rapidly
    act(() => {
      scrollHandler();
      scrollHandler();
      scrollHandler();
    });

    // Only one timeout should be set due to throttling
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(jest.getTimerCount()).toBe(0);
  });
});