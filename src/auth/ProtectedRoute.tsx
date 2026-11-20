import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "./AuthContext";
import { Logo } from "@/components/brand/Logo";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({ to: "/", replace: true });
    }
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Logo className="h-12 w-12 animate-pulse-ring" />
      </div>
    );
  }

  return <>{children}</>;
}
