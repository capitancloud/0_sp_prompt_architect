

# Piano: Sincronizzazione Stack Tecnologico e Diagramma Architettura

## Problema Identificato

L'analisi AI genera due strutture dati separate che dovrebbero rappresentare la stessa architettura ma non sono vincolate a essere coerenti:

| Sezione | Array | Esempio output attuale |
|---------|-------|------------------------|
| Stack Tecnologico Suggerito | `technologies[]` | Frontend: Next.js |
| Diagramma Architettura | `architecture[]` | Frontend Layer: React + Vite |

L'AI non riceve istruzioni esplicite per mantenere questi due array sincronizzati, causando discrepanze confuse per l'utente.

---

## Soluzione Proposta

Modificheremo il **system prompt** della edge function per forzare la coerenza tra le due sezioni e aggiungeremo una validazione lato frontend.

### Fase 1: Aggiornamento System Prompt (Edge Function)

Modifiche al file `supabase/functions/analyze-prompt/index.ts`:

1. **Aggiungere regola esplicita di coerenza** nelle linee guida:
   ```
   REGOLA CRITICA DI COERENZA:
   - Le tecnologie nell'array "technologies" DEVONO corrispondere esattamente 
     alle tecnologie nell'array "architecture"
   - Per ogni categoria in "technologies" (Frontend, Backend, Database, Autenticazione), 
     il campo "primary.name" deve essere IDENTICO al campo "technology" del componente 
     corrispondente in "architecture"
   - Esempio: se technologies[Frontend].primary.name = "Next.js", 
     allora architecture[frontend-layer].technology = "Next.js"
   ```

2. **Specificare le mappature attese**:
   ```
   MAPPATURE OBBLIGATORIE:
   - technologies[Frontend] ↔ architecture[frontend] o [presentation-layer]
   - technologies[Backend] ↔ architecture[backend] o [api-layer]  
   - technologies[Database] ↔ architecture[database] o [data-layer]
   - technologies[Autenticazione] ↔ architecture[auth] o componente autenticazione
   ```

### Fase 2: Validazione Frontend (Opzionale ma consigliata)

Aggiungere una funzione di validazione in `src/services/analysisService.ts` che:

1. Dopo aver ricevuto la risposta dall'AI, verifichi la coerenza
2. Se trova discrepanze, le corregga automaticamente allineando l'architecture al technologies (fonte primaria)
3. Logga eventuali correzioni per debugging

```typescript
function validateAndSyncArchitecture(result: AnalysisResult): AnalysisResult {
  const techMap = new Map(
    result.technologies.map(t => [t.category.toLowerCase(), t.primary.name])
  );
  
  result.architecture = result.architecture.map(comp => {
    const category = detectCategory(comp.name); // Frontend, Backend, etc.
    const expectedTech = techMap.get(category);
    if (expectedTech && comp.technology !== expectedTech) {
      console.warn(`Fixing mismatch: ${comp.name} was ${comp.technology}, should be ${expectedTech}`);
      return { ...comp, technology: expectedTech };
    }
    return comp;
  });
  
  return result;
}
```

### Fase 3: Indicatore Visivo di Coerenza (Enhancement)

Nella UI, aggiungere un piccolo indicatore che mostri che le sezioni sono sincronizzate:

- Badge "Sincronizzato" verde quando le tecnologie corrispondono
- Se per qualche motivo non corrispondono, mostrare un warning

---

## File da Modificare

| File | Modifica |
|------|----------|
| `supabase/functions/analyze-prompt/index.ts` | Aggiornare system prompt con regole di coerenza |
| `src/services/analysisService.ts` | Aggiungere funzione di validazione/sync |
| `src/components/TechStackSection.tsx` | (Opzionale) Aggiungere badge di coerenza |

---

## Risultato Atteso

Dopo questa modifica:
- Lo Stack Tecnologico e il Diagramma Architettura mostreranno **sempre** le stesse tecnologie
- Se l'utente vede "Next.js" nello stack, vedrà "Next.js" anche nel diagramma
- La validazione frontend garantisce coerenza anche se l'AI dovesse sbagliare

---

## Sezione Tecnica

### Dettaglio modifica system prompt

```diff
LINEE GUIDA:
- Sii specifico e concreto nei suggerimenti
- Fornisci esempi pratici di come migliorare il prompt
- Il prompt ottimizzato deve essere in formato markdown strutturato
- Le tecnologie suggerite devono essere moderne e adatte al caso
- Identifica almeno 3 punti di forza, 3 debolezze e 2-3 assunzioni implicite
- Le best practice devono essere collegate ai problemi specifici del prompt
- Rispondi SOLO con JSON valido, nessun testo aggiuntivo prima o dopo
+ 
+ REGOLA CRITICA - COERENZA TRA SEZIONI:
+ Le tecnologie specificate nell'array "technologies" DEVONO essere IDENTICHE 
+ a quelle nell'array "architecture". Usa ESATTAMENTE gli stessi nomi:
+ - technologies[category="Frontend"].primary.name === architecture[*frontend*].technology
+ - technologies[category="Backend"].primary.name === architecture[*backend*|*api*].technology
+ - technologies[category="Database"].primary.name === architecture[*database*|*db*].technology
+ - technologies[category="Autenticazione"].primary.name === architecture[*auth*].technology
+ Non usare varianti (es. "React" vs "React + Vite") - scegli un nome e usalo ovunque.
```

### Logica di validazione frontend

```typescript
// src/services/analysisService.ts

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  frontend: ['frontend', 'presentation', 'ui', 'client', 'next', 'react'],
  backend: ['backend', 'api', 'server', 'edge', 'function'],
  database: ['database', 'db', 'data', 'storage', 'postgres', 'supabase'],
  autenticazione: ['auth', 'identity', 'login', 'user']
};

function detectCategory(componentName: string): string | null {
  const lower = componentName.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  return null;
}

export function validateAndSyncArchitecture(result: AnalysisResult): AnalysisResult {
  // Crea mappa categoria → tecnologia primaria
  const techMap = new Map<string, string>();
  result.technologies.forEach(t => {
    techMap.set(t.category.toLowerCase(), t.primary.name);
  });

  // Sincronizza architecture con technologies
  const syncedArchitecture = result.architecture.map(comp => {
    const category = detectCategory(comp.name);
    if (category) {
      const expectedTech = techMap.get(category);
      if (expectedTech && comp.technology !== expectedTech) {
        return { ...comp, technology: expectedTech };
      }
    }
    return comp;
  });

  return { ...result, architecture: syncedArchitecture };
}
```

