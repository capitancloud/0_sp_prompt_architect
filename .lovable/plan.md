
# Piano: Implementazione Categorie Fisse per Stack Tecnologico

## Obiettivo

Garantire che lo Stack Tecnologico generi **sempre** 6 categorie fisse, indipendentemente dal prompt dell'utente, per una copertura completa e coerente dell'architettura.

---

## Le 6 Categorie Fisse

| # | Categoria | Descrizione | Icona |
|---|-----------|-------------|-------|
| 1 | **Frontend** | Framework/libreria per l'interfaccia utente | ⚛️ |
| 2 | **Styling** | Sistema di styling e design | 🎨 |
| 3 | **Backend** | Logica server-side e API | ⚙️ |
| 4 | **Database** | Persistenza e gestione dati | 🗄️ |
| 5 | **Autenticazione** | Gestione utenti e sessioni | 🔐 |
| 6 | **Hosting** | Piattaforma di deployment e infrastruttura | ☁️ |

---

## Modifiche da Implementare

### 1. Aggiornamento Edge Function (System Prompt)

**File:** `supabase/functions/analyze-prompt/index.ts`

Modificare il system prompt per:
- Elencare esplicitamente le 6 categorie obbligatorie
- Specificare che TUTTE devono essere sempre presenti nell'output
- Rimuovere varianti come "Backend/AI", "Auth", "Infrastructure" per uniformità

```
CATEGORIE STACK TECNOLOGICO (TUTTE OBBLIGATORIE):
L'array "technologies" DEVE contenere ESATTAMENTE 6 elementi, uno per categoria:
1. Frontend - Framework/libreria UI (es. Next.js, React, Vue)
2. Styling - Sistema di styling (es. Tailwind CSS, CSS Modules, Styled Components)
3. Backend - Logica server e API (es. Node.js, Edge Functions, Express)
4. Database - Persistenza dati (es. PostgreSQL, Supabase, MongoDB)
5. Autenticazione - Gestione utenti (es. Supabase Auth, Clerk, Auth0)
6. Hosting - Piattaforma deployment (es. Vercel, AWS, Netlify)

NON omettere nessuna categoria. NON usare varianti dei nomi (es. "Auth" invece di "Autenticazione").
```

### 2. Aggiornamento Frontend (UI)

**File:** `src/components/TechStackSection.tsx`

Modifiche:
- Definire un array costante `FIXED_CATEGORIES` con le 6 categorie
- Ordinare le tecnologie ricevute secondo l'ordine delle categorie fisse
- Mostrare un placeholder/warning se una categoria manca (fallback difensivo)
- Semplificare `categoryIcons` e `categoryColors` rimuovendo duplicati

```typescript
const FIXED_CATEGORIES = [
  "Frontend",
  "Styling", 
  "Backend",
  "Database",
  "Autenticazione",
  "Hosting"
] as const;

// Ordinamento garantito
const sortedTechnologies = FIXED_CATEGORIES.map(category => 
  technologies.find(t => t.category === category) || createPlaceholder(category)
);
```

### 3. Validazione Service (Fallback)

**File:** `src/services/analysisService.ts`

Aggiungere una funzione di validazione che:
- Verifichi che tutte le 6 categorie siano presenti
- Aggiunga placeholder per categorie mancanti
- Logga eventuali categorie mancanti per debugging

```typescript
function ensureAllCategories(technologies: TechnologySuggestion[]): TechnologySuggestion[] {
  const existing = new Set(technologies.map(t => t.category));
  
  FIXED_CATEGORIES.forEach(category => {
    if (!existing.has(category)) {
      console.warn(`Missing category: ${category}, adding placeholder`);
      technologies.push(createPlaceholder(category));
    }
  });
  
  return technologies;
}
```

---

## Diagramma del Flusso

```text
+------------------+     +-------------------+     +------------------+
|   User Prompt    | --> |  Edge Function    | --> |  Validation      |
|                  |     |  (6 categorie     |     |  Service         |
|                  |     |   obbligatorie)   |     |  (fallback)      |
+------------------+     +-------------------+     +------------------+
                                                           |
                                                           v
                                                  +------------------+
                                                  |  TechStackSection|
                                                  |  (ordine fisso)  |
                                                  +------------------+
```

---

## File da Modificare

| File | Tipo Modifica |
|------|---------------|
| `supabase/functions/analyze-prompt/index.ts` | Aggiornare system prompt con categorie obbligatorie |
| `src/services/analysisService.ts` | Aggiungere validazione categorie |
| `src/components/TechStackSection.tsx` | Ordinamento fisso e cleanup varianti |
| `src/types/analysis.ts` | (opzionale) Aggiungere tipo `FixedCategory` |

---

## Risultato Atteso

Dopo l'implementazione:
- Lo Stack Tecnologico mostrera **sempre** 6 card, nell'ordine: Frontend → Styling → Backend → Database → Autenticazione → Hosting
- L'AI e obbligata a fornire suggerimenti per tutte le categorie
- Se una categoria manca (edge case), viene mostrato un placeholder informativo
- La UI e piu pulita senza varianti confuse come "Backend/AI" o "Auth"

---

## Sezione Tecnica

### Dettaglio modifica system prompt

```diff
  "technologies": [
    {
-     "category": "<Frontend|Styling|Backend|Database|Autenticazione>",
+     "category": "<vedi categorie obbligatorie sotto>",
      "primary": {
        "name": "<nome tecnologia>",
...

+ CATEGORIE STACK TECNOLOGICO (TUTTE OBBLIGATORIE):
+ L'array "technologies" DEVE contenere ESATTAMENTE 6 elementi, uno per ogni categoria nell'ordine:
+ 1. "Frontend" - Framework/libreria per UI (React, Next.js, Vue, Angular)
+ 2. "Styling" - Sistema di styling (Tailwind CSS, CSS Modules, Styled Components, Sass)
+ 3. "Backend" - Logica server e API (Node.js, Edge Functions, Express, FastAPI)
+ 4. "Database" - Persistenza dati (PostgreSQL, Supabase, MongoDB, MySQL)
+ 5. "Autenticazione" - Gestione utenti (Supabase Auth, Clerk, Auth0, NextAuth)
+ 6. "Hosting" - Piattaforma deployment (Vercel, Netlify, AWS, Railway)
+ 
+ REGOLE:
+ - Includi SEMPRE tutte e 6 le categorie, anche se il prompt non le menziona esplicitamente
+ - Usa ESATTAMENTE questi nomi di categoria (no varianti come "Auth" o "Infrastructure")
+ - Suggerisci tecnologie appropriate al contesto del prompt per ogni categoria
```

### Funzione placeholder per categorie mancanti

```typescript
// src/services/analysisService.ts

const FIXED_CATEGORIES = ["Frontend", "Styling", "Backend", "Database", "Autenticazione", "Hosting"] as const;

function createPlaceholder(category: string): TechnologySuggestion {
  return {
    category,
    primary: {
      name: "Da definire",
      reason: "L'AI non ha fornito un suggerimento per questa categoria",
      pros: ["Flessibilita nella scelta"],
      cons: ["Richiede valutazione manuale"]
    },
    alternative: {
      name: "Vedi best practices",
      reason: "Consulta la documentazione del settore",
      whenToUse: "Quando hai requisiti specifici"
    }
  };
}

export function ensureAllCategories(technologies: TechnologySuggestion[]): TechnologySuggestion[] {
  const categoryMap = new Map(technologies.map(t => [t.category, t]));
  
  return FIXED_CATEGORIES.map(category => 
    categoryMap.get(category) || createPlaceholder(category)
  );
}
```

### Aggiornamento TechStackSection

```typescript
// src/components/TechStackSection.tsx

const FIXED_CATEGORIES = ["Frontend", "Styling", "Backend", "Database", "Autenticazione", "Hosting"] as const;

// Rimuovere varianti duplicate da categoryIcons e categoryColors
const categoryIcons: Record<string, string> = {
  "Frontend": "⚛️",
  "Styling": "🎨",
  "Backend": "⚙️",
  "Database": "🗄️",
  "Autenticazione": "🔐",
  "Hosting": "☁️"
};

// Ordinamento garantito nel componente
export function TechStackSection({ technologies, isSynced = true }: TechStackSectionProps) {
  const sortedTechnologies = FIXED_CATEGORIES
    .map(category => technologies.find(t => t.category === category))
    .filter((t): t is TechnologySuggestion => t !== undefined);
  
  // ... resto del componente usa sortedTechnologies
}
```
