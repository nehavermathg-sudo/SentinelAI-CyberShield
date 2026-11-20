import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { DUMMY_OTP } from "@/auth/AuthContext";

export function MfaModal({
  open,
  onOpenChange,
  onVerified,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const reset = () => {
    setCode("");
    setError(false);
    setChecking(false);
  };

  const handleContinue = () => {
    if (code.length !== 6 || checking) return;
    setChecking(true);
    window.setTimeout(() => {
      if (code === DUMMY_OTP) {
        onVerified();
      } else {
        setError(true);
        setChecking(false);
        setCode("");
      }
    }, 700);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="glass max-w-sm rounded-3xl">
        <DialogHeader className="items-center text-center">
          <span className="mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-cyber-cyan/10 text-cyber-cyan">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <DialogTitle>Security Verification</DialogTitle>
          <DialogDescription>
            Enter the 6-digit verification code sent to your registered
            authenticator.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-2">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(v) => {
              setCode(v);
              setError(false);
            }}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="h-11 w-11" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-xs font-medium text-danger">
              Invalid Verification Code
            </p>
          )}
        </div>

        <Button
          onClick={handleContinue}
          disabled={code.length !== 6 || checking}
          className="h-11 w-full rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan font-semibold text-[#04121a] disabled:opacity-50"
        >
          {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
