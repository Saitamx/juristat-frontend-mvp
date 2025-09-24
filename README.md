# Juristat Patent Analytics Dashboard

A modern, responsive dashboard built with Next.js, TypeScript, and Tailwind CSS for displaying patent application analytics and insights.

## Features

- 🚀 **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- 📱 **Mobile-First Design**: Responsive and accessible UI
- ⚡ **Performance Optimized**: Lazy loading, Suspense, useMemo, useCallback
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📊 **Interactive Charts**: Recharts for data visualization
- 🔍 **Search & Filter**: Real-time search and sorting
- 🧪 **Comprehensive Testing**: Jest unit tests and Cypress E2E tests
- 🏗️ **Modular Architecture**: Context API, custom hooks, reusable components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons, Lucide React
- **Testing**: Jest, React Testing Library, Cypress
- **State Management**: React Context API
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- Backend API running on port 8090

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd juristat-frontend-mvp
```

2. Install dependencies:
```bash
yarn install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8090
```

5. Start the development server:
```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage
- `yarn cypress:open` - Open Cypress test runner
- `yarn cypress:run` - Run Cypress tests headlessly
- `yarn test:e2e` - Run E2E tests
- `yarn test:all` - Run all tests

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── dashboard/        # Dashboard-specific components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── __tests__/            # Unit tests
```

## Key Components

### Dashboard Components
- **StatsCards**: Display key metrics and statistics
- **Charts**: Interactive data visualizations
- **DataTable**: Sortable and searchable data table
- **Dashboard**: Main dashboard container with lazy loading

### UI Components
- **Button**: Customizable button component
- **Card**: Flexible card container
- **Input**: Form input with validation
- **Badge**: Status and category badges
- **LoadingSpinner**: Loading states and skeletons

### Context & Hooks
- **DashboardContext**: Global state management
- **useApi**: API data fetching hooks
- **Custom hooks**: Optimized with useMemo and useCallback

## API Integration

The dashboard connects to the Juristat API endpoints:

- `GET /data` - Fetch companies data
- `GET /stats` - Fetch aggregated statistics

## Testing

### Unit Tests
```bash
yarn test
```

### E2E Tests
```bash
yarn cypress:open
```

### Coverage
```bash
yarn test:coverage
```

## Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Suspense**: Graceful loading states
- **useMemo**: Memoized expensive calculations
- **useCallback**: Memoized event handlers
- **Code Splitting**: Automatic route-based splitting

## Responsive Design

The dashboard is built mobile-first with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.