import { useNavigate } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/auth/AuthContext";

export function SessionExpiredModal({
  open,
  onContinue,
}: {
  open: boolean;
  onContinue: () => void;
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-danger/10 text-danger">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center">Your secure session has expired</DialogTitle>
          <DialogDescription className="text-center">
            For your protection, this SOC session timed out due to inactivity. Continue
            your session or sign in again to keep working.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate({ to: "/", replace: true });
            }}
          >
            Login Again
          </Button>
          <Button onClick={onContinue}>Continue Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}