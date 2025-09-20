import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/test', label: 'Product Testing' },
    { href: '/about', label: 'About' },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
            ;
          </div>
          <span className="font-playfair text-xl font-semibold">semicolon</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex ml-8 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-xl ${
                location.pathname === item.href
                  ? 'text-accent bg-accent/10'
                  : 'text-muted hover:text-foreground hover:bg-accent/5'
              }`}
            >
              {item.label}
              {location.pathname === item.href && (
                <motion.div
                  className="absolute inset-0 rounded-xl ring-1 ring-accent/20"
                  layoutId="navbar-indicator"
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="ml-auto">
          <Button asChild>
            <Link to="/test">Try Demo</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}