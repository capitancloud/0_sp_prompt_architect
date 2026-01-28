import { motion } from "framer-motion";
import { TechnologySuggestion } from "@/types/analysis";
import { Lightbulb, ArrowRight, Users, Database, Shield, Globe, Server, Palette } from "lucide-react";

interface SimplifiedArchitectureFromStackProps {
  technologies: TechnologySuggestion[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend": <Globe className="w-6 h-6" />,
  "Styling": <Palette className="w-6 h-6" />,
  "Backend": <Server className="w-6 h-6" />,
  "Database": <Database className="w-6 h-6" />,
  "Autenticazione": <Shield className="w-6 h-6" />,
  "Hosting": <Globe className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  "Frontend": "from-cyan-500 to-blue-500",
  "Styling": "from-pink-500 to-rose-500",
  "Backend": "from-violet-500 to-purple-500",
  "Database": "from-amber-500 to-orange-500",
  "Autenticazione": "from-emerald-500 to-green-500",
  "Hosting": "from-indigo-500 to-blue-500",
};

const categoryDescriptions: Record<string, (tech: string) => string> = {
  "Frontend": (tech) => `Quando un utente visita la tua app, ${tech} costruisce la pagina che vede. È come il "volto" della tua app: bottoni, form, immagini, tutto ciò che puoi toccare.`,
  "Styling": (tech) => `${tech} definisce l'aspetto visivo dell'app: colori, spaziature, animazioni. È come il "vestito" che rende la tua app bella e professionale.`,
  "Backend": (tech) => `Quando serve fare qualcosa di "serio" (salvare dati, calcoli complessi), ${tech} entra in azione. È il "cervello" nascosto che fa funzionare tutto.`,
  "Database": (tech) => `Tutti i dati (utenti, post, ordini) vengono salvati in ${tech}. È come un archivio super organizzato che ricorda tutto.`,
  "Autenticazione": (tech) => `Quando l'utente fa login, ${tech} controlla chi è. È come il buttafuori di un locale: verifica che tu sia chi dici di essere.`,
  "Hosting": (tech) => `${tech} è dove la tua app "vive" su internet. È come l'indirizzo di casa della tua applicazione, accessibile a tutti.`,
};

export function SimplifiedArchitectureFromStack({ technologies }: SimplifiedArchitectureFromStackProps) {
  // Build story steps from technologies
  const storySteps: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    technology?: string;
    color: string;
  }> = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "L'utente arriva",
      description: "Quando un utente visita la tua app, il suo browser fa una richiesta al server.",
      color: "from-blue-500 to-cyan-500"
    },
    ...technologies.map(tech => ({
      icon: categoryIcons[tech.category] || <Globe className="w-6 h-6" />,
      title: `${tech.category}: ${tech.primary.name}`,
      description: categoryDescriptions[tech.category]?.(tech.primary.name) || tech.primary.reason,
      technology: tech.primary.name,
      color: categoryColors[tech.category] || "from-primary to-primary-glow"
    }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold gradient-text">Architettura Spiegata Semplice</h2>
          <p className="text-sm text-muted-foreground">Come funziona la tua app, spiegato come a un amico</p>
        </div>
      </div>

      {/* Story Flow */}
      <div className="space-y-4">
        {storySteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-start gap-4">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                {index < storySteps.length - 1 && (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-border to-transparent mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  {step.technology && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-mono">
                      {step.technology}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
      >
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-primary" />
          In sintesi
        </h4>
        <p className="text-sm text-muted-foreground">
          Pensa alla tua app come a un ristorante: il <strong className="text-foreground">Frontend</strong> è la sala dove i clienti mangiano, 
          lo <strong className="text-foreground">Styling</strong> è l'arredamento che rende tutto accogliente,
          il <strong className="text-foreground">Backend</strong> è la cucina dove si preparano i piatti, 
          il <strong className="text-foreground">Database</strong> è la dispensa che conserva gli ingredienti, 
          l'<strong className="text-foreground">Autenticazione</strong> è il maître che controlla le prenotazioni,
          e l'<strong className="text-foreground">Hosting</strong> è l'edificio stesso dove tutto avviene.
        </p>
      </motion.div>
    </motion.div>
  );
}
