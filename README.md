# Sweven Games - Cloud Gaming Platform

A modern cloud gaming platform built with Next.js 14, Tailwind CSS, and Clerk authentication.

## Features

- 🎮 **Modern Gaming UI** - Sleek, responsive design optimized for gaming
- 🔐 **Clerk Authentication** - Secure user authentication and management
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎯 **Game Library** - Manage your game collection with filtering and favorites
- 🛒 **Game Store** - Browse and purchase games with cart functionality
- 👤 **User Profiles** - Comprehensive user profiles with stats and achievements
- 💳 **Subscription Management** - Handle different subscription tiers
- 🔍 **Search Functionality** - Find games quickly with integrated search

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom gaming theme
- **Authentication**: Clerk
- **Icons**: Heroicons
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "d:\cloud gaming\frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file is already configured with Clerk keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJlZC1oZXJyaW5nLTU2LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_33xfBotZSP633EWomDExjX2FhRPygxvT8UbDnKzf3h
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   └── Navbar.tsx          # Navigation component with Clerk auth
│   ├── games/
│   │   └── page.tsx            # Games library page
│   ├── store/
│   │   └── page.tsx            # Game store page
│   ├── profile/
│   │   ├── page.tsx            # User profile page
│   │   └── subscription/
│   │       └── page.tsx        # Subscription management
│   ├── globals.css             # Global styles with gaming theme
│   ├── layout.tsx              # Root layout with Clerk provider
│   └── page.tsx                # Homepage
├── middleware.ts               # Clerk middleware
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## Pages

### 🏠 Homepage (`/`)
- Hero section with call-to-action
- Featured games showcase
- Platform features overview
- Responsive design with gaming aesthetics

### 🎮 Games Library (`/games`)
- Personal game collection
- Filter by category (Action, RPG, Strategy, Sports, Racing)
- Favorites system
- Game stats and playtime tracking
- Play/Install buttons

### 🛒 Store (`/store`)
- Browse available games
- Category filtering
- Shopping cart functionality
- Game ratings and reviews
- Sale badges and pricing

### 👤 Profile (`/profile`)
- User statistics and achievements
- Recent gaming activity
- Tabbed interface (Overview, Games, Achievements, Settings)
- Clerk user integration

### 💳 Subscription (`/profile/subscription`)
- Subscription plan management
- Billing history
- Plan comparison (Free, Premium, Pro)
- Payment method updates

## Authentication

The app uses Clerk for authentication with the following features:

- **Sign In/Sign Up**: Integrated Clerk components
- **User Management**: Profile data from Clerk
- **Protected Routes**: Automatic route protection
- **Social Login**: Google and Discord integration ready

## Styling

Custom gaming theme with:

- **Dark Mode**: Gaming-optimized dark theme
- **Gaming Colors**: Purple, cyan, and pink gradients
- **Custom Components**: Buttons, cards, and navigation
- **Responsive**: Mobile-first design approach

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

1. **Colors**: Modify `tailwind.config.js` for theme colors
2. **Components**: Add new components in `app/components/`
3. **Pages**: Create new pages in the `app/` directory
4. **Styles**: Update `globals.css` for global styles

## Deployment

The app is ready for deployment on Vercel, Netlify, or any Next.js-compatible platform.

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.