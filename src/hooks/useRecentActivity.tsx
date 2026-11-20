import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const KEY = "sentinelai.recent-activity";
const MAX = 8;

export interface RecentItem {
  label: string;
  to: string;
  category: string;
  at: number;
}

interface RecentActivityValue {
  items: RecentItem[];
  track: (item: Omit<RecentItem, "at">) => void;
  clear: () => void;
}

const RecentActivityContext = createContext<RecentActivityValue | null>(null);

export function RecentActivityProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as RecentItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  const track = useCallback((item: Omit<RecentItem, "at">) => {
    setItems((prev) => {
      const next = [
        { ...item, at: Date.now() },
        ...prev.filter((p) => !(p.to === item.to && p.label === item.label)),
      ].slice(0, MAX);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ items, track, clear }), [items, track, clear]);

  return (
    <RecentActivityContext.Provider value={value}>
      {children}
    </RecentActivityContext.Provider>
  );
}

export function useRecentActivity() {
  const ctx = useContext(RecentActivityContext);
  if (!ctx)
    throw new Error("useRecentActivity must be used within RecentActivityProvider");
  return ctx;
}