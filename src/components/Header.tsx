import { motion } from "framer-motion";
import { Zap, Code2, Sparkles, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-6 md:py-8 px-4"
    >
      {/* Auth buttons - top right */}
      <div className="absolute top-3 md:top-4 right-3 md:right-4 z-20">
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <span className="hidden sm:flex text-xs md:text-sm text-muted-foreground items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="truncate max-w-[120px] md:max-w-none">{user.email}</span>
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="gap-1.5 md:gap-2 text-xs md:text-sm h-8 md:h-9"
                >
                  <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Esci</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="glow" size="sm" className="gap-1.5 md:gap-2 text-xs md:text-sm h-8 md:h-9">
                  <LogIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Accedi
                </Button>
              </Link>
            )}
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto text-center pt-8 md:pt-0">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          <span className="text-xs md:text-sm font-medium text-primary">Prompt Engineering Analyzer</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 px-2"
        >
          Analizza il tuo prompt
          <br />
          <span className="gradient-text">come un Senior Engineer</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4"
        >
          Ottieni valutazioni professionali, suggerimenti architetturali e best practice per trasformare le tue idee in specifiche tecniche di qualità.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Analisi multi-dimensionale</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Architettura suggerita</span>
          </div>
        </motion.div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </motion.header>
  );
}
