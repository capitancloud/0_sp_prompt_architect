import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simplified system prompt - removed architecture section since we derive it from technologies
const systemPrompt = `Sei un Senior Software Engineer e Product Architect specializzato in analisi di specifiche tecniche per web application. Analizza il prompt dell'utente e restituisci una valutazione professionale strutturata.

DEVI restituire una risposta JSON valida con questa struttura esatta:

{
  "overallScore": <numero 0-100>,
  "dimensions": [
    {
      "id": "<stringa univoca>",
      "name": "<nome dimensione in italiano>",
      "score": <numero 1-10>,
      "maxScore": 10,
      "reasoning": "<spiegazione breve del punteggio>",
      "missing": ["<elementi mancanti>"],
      "improvements": ["<suggerimenti concreti>"],
      "icon": "<emoji>"
    }
  ],
  "strengthsWeaknesses": [
    {
      "id": "<stringa univoca>",
      "type": "<strength|weakness|assumption>",
      "title": "<titolo breve>",
      "description": "<descrizione breve>"
    }
  ],
  "optimizedPrompt": "<PROMPT DETTAGLIATO in markdown - VEDI REGOLE SOTTO>",
  "technologies": [
    {
      "category": "<categoria>",
      "primary": {
        "name": "<nome tecnologia>",
        "reason": "<motivazione breve>",
        "pros": ["<vantaggio>"],
        "cons": ["<svantaggio>"]
      },
      "alternative": {
        "name": "<alternativa>",
        "reason": "<motivazione>",
        "whenToUse": "<quando usarla>"
      }
    }
  ],
  "vibeCodingPractices": [
    {
      "id": "<id>",
      "category": "<categoria>",
      "title": "<titolo>",
      "description": "<descrizione>",
      "examples": ["<esempio>"]
    }
  ],
  "architecturePractices": [
    {
      "id": "<id>",
      "category": "<categoria>",
      "title": "<titolo>",
      "description": "<descrizione>",
      "examples": ["<esempio>"],
      "relatedIssues": ["<problema correlato>"]
    }
  ]
}

DIMENSIONI DA VALUTARE (tutte obbligatorie, 8 totali):
1. Chiarezza dell'Obiettivo (🎯)
2. Completezza Funzionale (📋)
3. Definizione Target Utente (👥)
4. Vincoli Tecnici (⚙️)
5. Considerazioni Scalabilità (📈)
6. Considerazioni Sicurezza (🔒)
7. Manutenibilità (🔧)
8. Consapevolezza Architetturale (🏗️)

CATEGORIE STACK TECNOLOGICO (TUTTE OBBLIGATORIE - ESATTAMENTE 6):
1. "Frontend" - React, Next.js, Vue, Angular
2. "Styling" - Tailwind CSS, CSS Modules, Styled Components
3. "Backend" - Node.js, Edge Functions, Express
4. "Database" - PostgreSQL, Supabase, MongoDB
5. "Autenticazione" - Supabase Auth, Clerk, Auth0
6. "Hosting" - Vercel, Netlify, AWS

REGOLE PER optimizedPrompt (MOLTO IMPORTANTE - GENERA UN PROMPT DETTAGLIATO):
Il campo optimizedPrompt deve essere un prompt COMPLETO, DETTAGLIATO e PROFESSIONALE in markdown con questa struttura OBBLIGATORIA:

# [Nome Progetto]: Specifiche Tecniche Complete

## 1. Panoramica del Progetto
### 1.1 Obiettivo Principale
[Descrizione dettagliata dell'obiettivo - minimo 3-4 frasi]

### 1.2 Problema da Risolvere
[Quale problema risolve questa applicazione - minimo 2-3 frasi]

### 1.3 Proposta di Valore
[Cosa rende questa soluzione unica - minimo 2 punti]

## 2. Target Utenti
### 2.1 Utente Primario
- **Profilo**: [descrizione dettagliata]
- **Bisogni**: [lista di 3-5 bisogni]
- **Pain Points**: [problemi attuali che affronta]

### 2.2 Casi d'Uso Principali
[Lista di 4-6 casi d'uso dettagliati con formato: "Come [utente], voglio [azione] per [beneficio]"]

## 3. Funzionalità Core (MVP)
### 3.1 Funzionalità Essenziali
[Lista dettagliata di 5-8 funzionalità con descrizione per ciascuna]

### 3.2 Flussi Utente Principali
[Descrizione di 2-3 flussi utente principali passo-passo]

## 4. Requisiti Non Funzionali
### 4.1 Performance
- Tempo di caricamento target: [specificare]
- Metriche chiave: [lista]

### 4.2 Sicurezza
- Autenticazione: [dettagli]
- Protezione dati: [dettagli]

### 4.3 Scalabilità
[Considerazioni sulla crescita]

## 5. Stack Tecnologico Consigliato
[Riassunto delle tecnologie suggerite con motivazioni]

## 6. Vincoli e Considerazioni
### 6.1 Vincoli Tecnici
[Lista di vincoli]

### 6.2 Integrazioni Necessarie
[API o servizi esterni da integrare]

## 7. Criteri di Successo
[Metriche per valutare il successo del progetto - minimo 3-4 KPI]

IMPORTANTE: Il prompt ottimizzato DEVE essere MOLTO più dettagliato e strutturato del prompt originale. Deve essere almeno 3-4 volte più lungo e contenere TUTTE le sezioni sopra. NON essere sintetico!

REGOLE GENERALI:
- Includi SEMPRE tutte e 6 le categorie tecnologiche
- Usa ESATTAMENTE questi nomi di categoria
- Rispondi SOLO con JSON valido, nessun testo prima o dopo
- Sii conciso nelle descrizioni delle dimensions (max 2 frasi per campo)
- Identifica almeno 3 punti di forza e 3 debolezze
- Il campo optimizedPrompt deve essere MOLTO DETTAGLIATO (minimo 800 parole)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analyzing prompt:", prompt.substring(0, 100) + "...");

    // Create abort controller with 55 second timeout (edge functions have 60s limit)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    let response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analizza questo prompt per una web app:\n\n${prompt}` }
          ],
          temperature: 0.7,
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error("AI request timed out");
        return new Response(
          JSON.stringify({ error: "L'analisi sta richiedendo troppo tempo. Riprova con un prompt più breve." }),
          { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw fetchError;
    }
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "No analysis generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response, handling potential markdown code blocks
    let analysisResult;
    try {
      let jsonContent = content.trim();
      // Remove markdown code blocks if present
      if (jsonContent.startsWith("```json")) {
        jsonContent = jsonContent.slice(7);
      } else if (jsonContent.startsWith("```")) {
        jsonContent = jsonContent.slice(3);
      }
      if (jsonContent.endsWith("```")) {
        jsonContent = jsonContent.slice(0, -3);
      }
      analysisResult = JSON.parse(jsonContent.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError, content.substring(0, 500));
      return new Response(
        JSON.stringify({ error: "Failed to parse analysis result" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analysis completed successfully");

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Analyze prompt error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
