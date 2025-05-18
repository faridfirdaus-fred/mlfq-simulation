"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TableOfContentsProps {
  items: {
    title: string;
    href: string;
  }[];
}

interface DocumentationProps {
  children: React.ReactNode;
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] py-6 pr-6">
      <div className="space-y-2">
        {items.map((item) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={item.href}
              className={cn(
                "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                pathname === item.href && "text-foreground font-medium"
              )}
            >
              {item.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};

const Documentation = ({ children }: DocumentationProps) => {
  const tableOfContents = [
    { title: "Getting Started", href: "/Documentation" },
    { title: "How to Use", href: "/Documentation/how-to-use" },
    { title: "Tools & Technologies", href: "/Documentation/tools" },
    { title: "How It Works", href: "/Documentation/how-it-works" },
    { title: "Contact & Support", href: "/Documentation/contact" },
  ];

  return (
    <div className="container flex gap-6  py-6">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20">
          <TableOfContents items={tableOfContents} />
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Documentation;
