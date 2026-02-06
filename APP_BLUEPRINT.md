# Impero Di Gold - Mobile App Blueprint

## Project Overview
**Name**: Impero Vault / Impero Di Gold
**Type**: Hybrid Mobile App (iOS/Android) & Web
**Stack**: React, Vite, Capacitor, TailwindCSS, Framer Motion

## 1. Directory Structure
- `android/` - Native Android project
- `ios/` - Native iOS project
- `client/src/` - React Source Code
  - `pages/` - Application Screens
  - `components/` - Reusable UI Components
  - `lib/` - Logic & Utilities
  - `assets/` - Images & Fonts

## 2. Key Source Code

### A. Navigation Header (Safe Area & Layout)
**File**: `client/src/components/layout/header.tsx`
```tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Search, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@assets/impero_logo_transparent.png';
import { VaultUnlock } from '@/components/admin/VaultUnlock';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [tapCount, setTapCount] = useState(0);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin Vault Unlock (Triple Tap Logo)
  useEffect(() => {
    if (tapCount === 3) {
      setIsVaultOpen(true);
      setTapCount(0);
    }
    const timer = setTimeout(() => setTapCount(0), 1000);
    return () => clearTimeout(timer);
  }, [tapCount]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Bespoke', href: '/bespoke' },
    { name: 'Try-On', href: '/try-on' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-2 border-gray-100 shadow-sm' : 'bg-transparent py-4 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-20 max-w-7xl mx-auto relative">
          
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden z-50">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white border-r-gray-100 p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b border-gray-100">
                     <img src={logoImg} className="h-12 w-auto mx-auto" alt="Logo" />
                  </div>
                  <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navLinks.map((item) => (
                      <Link key={item.name} href={item.href}>
                         <div className="block px-4 py-3 text-lg font-serif text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                           {item.name}
                         </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide flex-1 justify-start pr-40">
            {navLinks.slice(0, 2).map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-primary transition-colors">{item.name}</Link>
            ))}
          </nav>

          {/* LOGO (Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
             <Link href="/">
                <div className="pointer-events-auto cursor-pointer block" onClick={() => setTapCount(c => c + 1)}>
                   <div className="h-24 md:h-40 w-auto flex items-center justify-center transition-transform hover:scale-105">
                      <img src={logoImg} alt="Impero Di Gold" className="h-full w-auto object-contain drop-shadow-2xl" />
                   </div>
                </div>
             </Link>
          </div>

          <VaultUnlock isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} onUnlock={() => setLocation('/admin')} />

          {/* Desktop Right Nav & Actions */}
          <div className="flex items-center gap-4 flex-1 justify-end">
             <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide mr-6 pl-40">
                {navLinks.slice(2).map((item) => (
                  <Link key={item.name} href={item.href} className="text-gray-600 hover:text-primary transition-colors">{item.name}</Link>
                ))}
             </nav>
             <Button variant="ghost" size="icon" className="hidden lg:flex"><Search className="w-5 h-5" /></Button>
             <Link href="/auth"><Button variant="ghost" size="icon"><User className="w-5 h-5" /></Button></Link>
          </div>

        </div>
      </div>
    </header>
  );
}
```

### B. Home Screen (Landing Page)
**File**: `client/src/pages/home.tsx`
(Contains Hero Section, Marquee, Feature Grid, Gallery, and Product Teasers)
See `client/src/pages/home.tsx` for 700+ lines of implementation including complex Framer Motion animations.

### C. Catalog Screen (With Filters)
**File**: `client/src/pages/catalog.tsx`
```tsx
// (Partial View - See file for full logic)
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/product/product-card';

export default function CatalogPage() {
   // State: Sort, Filter
   // Query: /api/products
   // Logic: Calculate Live Price based on Gold Rate * Weight + Making Charge
   // Render: Grid of ProductCards
}
```

### D. Virtual Try-On (AR)
**File**: `client/src/components/virtual-tryon/VirtualTryOn.tsx`
(Implements MediaPipe Face Mesh & Hand Tracking for real-time jewelry overlay)

## 3. Assets
- **Logo**: `client/src/assets/impero_logo_transparent.png`
- **Backgrounds**: `client/src/assets/generated_images/...`
- **App Icon**: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`

## 4. Deployment Check
- **Local Dev**: `http://localhost:8080`
- **API Server**: `http://localhost:5001`
- **App Store Submission**:
  - Privacy Policy: `client/src/pages/privacy-policy.tsx` (Route: `/privacy-policy`)
  - Screenshots: See `AppStoreScreenshots/` folder.
