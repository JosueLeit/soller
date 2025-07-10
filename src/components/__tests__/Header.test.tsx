import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../Header';

// Mock the useActiveSection hook
jest.mock('../../../hooks/useActiveSection', () => ({
  useActiveSection: jest.fn(() => 'home'),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="close-icon">X</div>,
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and navigation links', () => {
    render(<Header />);

    expect(screen.getByText('soller')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Configure')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Header />);

    expect(screen.getByText('555 818 282')).toBeInTheDocument();
    expect(screen.getByText('Request a Quote')).toBeInTheDocument();
  });

  it('shows mobile menu button on mobile screens', () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('opens mobile menu when menu button is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Initially, mobile menu should not be visible
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    // Mobile menu should appear
    await waitFor(() => {
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
  });

  it('closes mobile menu when close button is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    // Close mobile menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });
  });

  it('closes mobile menu when a navigation link is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    // Click on a mobile navigation link
    const mobileLinks = screen.getAllByText('Products');
    const mobileProductsLink = mobileLinks.find(link => 
      link.closest('nav')?.querySelector('[data-testid="close-icon"]')
    );
    
    if (mobileProductsLink) {
      fireEvent.click(mobileProductsLink);
      await waitFor(() => {
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      });
    }
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);

    // Check main navigation
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(mainNav).toBeInTheDocument();

    // Check mobile menu button
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Check phone link
    const phoneLink = screen.getByRole('link', { name: /call us at 555 818 282/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:555818282');
  });

  it('applies active styles to current section', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useActiveSection } = require('../../../hooks/useActiveSection');
    useActiveSection.mockReturnValue('products');

    render(<Header />);

    const productsLink = screen.getByRole('link', { name: 'Products' });
    expect(productsLink).toHaveAttribute('aria-current', 'page');
    expect(productsLink).toHaveClass('text-orange-600');
  });

  it('has proper navigation links with correct hrefs', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /soller/i })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '#products');
    expect(screen.getByRole('link', { name: 'Solutions' })).toHaveAttribute('href', '#solutions');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '#services');
    expect(screen.getByRole('link', { name: 'Configure' })).toHaveAttribute('href', '#configure');
  });

  it('has theme toggle component', () => {
    render(<Header />);

    // ThemeToggle component should be rendered (mocked in jest.setup.js)
    expect(document.querySelector('[class*="theme"]')).toBeTruthy();
  });

  it('closes mobile menu when backdrop is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    // Click on backdrop
    const backdrop = document.querySelector('.fixed.inset-0.bg-black');
    if (backdrop) {
      fireEvent.click(backdrop);
      await waitFor(() => {
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      });
    }
  });

  it('maintains proper z-index for mobile menu', async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    // Check z-index classes
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('z-50');

    const mobileMenuOverlay = document.querySelector('.fixed.inset-0.z-40');
    expect(mobileMenuOverlay).toBeInTheDocument();
  });
});