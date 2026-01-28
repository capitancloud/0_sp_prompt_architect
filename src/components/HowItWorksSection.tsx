import { motion } from "framer-motion";
import { FileText, Cpu, BarChart3, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Inserisci il tuo prompt",
    description: "Descrivi la web app che vuoi realizzare. Includi obiettivi, funzionalità, target utenti e vincoli tecnici."
  },
  {
    number: "02",
    icon: Cpu,
    title: "Analisi AI avanzata",
    description: "Il nostro sistema analizza il prompt su 5 dimensioni chiave, identifica punti di forza e debolezze."
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Report dettagliato",
    description: "Ricevi punteggi, suggerimenti architetturali, tech stack consigliato e best practices."
  },
  {
    number: "04",
    icon: Download,
    title: "Prompt ottimizzato",
    description: "Scarica la versione migliorata del tuo prompt, pronta per essere usata con qualsiasi AI."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-4 relative bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Come funziona</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
            Da idea a specifica tecnica
            <br />
            <span className="gradient-text">in 4 semplici passi</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-primary/50 to-primary/10" />
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                </div>
              )}
              
              <div className="text-center">
                <div className="relative inline-block mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto">
                    <step.icon className="w-7 h-7 md:w-10 md:h-10 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold flex items-center justify-center">
                    {step.number.replace('0', '')}
                  </span>
                </div>
                
                <h3 className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed hidden sm:block">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
