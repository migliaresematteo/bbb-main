import React, { useState } from "react";
import { Button } from "./ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  logo?: string;
  navItems?: Array<{
    label: string;
    href: string;
    children?: Array<{
      title: string;
      href: string;
      description?: string;
    }>;
  }>;
}

const Header = ({
  logo = "BrickByBrick",
  navItems = [
    { label: "Home", href: "/" },
    { label: "Immobili", href: "/properties" },
  ],
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const handleScrollToContacts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle if it's a hash link
    if (e.currentTarget.getAttribute("to")?.startsWith("#")) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("to")?.substring(1);
      
      // Check if we're already on the homepage
      if (location.pathname === "/") {
        // We're on the homepage, just scroll to the element
        const targetElement = document.getElementById(targetId || "");
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
          });
        }
      } else {
        // We're not on the homepage, store the target in sessionStorage
        // and navigate to the homepage
        sessionStorage.setItem("scrollToSection", targetId || "");
        window.location.href = "/";
      }
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 sm:h-20 px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-primary tracking-tight"
          >
            {logo}
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item, index) => {
              // If the item has children, render a dropdown
              if (item.children) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child, childIndex) => (
                          <ListItem
                            key={childIndex}
                            title={child.title}
                            href={child.href}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              // Otherwise render a simple link
              return (
                <NavigationMenuItem key={index}>
                  <Link
                    to={item.href}
                    className={navigationMenuTriggerStyle()}
                    onClick={item.href.startsWith("#") ? handleScrollToContacts : undefined}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Contact Button - Desktop */}
        <Button asChild className="hidden md:flex items-center gap-2">
          <a href="tel:+393403524759">
            <Phone className="h-4 w-4" />
            <span>Chiamaci</span>
          </a>
        </Button>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-lg font-medium py-2 border-b border-gray-100 hover:text-primary transition-colors"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.href.startsWith("#")) {
                      handleScrollToContacts(e);
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-4 w-full flex items-center justify-center gap-2">
                <a href="tel:+393403524759">
                  <Phone className="h-4 w-4" />
                  <span>Chiamaci</span>
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
