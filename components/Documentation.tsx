"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBook,
  FaLaptopCode,
  FaTools,
  FaCode,
  FaQuestionCircle,
  FaBars,
} from "react-icons/fa";

interface TableOfContentsProps {
  items: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

interface DocumentationProps {
  children: React.ReactNode;
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const pathname = usePathname();

  return (
    <Card className="border-gray-100 dark:border-gray-700 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 shadow-lg">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
          >
            Dokumentasi
          </Badge>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-3 text-sm transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-medium shadow-md"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:via-purple-900/30 dark:hover:to-green-900/30 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm"
                    )}
                  >
                    <span
                      className={cn(
                        "text-gray-500 dark:text-gray-500",
                        isActive && "text-white/90"
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-white/80"></div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const Documentation = ({ children }: DocumentationProps) => {
  const tableOfContents = [
    {
      title: "Memulai",
      href: "/Documentation",
      icon: <FaBook size={14} />,
    },
    {
      title: "Cara Penggunaan",
      href: "/Documentation/how-to-use",
      icon: <FaLaptopCode size={14} />,
    },
    {
      title: "Alat & Teknologi",
      href: "/Documentation/tools",
      icon: <FaTools size={14} />,
    },
    {
      title: "Cara Kerja",
      href: "/Documentation/how-it-works",
      icon: <FaCode size={14} />,
    },
    {
      title: "Kontak & Dukungan",
      href: "/Documentation/contact",
      icon: <FaQuestionCircle size={14} />,
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto py-8 lg:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents items={tableOfContents} />
          </div>
        </div>
        <main className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 dark:from-blue-700 dark:via-purple-700 dark:to-green-700 hidden lg:block rounded-full"></div>
          <div className="lg:px-6">{children}</div>
          <div className="fixed bottom-6 right-6 lg:hidden">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white shadow-lg rounded-full p-3 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => {
                  document
                    .getElementById("mobile-menu")
                    ?.classList.toggle("hidden");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBars size={16} />
              </motion.div>
              <div
                id="mobile-menu"
                className="hidden absolute bottom-14 right-0 w-64 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/90 dark:via-purple-900/90 dark:to-green-900/90 border border-blue-100 dark:border-blue-700 rounded-lg shadow-lg backdrop-blur-sm"
              >
                <CardContent className="p-3">
                  {tableOfContents.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:via-purple-900/30 dark:hover:to-green-900/30 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200"
                      onClick={() => {
                        document
                          .getElementById("mobile-menu")
                          ?.classList.add("hidden");
                      }}
                    >
                      <span className="text-gray-500 dark:text-gray-500">
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  ))}
                </CardContent>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;