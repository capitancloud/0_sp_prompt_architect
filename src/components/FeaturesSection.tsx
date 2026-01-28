import { motion } from "framer-motion";
import { 
  BarChart3, 
  Brain, 
  Code2, 
  Layers, 
  Shield, 
  Sparkles, 
  Target, 
  Zap,
  FileText,
  Download,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Punteggio Multi-Dimensionale",
    description: "Analisi su 5 dimensioni chiave: chiarezza, completezza, fattibilità, scalabilità e manutenibilità con score da 0 a 100.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Brain,
    title: "Analisi SWOT Intelligente",
    description: "Identificazione automatica di punti di forza, debolezze e assunzioni implicite nel tuo prompt.",
    gradient: "from-success to-primary"
  },
  {
    icon: Layers,
    title: "Tech Stack Suggerito",
    description: "Raccomandazioni personalizzate su frontend, backend, database e servizi cloud ottimali per il tuo progetto.",
    gradient: "from-primary-glow to-accent"
  },
  {
    icon: Code2,
    title: "Architettura Dettagliata",
    description: "Diagrammi architetturali con spiegazioni semplificate anche per chi è alle prime armi.",
    gradient: "from-warning to-primary"
  },
  {
    icon: Target,
    title: "Best Practices",
    description: "Suggerimenti su sicurezza, performance, testing e documentazione basati sugli standard di settore.",
    gradient: "from-destructive to-warning"
  },
  {
    icon: FileText,
    title: "Prompt Ottimizzato",
    description: "Versione migliorata e strutturata del tuo prompt, scaricabile in formato Markdown.",
    gradient: "from-primary to-success"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Funzionalità</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
            Tutto ciò di cui hai bisogno per
            <br />
            <span className="gradient-text">prompt perfetti</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Un'analisi completa e professionale che trasforma le tue idee in specifiche tecniche pronte per essere sviluppate.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="glass-card p-5 md:p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
