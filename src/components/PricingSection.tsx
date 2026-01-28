import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Trial",
    price: "Gratis",
    period: "",
    description: "Prova il servizio con una analisi gratuita",
    icon: Sparkles,
    features: [
      "1 analisi gratuita",
      "Punteggio multi-dimensionale",
      "Analisi SWOT base",
      "Tech stack suggerito",
      "Download prompt ottimizzato"
    ],
    cta: "Inizia gratis",
    popular: false,
    gradient: "from-muted to-muted"
  },
  {
    name: "Pro",
    price: "€9,90",
    period: "/mese",
    description: "Analisi illimitate per professionisti",
    icon: Crown,
    features: [
      "Ricerche illimitate",
      "Punteggio multi-dimensionale",
      "Analisi SWOT completa",
      "Tech stack dettagliato",
      "Architettura avanzata",
      "Best practices complete",
      "Download prompt ottimizzato",
      "Roadmap implementativa",
      "Supporto prioritario"
    ],
    cta: "Abbonati ora",
    popular: true,
    gradient: "from-primary to-primary-glow"
  }
];

export function PricingSection() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Prezzi</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Inizia gratis,
            <br />
            <span className="gradient-text">scala quando vuoi</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Iscriviti per ottenere la tua prima analisi completamente gratuita. Passa al piano Pro per ricerche illimitate.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'glass-card-elevated gradient-border' 
                  : 'glass-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Più popolare
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/auth" className="block">
                <Button 
                  variant={plan.popular ? "glow" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Nessun vincolo. Cancella quando vuoi. Pagamenti sicuri con Stripe.
        </motion.p>
      </div>
    </section>
  );
}
