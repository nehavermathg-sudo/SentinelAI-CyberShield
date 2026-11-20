import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "sentinelai.session";
const TRUST_KEY = "sentinelai.trusted-device";

const VALID_EMAIL = "admin@sentinelai.ai";
const VALID_PASSWORD = "Sentinel@2026";

export interface AuthUser {
  name: string;
  role: string;
  email: string;
  initials: string;
}

const ADMIN_USER: AuthUser = {
  name: "Admin Name",
  role: "SOC Administrator",
  email: VALID_EMAIL,
  initials: "AN",
};

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** true until the persisted session has been read on the client */
  isReady: boolean;
  /** validate credentials without establishing a session (pre-MFA) */
  verifyCredentials: (email: string, password: string) => boolean;
  /** persist the session after MFA succeeds */
  establishSession: (remember: boolean, trustDevice: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isReady,
      verifyCredentials: (email, password) =>
        email.trim().toLowerCase() === VALID_EMAIL &&
        password === VALID_PASSWORD,
      establishSession: (remember, trustDevice) => {
        const store = remember ? window.localStorage : window.sessionStorage;
        const other = remember ? window.sessionStorage : window.localStorage;
        store.setItem(STORAGE_KEY, JSON.stringify(ADMIN_USER));
        other.removeItem(STORAGE_KEY);
        if (trustDevice) {
          const until = Date.now() + 30 * 24 * 60 * 60 * 1000;
          window.localStorage.setItem(TRUST_KEY, String(until));
        }
        setUser(ADMIN_USER);
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        window.sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export const DUMMY_OTP = "123456";
