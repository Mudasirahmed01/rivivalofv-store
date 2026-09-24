import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] mb-4 md:mb-6 overflow-x-auto">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 shrink-0">
          {index > 0 && <ChevronRight size={12} className="text-[#6E6E73]" />}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-[#111] transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-[#111] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
