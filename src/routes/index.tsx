import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  ShieldCheck,
  Radar,
  BrainCircuit,
  Activity,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/auth/AuthContext";
import { SecurityBanner } from "@/components/auth/SecurityBanner";
import { SecurityNotice } from "@/components/auth/SecurityNotice";
import { LastLoginCard } from "@/components/auth/LastLoginCard";
import { SystemStatusCards } from "@/components/auth/SystemStatusCards";
import { LiveSecurityFeed } from "@/components/auth/LiveSecurityFeed";
import { ComplianceBadges } from "@/components/auth/ComplianceBadges";
import { MfaModal } from "@/components/auth/MfaModal";
import { AuthLoadingOverlay } from "@/components/auth/AuthLoadingOverlay";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

const features = [
  { icon: BrainCircuit, label: "AI Risk Detection" },
  { icon: ShieldCheck, label: "Cyber Intelligence" },
  { icon: Activity, label: "Real-time Monitoring" },
  { icon: Radar, label: "Explainable AI" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signInStages = [
  "Authenticating...",
  "Verifying Identity...",
  "Loading Security Workspace...",
];

function LoginPage() {
  const navigate = useNavigate();
  const { verifyCredentials, establishSession, isAuthenticated, isReady } =
    useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const [stage, setStage] = useState(-1); // -1 idle, 0..2 signing in
  const [shake, setShake] = useState(false);
  const [mfaOpen, setMfaOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timers = useRef<number[]>([]);

  const loading = stage >= 0;

  // Auto-login: skip login page if a valid session exists.
  useEffect(() => {
    if (isReady && isAuthenticated && !showOverlay) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isReady, isAuthenticated, navigate, showOverlay]);

  useEffect(
    () => () => timers.current.forEach((t) => window.clearTimeout(t)),
    [],
  );

  const emailValid = emailRegex.test(email.trim());
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid || loading) return;

    // Cycle through sign-in stages, 600ms each.
    signInStages.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStage(i), i * 600));
    });

    timers.current.push(
      window.setTimeout(() => {
        setStage(-1);
        if (verifyCredentials(email, password)) {
          setMfaOpen(true);
        } else {
          setShake(true);
          window.setTimeout(() => setShake(false), 500);
          toast.error("Invalid credentials.", {
            description: "Please check your email or password.",
          });
        }
      }, signInStages.length * 600),
    );
  }

  function handleMfaVerified() {
    setMfaOpen(false);
    establishSession(remember, trustDevice);
    setShowOverlay(true);
  }

  if (showOverlay) {
    return (
      <AuthLoadingOverlay
        onDone={() => navigate({ to: "/dashboard", replace: true })}
      />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* premium background: subtle grid + radial glows */}
      <div className="cyber-grid animate-grid-pan pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyber-blue/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyber-cyan/15 blur-[140px]" />

      <div className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[45%_55%] lg:gap-8">
          {/* Left — branding (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <Logo className="h-14 w-14 animate-pulse-ring" />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Sentinel<span className="text-gradient">AI</span>
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                  AI-Powered Banking Cyber Intelligence Platform
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Monitor banking cyber threats, detect fraud in real time and
              protect customer transactions using artificial intelligence.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-semibold tracking-wide text-cyber-cyan">
              Predict • Correlate • Explain • Protect
            </div>

            <div className="mt-6 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <LiveSecurityFeed />
            </div>

            <div className="mt-6">
              <SystemStatusCards />
            </div>

            <div className="mt-6">
              <ComplianceBadges />
            </div>
          </motion.div>

          {/* Right — login card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:justify-self-end"
          >
            {/* mobile brand header */}
            <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
              <Logo className="h-11 w-11 animate-pulse-ring" />
              <h1 className="text-2xl font-extrabold tracking-tight">
                Sentinel<span className="text-gradient">AI</span>
              </h1>
            </div>

            <div className="mx-auto w-full max-w-md">
              <SecurityBanner />

              <motion.div
                animate={
                  shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }
                }
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-6 shadow-[var(--shadow-premium)] sm:p-8"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyber-cyan">
                  Bank Security Operations Center
                </p>
                <h2 className="mt-1.5 text-xl font-bold tracking-tight">
                  Welcome back
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Access the SentinelAI Cyber Intelligence Platform to monitor
                  fraud, investigate cyber incidents and protect banking
                  infrastructure.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <fieldset disabled={loading} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@sentinelai.ai"
                        className="h-11 rounded-xl bg-card/60 transition-shadow focus-visible:shadow-[var(--shadow-glow)]"
                      />
                      {email.length > 0 && !emailValid && (
                        <p className="text-xs text-danger">
                          Enter a valid email address.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-11 rounded-xl bg-card/60 transition-shadow focus-visible:shadow-[var(--shadow-glow)]"
                      />
                      {password.length > 0 && !passwordValid && (
                        <p className="text-xs text-danger">
                          Password must be at least 8 characters.
                        </p>
                      )}
                    </div>

                    <SecurityNotice />

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Checkbox
                            id="remember"
                            checked={remember}
                            onCheckedChange={(v) => setRemember(v === true)}
                          />{" "}
                          Remember me
                        </label>
                        <button
                          type="button"
                          className="text-sm font-medium text-cyber-cyan hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Checkbox
                          id="trust"
                          checked={trustDevice}
                          onCheckedChange={(v) => setTrustDevice(v === true)}
                        />{" "}
                        Trust this device for 30 days
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!formValid || loading}
                      className="group h-11 w-full rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan font-semibold text-[#04121a] shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] hover:opacity-95 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {signInStages[stage]}
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </fieldset>
                </form>

                <LastLoginCard />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer pinned to bottom */}
      <footer className="relative z-10 border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 SentinelAI • Enterprise Banking Security
      </footer>

      <MfaModal
        open={mfaOpen}
        onOpenChange={setMfaOpen}
        onVerified={handleMfaVerified}
      />
    </div>
  );
}
