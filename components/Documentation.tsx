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
    <Card className="border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center">
          <Badge
            variant="outline"
            className="bg-gray-50 dark:bg-gray-700 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
          >
            Documentation
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
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "text-gray-500 dark:text-gray-500",
                        isActive && "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
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
      title: "Getting Started",
      href: "/Documentation",
      icon: <FaBook size={14} className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "How to Use",
      href: "/Documentation/how-to-use",
      icon: (
        <FaLaptopCode size={14} className="text-gray-500 dark:text-gray-400" />
      ),
    },
    {
      title: "Tools & Technologies",
      href: "/Documentation/tools",
      icon: <FaTools size={14} className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "How It Works",
      href: "/Documentation/how-it-works",
      icon: <FaCode size={14} className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "Contact & Support",
      href: "/Documentation/contact",
      icon: (
        <FaQuestionCircle
          size={14}
          className="text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto py-8 lg:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents items={tableOfContents} />
          </div>
        </div>
        <main className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 hidden lg:block"></div>
          <div className="lg:px-6">{children}</div>
          <div className="fixed bottom-6 right-6 lg:hidden">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gray-700 dark:bg-gray-600 text-gray-100 dark:text-gray-300 shadow-sm rounded-full p-2 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("mobile-menu")
                    ?.classList.toggle("hidden");
                }}
              >
                <FaBars size={16} />
              </motion.div>
              <div
                id="mobile-menu"
                className="hidden absolute bottom-12 right-0 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm"
              >
                <CardContent className="p-2">
                  {tableOfContents.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200"
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
