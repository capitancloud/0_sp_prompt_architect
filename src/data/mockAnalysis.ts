import { AnalysisResult } from "@/types/analysis";

export const mockAnalysisResult: AnalysisResult = {
  overallScore: 68,
  dimensions: [
    {
      id: "clarity",
      name: "Chiarezza dell'Obiettivo",
      score: 7,
      maxScore: 10,
      reasoning: "L'obiettivo generale è comprensibile, ma mancano dettagli specifici sul flusso utente e sui risultati attesi. Non è chiaro come l'utente interagirà con il sistema in ogni fase.",
      missing: [
        "User journey dettagliato",
        "Definizione degli output attesi",
        "Criteri di successo misurabili"
      ],
      improvements: [
        "Aggiungi: 'L'utente deve poter vedere un dashboard con il riepilogo delle analisi precedenti'",
        "Specifica: 'Il report finale deve essere esportabile in PDF'"
      ],
      icon: "🎯"
    },
    {
      id: "completeness",
      name: "Completezza Funzionale",
      score: 6,
      maxScore: 10,
      reasoning: "Le funzionalità principali sono elencate, ma mancano dettagli su casi edge, gestione errori e flussi secondari importanti per un'implementazione robusta.",
      missing: [
        "Gestione degli errori",
        "Stati di caricamento",
        "Validazione input",
        "Feedback utente"
      ],
      improvements: [
        "Definisci cosa succede se l'AI non riesce ad analizzare il prompt",
        "Specifica limiti di lunghezza del prompt",
        "Aggiungi requisiti per accessibilità"
      ],
      icon: "📋"
    },
    {
      id: "target",
      name: "Definizione Target Utente",
      score: 5,
      maxScore: 10,
      reasoning: "Il target utente è implicito (sviluppatori/prompt engineers) ma non esplicitamente definito. Mancano informazioni su livello di esperienza e contesto d'uso.",
      missing: [
        "Persona utente definita",
        "Livello di expertise tecnica",
        "Contesto d'uso (lavoro, hobby, educazione)"
      ],
      improvements: [
        "Specifica: 'Target: sviluppatori junior-mid level che usano AI per generare codice'",
        "Aggiungi: 'L'utente potrebbe non avere esperienza in architettura software'"
      ],
      icon: "👥"
    },
    {
      id: "technical",
      name: "Vincoli Tecnici",
      score: 4,
      maxScore: 10,
      reasoning: "Non sono specificati vincoli tecnici come browser supportati, requisiti di performance, limiti API o dipendenze esterne.",
      missing: [
        "Browser/device supportati",
        "Requisiti di latenza",
        "Limiti di rate API",
        "Dipendenze esterne"
      ],
      improvements: [
        "Aggiungi: 'L'analisi deve completarsi in meno di 30 secondi'",
        "Specifica: 'Deve funzionare su mobile con connessioni lente'"
      ],
      icon: "⚙️"
    },
    {
      id: "scalability",
      name: "Considerazioni Scalabilità",
      score: 3,
      maxScore: 10,
      reasoning: "Non ci sono considerazioni su volume di utenti, caching, o strategie per gestire carichi elevati.",
      missing: [
        "Volume utenti previsto",
        "Strategia di caching",
        "Limiti di concorrenza"
      ],
      improvements: [
        "Specifica: 'L'app deve supportare 1000 utenti concorrenti'",
        "Considera: 'Le analisi frequenti devono essere cachate'"
      ],
      icon: "📈"
    },
    {
      id: "security",
      name: "Considerazioni Sicurezza",
      score: 4,
      maxScore: 10,
      reasoning: "Mancano considerazioni sulla protezione dei dati utente, validazione input e gestione di contenuti potenzialmente malevoli.",
      missing: [
        "Sanitizzazione input",
        "Protezione dati sensibili",
        "Rate limiting"
      ],
      improvements: [
        "Aggiungi: 'I prompt non devono essere salvati senza consenso'",
        "Specifica: 'Implementare rate limiting per prevenire abusi'"
      ],
      icon: "🔒"
    },
    {
      id: "maintainability",
      name: "Manutenibilità",
      score: 6,
      maxScore: 10,
      reasoning: "La struttura modulare è implicita ma non ci sono indicazioni su logging, monitoring o strategie di aggiornamento.",
      missing: [
        "Strategia di logging",
        "Monitoring e alerting",
        "Processo di aggiornamento"
      ],
      improvements: [
        "Aggiungi: 'Ogni analisi deve essere loggata per debug'",
        "Considera: 'I criteri di valutazione devono essere facilmente aggiornabili'"
      ],
      icon: "🔧"
    },
    {
      id: "architecture",
      name: "Consapevolezza Architetturale",
      score: 7,
      maxScore: 10,
      reasoning: "La richiesta di visualizzazione architetturale mostra consapevolezza, ma mancano dettagli su patterns specifici e integrazioni.",
      missing: [
        "Patterns architetturali preferiti",
        "Strategia di state management",
        "Approccio API design"
      ],
      improvements: [
        "Specifica: 'Preferire architettura a microservizi per componenti AI'",
        "Aggiungi: 'Usare WebSocket per aggiornamenti real-time'"
      ],
      icon: "🏗️"
    }
  ],
  strengthsWeaknesses: [
    {
      id: "s1",
      type: "strength",
      title: "Visione chiara del prodotto",
      description: "L'idea di un analizzatore di prompt con feedback strutturato è ben definita e risponde a un bisogno reale."
    },
    {
      id: "s2",
      type: "strength",
      title: "Attenzione all'UX",
      description: "La richiesta esplicita di elementi visivi, animazioni e feedback chiari dimostra attenzione all'esperienza utente."
    },
    {
      id: "s3",
      type: "strength",
      title: "Struttura modulare",
      description: "Le funzionalità sono organizzate in sezioni logiche che facilitano l'implementazione incrementale."
    },
    {
      id: "w1",
      type: "weakness",
      title: "Mancanza di prioritizzazione",
      description: "Non è chiaro quali funzionalità sono MVP e quali sono nice-to-have, rendendo difficile la pianificazione."
    },
    {
      id: "w2",
      type: "weakness",
      title: "Criteri di valutazione vaghi",
      description: "Non è specificato come calcolare i punteggi o quali criteri usare per valutare le diverse dimensioni."
    },
    {
      id: "w3",
      type: "weakness",
      title: "Nessun requisito non-funzionale",
      description: "Performance, accessibilità, internazionalizzazione non sono menzionati."
    },
    {
      id: "a1",
      type: "assumption",
      title: "Accesso a modelli AI potenti",
      description: "Si assume la disponibilità di un LLM capace di analisi sofisticate senza specificare quale."
    },
    {
      id: "a2",
      type: "assumption",
      title: "Utente tecnico",
      description: "Si assume che l'utente comprenda concetti come 'architettura software', 'RLS', 'microservizi'."
    },
    {
      id: "a3",
      type: "assumption",
      title: "Connessione stabile",
      description: "Non si considera l'uso offline o con connessione intermittente."
    }
  ],
  optimizedPrompt: `# Prompt Engineering Analyzer - Specifiche Tecniche

## Obiettivo
Sviluppare una web application che analizzi prompt descrittivi di web app, fornendo valutazioni ingegneristiche e suggerimenti di miglioramento. Target: sviluppatori junior-mid level che usano AI per generazione codice.

## Funzionalità Core (MVP)

### 1. Analisi Multi-Dimensionale
- Input: textarea per prompt (max 5000 caratteri)
- Valutazione su 8 dimensioni con score 1-10
- Per ogni dimensione: punteggio, spiegazione, elementi mancanti, esempi di miglioramento
- Visualizzazione: progress bar animate, badge colorati per severity

### 2. Strengths/Weaknesses Analysis
- Identificazione automatica di punti di forza (min 2)
- Identificazione di debolezze (min 2)
- Evidenziazione assunzioni implicite
- UI: cards con icone differenziate per tipo

### 3. Prompt Ottimizzato
- Riscrittura strutturata del prompt originale
- Sezioni: Obiettivo, Target, Requisiti Funzionali, Requisiti Non-Funzionali, Vincoli
- Funzionalità: copia con un click, confronto side-by-side con originale

### 4. Architettura Suggerita
- Stack tecnologico: Frontend, Backend, DB, Auth, Infra
- Per ogni scelta: motivazione, pro/contro, alternativa con use-case
- Diagramma interattivo con componenti cliccabili

## Requisiti Non-Funzionali
- Latenza analisi: < 15 secondi
- Mobile-responsive
- Accessibilità: WCAG 2.1 AA
- Browser: Chrome, Firefox, Safari (ultime 2 versioni)

## Vincoli Tecnici
- Frontend: React + TypeScript
- Styling: Tailwind CSS
- AI: Integrazione con LLM via API (rate limit: 10 req/min per utente)
- No persistenza dati sensibili senza consenso esplicito

## Gestione Errori
- Timeout AI: mostra messaggio + opzione retry
- Input invalido: validazione real-time con feedback
- Rate limit: countdown al prossimo tentativo

## Prima di implementare, chiedimi:
1. Quale LLM/API preferisci usare?
2. Serve autenticazione utente?
3. Vuoi salvare la cronologia delle analisi?
4. Ci sono preferenze di design system?`,
  technologies: [
    {
      category: "Frontend",
      primary: {
        name: "React + TypeScript + Vite",
        reason: "Stack moderno con ottimo DX, type safety, e hot reload veloce. Perfetto per UI interattive e componenti riutilizzabili.",
        pros: ["Type safety con TypeScript", "Ecosistema ricco", "Performance build con Vite", "Componenti riutilizzabili"],
        cons: ["Learning curve per TypeScript", "Boilerplate iniziale", "Bundle size può crescere"]
      },
      alternative: {
        name: "Next.js",
        reason: "Framework full-stack con SSR/SSG integrato",
        whenToUse: "Se servisse SEO, rendering server-side, o API routes integrate. Utile per landing page pubbliche o se l'app crescesse verso un prodotto SaaS."
      }
    },
    {
      category: "Styling",
      primary: {
        name: "Tailwind CSS + shadcn/ui",
        reason: "Utility-first CSS con componenti pre-costruiti e accessibili. Massima flessibilità con consistenza garantita.",
        pros: ["Sviluppo rapido", "Design system integrato", "Componenti accessibili", "Bundle ottimizzato"],
        cons: ["Classi verbose in HTML", "Learning curve iniziale", "Customizzazione profonda richiede pratica"]
      },
      alternative: {
        name: "Styled Components + Chakra UI",
        reason: "CSS-in-JS con componenti theming-first",
        whenToUse: "Se il team preferisce CSS-in-JS, o serve theming dinamico complesso con varianti runtime."
      }
    },
    {
      category: "Backend/AI",
      primary: {
        name: "Supabase Edge Functions + OpenAI/Anthropic",
        reason: "Serverless functions per chiamate AI sicure, senza gestire infrastruttura. API key protette lato server.",
        pros: ["Zero infra da gestire", "Scaling automatico", "Secrets management", "Low latency"],
        cons: ["Cold start occasionali", "Limiti di esecuzione", "Vendor lock-in parziale"]
      },
      alternative: {
        name: "Node.js/Express su Vercel",
        reason: "Backend tradizionale con più controllo",
        whenToUse: "Se servisse logica backend complessa, caching sofisticato, o integrazioni con servizi esterni multipli."
      }
    },
    {
      category: "Database",
      primary: {
        name: "Supabase PostgreSQL",
        reason: "Database relazionale con API real-time, auth integrata, e RLS per sicurezza. Perfetto per salvare analisi e cronologia.",
        pros: ["Real-time subscriptions", "Row Level Security", "Auth integrata", "Backup automatici"],
        cons: ["Complessità RLS", "Costi a scale", "Lock-in Supabase"]
      },
      alternative: {
        name: "PlanetScale (MySQL)",
        reason: "MySQL serverless con branching",
        whenToUse: "Se il team ha esperienza MySQL, o serve branching database per feature development parallelo."
      }
    },
    {
      category: "Autenticazione",
      primary: {
        name: "Supabase Auth",
        reason: "Auth integrata con social login, magic link, e gestione sessioni. Zero configurazione aggiuntiva.",
        pros: ["Setup immediato", "Social providers", "JWT automatici", "Integrato con RLS"],
        cons: ["Customizzazione UI limitata", "Dipendenza Supabase", "Email templates basic"]
      },
      alternative: {
        name: "Clerk",
        reason: "Auth moderna con UI componenti e user management",
        whenToUse: "Se serve UI auth personalizzabile, user management dashboard, o features enterprise come SSO."
      }
    }
  ],
  architecture: [
    {
      id: "client",
      name: "React Client",
      technology: "React + TypeScript",
      role: "Interfaccia utente interattiva",
      reason: "SPA reattiva per UX fluida senza reload",
      risks: ["SEO limitato", "JavaScript required"],
      position: { x: 200, y: 50 },
      connections: ["edge-functions"]
    },
    {
      id: "edge-functions",
      name: "Edge Functions",
      technology: "Supabase Edge",
      role: "API layer e orchestrazione AI",
      reason: "Protegge API keys e gestisce rate limiting",
      risks: ["Cold start", "Timeout 60s"],
      position: { x: 200, y: 180 },
      connections: ["ai-service", "database"]
    },
    {
      id: "ai-service",
      name: "AI Service",
      technology: "OpenAI/Anthropic",
      role: "Analisi prompt e generazione contenuti",
      reason: "LLM potenti per analisi sofisticate",
      risks: ["Costi variabili", "Latenza", "Rate limits"],
      position: { x: 400, y: 180 },
      connections: []
    },
    {
      id: "database",
      name: "PostgreSQL",
      technology: "Supabase DB",
      role: "Persistenza analisi e utenti",
      reason: "Relazionale con RLS per sicurezza",
      risks: ["Schema rigido", "Scaling verticale"],
      position: { x: 50, y: 180 },
      connections: ["storage"]
    },
    {
      id: "storage",
      name: "File Storage",
      technology: "Supabase Storage",
      role: "Export PDF e asset",
      reason: "Storage integrato con auth",
      risks: ["Limiti dimensione", "Bandwidth costs"],
      position: { x: 50, y: 300 },
      connections: []
    },
    {
      id: "auth",
      name: "Authentication",
      technology: "Supabase Auth",
      role: "Gestione utenti e sessioni",
      reason: "Auth zero-config con social login",
      risks: ["Customization limitata"],
      position: { x: 350, y: 300 },
      connections: ["database"]
    }
  ],
  vibeCodingPractices: [
    {
      id: "vp1",
      category: "Comunicazione",
      title: "Sii specifico e contestuale",
      description: "Fornisci sempre contesto sul progetto, stack tecnologico, e obiettivo specifico. L'AI non può leggere la tua mente.",
      examples: [
        "❌ 'Fammi un form'",
        "✅ 'Crea un form di login React con validazione email/password usando react-hook-form e zod, stile Tailwind minimal'"
      ]
    },
    {
      id: "vp2",
      category: "Iterazione",
      title: "Dividi e conquista",
      description: "Spezza task complessi in step piccoli e verificabili. Ogni prompt dovrebbe produrre un output testabile.",
      examples: [
        "Step 1: 'Crea il componente UI del form'",
        "Step 2: 'Aggiungi validazione con zod'",
        "Step 3: 'Integra con API di auth'"
      ]
    },
    {
      id: "vp3",
      category: "Validazione",
      title: "Verifica sempre il codice generato",
      description: "L'AI può generare codice funzionante ma non ottimale. Controlla security, performance, e edge cases.",
      examples: [
        "Controlla sanitizzazione input",
        "Verifica gestione errori",
        "Testa con dati edge case"
      ]
    },
    {
      id: "vp4",
      category: "Contesto",
      title: "Mantieni il contesto tra prompt",
      description: "Riferisci al codice precedente, usa nomi consistenti, e ricorda all'AI le decisioni prese.",
      examples: [
        "'Modifica il componente LoginForm che abbiamo creato prima per...'",
        "'Mantieni lo stesso stile del Header component'"
      ]
    },
    {
      id: "vp5",
      category: "Errori Comuni",
      title: "Evita prompt vaghi o troppo ambiziosi",
      description: "Prompt generici producono codice generico. Prompt troppo complessi confondono l'AI.",
      examples: [
        "❌ 'Crea un clone di Twitter'",
        "✅ 'Crea un componente Tweet card con avatar, testo, timestamp, e bottoni like/retweet'"
      ]
    }
  ],
  architecturePractices: [
    {
      id: "ap1",
      category: "Separazione Layer",
      title: "Separa UI, logica, e dati",
      description: "Mantieni componenti presentazionali puri, estrai logica in hooks custom, centralizza chiamate API.",
      examples: [
        "Componenti: solo rendering",
        "Hooks: useAnalysis(), useAuth()",
        "Services: api/analysis.ts"
      ],
      relatedIssues: ["Logica mista a UI nel prompt originale"]
    },
    {
      id: "ap2",
      category: "Gestione Errori",
      title: "Error boundaries e fallback",
      description: "Implementa error boundaries React, gestisci errori API con retry logic, mostra feedback utente chiaro.",
      examples: [
        "ErrorBoundary component wrapper",
        "try/catch con toast notifications",
        "Retry automatico con backoff"
      ],
      relatedIssues: ["Nessuna menzione di error handling"]
    },
    {
      id: "ap3",
      category: "Sicurezza",
      title: "Input validation e sanitization",
      description: "Valida input lato client E server, sanitizza output AI, implementa rate limiting.",
      examples: [
        "Zod schema per validazione",
        "DOMPurify per sanitizzare HTML",
        "Rate limit per IP/user"
      ],
      relatedIssues: ["Mancano requisiti di sicurezza"]
    },
    {
      id: "ap4",
      category: "Scalabilità",
      title: "Caching e ottimizzazione",
      description: "Cache analisi frequenti, lazy load componenti pesanti, ottimizza re-render React.",
      examples: [
        "React Query per caching API",
        "React.lazy() per code splitting",
        "useMemo/useCallback strategici"
      ],
      relatedIssues: ["Nessuna considerazione di performance"]
    },
    {
      id: "ap5",
      category: "Osservabilità",
      title: "Logging e monitoring",
      description: "Logga eventi significativi, traccia errori con Sentry, monitora performance con analytics.",
      examples: [
        "console.error per errori critici",
        "Sentry per crash reporting",
        "Analytics per user behavior"
      ],
      relatedIssues: ["Mancanza di requisiti di logging"]
    }
  ]
};
