import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-cyan shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-1/2 w-1/2 text-[#04121a]"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.5 4.5 5.5v5.2c0 4.5 3.1 8.4 7.5 9.8 4.4-1.4 7.5-5.3 7.5-9.8V5.5L12 2.5Z" />
        <path d="M9 12.2l2 2 4-4.4" />
      </svg>
    </span>
  );
}

export function WordMark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Logo className="h-9 w-9 shrink-0" />
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[15px] font-extrabold tracking-tight">
            Sentinel<span className="text-gradient">AI</span>
          </div>
          <div className="truncate text-[10px] font-medium text-muted-foreground">
            Cyber Intelligence
          </div>
        </div>
      )}
    </div>
  );
}