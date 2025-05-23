"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing toggle after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Dokumentasi", href: "/Documentation" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-50/95 via-purple-50/95 to-green-50/95 dark:from-blue-900/95 dark:via-purple-900/95 dark:to-green-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex max-w-7xl mx-auto h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-green-700 transition-all duration-300">
                Simulasi MLFQ
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg",
                  pathname === item.href
                    ? "text-white bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-100 hover:to-green-100 dark:hover:from-blue-900/50 dark:hover:via-purple-900/50 dark:hover:to-green-900/50"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 border border-purple-200 dark:border-purple-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
                aria-label="Ganti tema"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "dark" ? (
                  <FiSun className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <FiMoon className="h-4 w-4 text-blue-600" />
                )}
              </motion.button>
            )}
          </nav>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;