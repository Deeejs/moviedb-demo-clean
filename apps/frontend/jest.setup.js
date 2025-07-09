import '@testing-library/jest-dom'
import React from 'react'

// Global test cleanup
afterEach(() => {
  jest.clearAllMocks();
});

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/test',
}))

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={fill ? { position: "absolute", height: "100%", width: "100%", objectFit: "cover" } : {}}
      {...props}
    />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => children,
}))

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}))

// Setup global fetch mock
global.fetch = jest.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Lucide React icons globally
jest.mock('lucide-react', () => {
  const icons = [
    'ArrowLeft', 'Search', 'ChevronDown', 'User', 'MapPin', 'Calendar', 
    'Film', 'Star', 'Play', 'Heart', 'Bookmark', 'Share', 'Eye', 'EyeOff', 
    'Users', 'Mail', 'Lock', 'AlertCircle'
  ];
  
  const mockIcons = {};
  icons.forEach(icon => {
    mockIcons[icon] = ({ className = '', ...props }) => (
      React.createElement('div', {
        'data-testid': `${icon.toLowerCase()}-icon`,
        className,
        ...props
      })
    );
  });
  
  return mockIcons;
})