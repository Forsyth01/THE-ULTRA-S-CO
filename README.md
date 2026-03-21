# The Ultra's Co

Premium headwear e-commerce website built for the ultras, the fans, the faithful. Snapbacks, beanies & bucket hats — forged in soccer culture.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Anton (display) + DM Sans (body)

## Features

- Responsive design with mobile-first approach
- Shopping cart with localStorage persistence
- Product catalog with categories (Snapbacks, Beanies, Bucket Hats)
- Individual product pages with related products
- Smooth animations and transitions
- Announcement bar with promotional messaging

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── collections/       # Category collection pages
│   ├── contact/           # Contact page
│   ├── products/          # Product detail pages
│   └── shop/              # Shop all products page
├── components/
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   ├── sections/          # Page sections (Hero, Categories, etc.)
│   └── ui/                # Reusable UI components
├── context/               # React context providers
│   └── CartContext.jsx    # Shopping cart state management
└── data/                  # Static data
    └── products.js        # Product catalog
```

## Environment

No environment variables required for basic functionality. Images are configured to allow all HTTPS hosts.

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

Private - All rights reserved.
