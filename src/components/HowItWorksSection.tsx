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
    <section className="py-24 px-4 relative bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Come funziona</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Da idea a specifica tecnica
            <br />
            <span className="gradient-text">in 4 semplici passi</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number.replace('0', '')}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
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
