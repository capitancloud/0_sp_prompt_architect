import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessGate } from "@/hooks/useAccessGate";
import superProgrammatoreLogo from "@/assets/super-programmatore-logo.png";

export function AccessCodeEntry() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { verifyAccessCode } = useAccessGate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!code.trim()) {
      setError("Inserisci il codice di accesso");
      return;
    }

    setLoading(true);
    
    try {
      const isValid = await verifyAccessCode(code);
      
      if (!isValid) {
        setError("Codice di accesso non valido");
        setCode("");
      }
    } catch {
      setError("Errore durante la verifica");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card-elevated p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={superProgrammatoreLogo} 
              alt="Super Programmatore" 
              className="w-48 h-auto md:w-56"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Accesso Riservato
            </h1>
            <p className="text-muted-foreground mt-2">
              Inserisci il codice di accesso per continuare
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode">Codice di Accesso</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="accessCode"
                  type="password"
                  placeholder="Inserisci il codice..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10 font-mono"
                  autoComplete="off"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              variant="glow"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifica in corso...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Accedi
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Contatta l'amministratore per ottenere il codice di accesso
          </p>
        </div>
      </motion.div>
    </div>
  );
}
