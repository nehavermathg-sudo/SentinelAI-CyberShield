import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navItems } from "@/lib/nav";
import { searchAll } from "@/lib/search-index";
import { useRecentActivity } from "@/hooks/useRecentActivity";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { items, track } = useRecentActivity();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string, label: string, category: string) => {
    track({ to, label, category });
    navigate({ to });
    setOpen(false);
    setQuery("");
  };

  const results = searchAll(query);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search pages, transactions, incidents, customers…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {!query && items.length > 0 && (
          <>
            <CommandGroup heading="Recent searches">
              {items.slice(0, 5).map((r) => (
                <CommandItem
                  key={`${r.to}-${r.label}`}
                  value={`recent ${r.label}`}
                  onSelect={() => go(r.to, r.label, r.category)}
                >
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{r.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{r.category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Pages">
          {navItems.map((item) => (
            <CommandItem
              key={item.to}
              value={`page ${item.title}`}
              onSelect={() => go(item.to, item.title, "Page")}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {results.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Records">
              {results.map((r) => (
                <CommandItem
                  key={`${r.category}-${r.id}`}
                  value={`${r.label} ${r.sublabel}`}
                  onSelect={() => go(r.to, r.label, r.category)}
                >
                  <r.icon className="mr-2 h-4 w-4" />
                  <span>{r.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{r.category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}