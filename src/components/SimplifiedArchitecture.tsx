import { motion } from "framer-motion";
import { ArchitectureComponent } from "@/types/analysis";
import { Lightbulb, ArrowRight, Users, Database, Shield, Globe, Server, Zap } from "lucide-react";

interface SimplifiedArchitectureProps {
  components: ArchitectureComponent[];
}

const layerIcons: Record<string, React.ReactNode> = {
  "Frontend": <Globe className="w-5 h-5" />,
  "Backend": <Server className="w-5 h-5" />,
  "Database": <Database className="w-5 h-5" />,
  "Auth": <Shield className="w-5 h-5" />,
  "API": <Zap className="w-5 h-5" />,
};

export function SimplifiedArchitecture({ components }: SimplifiedArchitectureProps) {
  // Group components by their general category
  const getSimplifiedExplanation = () => {
    const frontend = components.find(c => c.name.toLowerCase().includes('frontend') || c.name.toLowerCase().includes('next') || c.name.toLowerCase().includes('react'));
    const backend = components.find(c => c.name.toLowerCase().includes('backend') || c.name.toLowerCase().includes('api') || c.name.toLowerCase().includes('server') || c.name.toLowerCase().includes('edge'));
    const database = components.find(c => c.name.toLowerCase().includes('database') || c.name.toLowerCase().includes('db') || c.name.toLowerCase().includes('postgres') || c.name.toLowerCase().includes('supabase'));
    const auth = components.find(c => c.name.toLowerCase().includes('auth') || c.name.toLowerCase().includes('identity') || c.name.toLowerCase().includes('login'));

    return { frontend, backend, database, auth };
  };

  const { frontend, backend, database, auth } = getSimplifiedExplanation();

  const storySteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "L'utente arriva",
      description: "Quando un utente visita la tua app, il suo browser fa una richiesta al server.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: layerIcons["Frontend"] || <Globe className="w-6 h-6" />,
      title: frontend ? `${frontend.name} risponde` : "Il Frontend risponde",
      description: frontend 
        ? `${frontend.technology} costruisce la pagina che l'utente vede. È come il "volto" della tua app: bottoni, form, immagini, tutto ciò che puoi toccare.`
        : "Il frontend costruisce la pagina che l'utente vede. È come il 'volto' della tua app.",
      technology: frontend?.technology,
      color: "from-primary to-primary-glow"
    },
    {
      icon: layerIcons["Auth"] || <Shield className="w-6 h-6" />,
      title: auth ? `${auth.name} verifica l'identità` : "Autenticazione",
      description: auth 
        ? `Quando l'utente fa login, ${auth.technology} controlla chi è. È come il buttafuori di un locale: verifica che tu sia chi dici di essere.`
        : "L'autenticazione verifica l'identità dell'utente, come un buttafuori che controlla i documenti.",
      technology: auth?.technology,
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: layerIcons["Backend"] || <Server className="w-6 h-6" />,
      title: backend ? `${backend.name} elabora` : "Il Backend lavora",
      description: backend 
        ? `Quando serve fare qualcosa di "serio" (salvare dati, calcoli complessi), ${backend.technology} entra in azione. È il "cervello" nascosto che fa funzionare tutto.`
        : "Il backend è il cervello nascosto che elabora i dati e gestisce la logica dell'applicazione.",
      technology: backend?.technology,
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: layerIcons["Database"] || <Database className="w-6 h-6" />,
      title: database ? `${database.name} memorizza` : "Il Database conserva",
      description: database 
        ? `Tutti i dati (utenti, post, ordini) vengono salvati in ${database.technology}. È come un archivio super organizzato che ricorda tutto.`
        : "Il database è l'archivio che conserva tutti i dati della tua applicazione.",
      technology: database?.technology,
      color: "from-amber-500 to-orange-500"
    }
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
          il <strong className="text-foreground">Backend</strong> è la cucina dove si preparano i piatti, 
          il <strong className="text-foreground">Database</strong> è la dispensa che conserva gli ingredienti, 
          e l'<strong className="text-foreground">Autenticazione</strong> è il maître che controlla le prenotazioni.
        </p>
      </motion.div>
    </motion.div>
  );
}
