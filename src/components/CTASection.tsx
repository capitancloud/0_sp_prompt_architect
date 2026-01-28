import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[250px] md:h-[400px] bg-gradient-radial from-primary/10 to-transparent" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="glass-card-elevated p-6 md:p-12 text-center gradient-border">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Inizia oggi</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Pronto a scrivere
            <br />
            <span className="gradient-text">prompt perfetti?</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto px-2">
            Iscriviti gratuitamente e ottieni la tua prima analisi completa. Nessuna carta di credito richiesta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="glow" size="lg" className="gap-2 w-full sm:w-auto">
                Inizia gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-xs md:text-sm text-muted-foreground mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>✓ 1 analisi gratuita</span>
            <span>✓ Nessun impegno</span>
            <span>✓ Setup in 30 secondi</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
