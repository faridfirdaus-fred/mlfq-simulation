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
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center">
          <Badge
            variant="outline"
            className="bg-background/50 px-3 py-1 text-sm font-medium"
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "text-muted-foreground/70",
                        isActive && "text-primary"
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></div>
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
      icon: <FaBook size={14} />,
    },
    {
      title: "How to Use",
      href: "/Documentation/how-to-use",
      icon: <FaLaptopCode size={14} />,
    },
    {
      title: "Tools & Technologies",
      href: "/Documentation/tools",
      icon: <FaTools size={14} />,
    },
    {
      title: "How It Works",
      href: "/Documentation/how-it-works",
      icon: <FaCode size={14} />,
    },
    {
      title: "Contact & Support",
      href: "/Documentation/contact",
      icon: <FaQuestionCircle size={14} />,
    },
  ];

  return (
    <div className="container py-8 lg:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents items={tableOfContents} />
          </div>
        </div>
        <main className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 hidden lg:block"></div>
          <div className="lg:pl-6">{children}</div>
          <div className="fixed bottom-6 right-6 lg:hidden">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary text-primary-foreground shadow-lg rounded-full p-2 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("mobile-menu")
                    ?.classList.toggle("hidden");
                }}
              >
                <FaBook size={16} />
              </motion.div>
              <div
                id="mobile-menu"
                className="hidden absolute bottom-12 right-0 w-64 bg-card border rounded-lg shadow-xl"
              >
                <CardContent className="p-2">
                  {tableOfContents.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
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
