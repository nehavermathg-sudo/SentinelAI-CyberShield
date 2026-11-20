import { Moon, Menu, Command } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { GlobalSearch } from "@/components/nav/GlobalSearch";
import { NotificationCenter } from "@/components/nav/NotificationCenter";

export function TopNavbar({ onMobileMenu }: { onMobileMenu: () => void }) {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onMobileMenu}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <GlobalSearch className="hidden max-w-md flex-1 sm:block" />

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden items-center gap-1 rounded-lg border border-border bg-card/60 px-2 py-1.5 text-[11px] font-medium text-muted-foreground lg:inline-flex">
          <Command className="h-3 w-3" />K
        </span>
        <span className="hidden rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground xl:inline">
          {today}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          aria-label="Dark theme"
        >
          <Moon className="h-[18px] w-[18px]" />
        </Button>
        <NotificationCenter />
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-gradient-to-br from-cyber-blue to-cyber-cyan text-xs font-bold text-[#04121a]">
            {user?.initials ?? "AN"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}