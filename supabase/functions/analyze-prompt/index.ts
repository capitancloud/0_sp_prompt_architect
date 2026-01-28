import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Sei un Senior Software Engineer e Product Architect specializzato in analisi di specifiche tecniche per web application. Analizza il prompt dell'utente che descrive un'idea di web app e restituisci una valutazione professionale strutturata.

DEVI restituire una risposta JSON valida con questa struttura esatta:

{
  "overallScore": <numero 0-100>,
  "dimensions": [
    {
      "id": "<stringa univoca>",
      "name": "<nome dimensione in italiano>",
      "score": <numero 1-10>,
      "maxScore": 10,
      "reasoning": "<spiegazione del punteggio>",
      "missing": ["<elementi mancanti>"],
      "improvements": ["<suggerimenti concreti>"],
      "icon": "<emoji rappresentativa>"
    }
  ],
  "strengthsWeaknesses": [
    {
      "id": "<stringa univoca>",
      "type": "<strength|weakness|assumption>",
      "title": "<titolo breve>",
      "description": "<descrizione>"
    }
  ],
  "optimizedPrompt": "<versione migliorata del prompt in markdown>",
  "technologies": [
    {
      "category": "<Frontend|Styling|Backend|Database|Autenticazione>",
      "primary": {
        "name": "<nome tecnologia>",
        "reason": "<motivazione>",
        "pros": ["<vantaggi>"],
        "cons": ["<svantaggi>"]
      },
      "alternative": {
        "name": "<alternativa>",
        "reason": "<motivazione>",
        "whenToUse": "<quando usarla>"
      }
    }
  ],
  "architecture": [
    {
      "id": "<stringa univoca>",
      "name": "<nome componente>",
      "technology": "<tecnologia>",
      "role": "<ruolo nel sistema>",
      "reason": "<motivazione>",
      "risks": ["<rischi>"],
      "position": { "x": <numero>, "y": <numero> },
      "connections": ["<id altri componenti>"]
    }
  ],
  "vibeCodingPractices": [
    {
      "id": "<stringa univoca>",
      "category": "<categoria>",
      "title": "<titolo>",
      "description": "<descrizione>",
      "examples": ["<esempi>"]
    }
  ],
  "architecturePractices": [
    {
      "id": "<stringa univoca>",
      "category": "<categoria>",
      "title": "<titolo>",
      "description": "<descrizione>",
      "examples": ["<esempi>"],
      "relatedIssues": ["<problemi correlati al prompt>"]
    }
  ]
}

DIMENSIONI DA VALUTARE (tutte obbligatorie):
1. Chiarezza dell'Obiettivo (icon: 🎯)
2. Completezza Funzionale (icon: 📋)
3. Definizione Target Utente (icon: 👥)
4. Vincoli Tecnici (icon: ⚙️)
5. Considerazioni Scalabilità (icon: 📈)
6. Considerazioni Sicurezza (icon: 🔒)
7. Manutenibilità (icon: 🔧)
8. Consapevolezza Architetturale (icon: 🏗️)

LINEE GUIDA:
- Sii specifico e concreto nei suggerimenti
- Fornisci esempi pratici di come migliorare il prompt
- Il prompt ottimizzato deve essere in formato markdown strutturato
- Le tecnologie suggerite devono essere moderne e adatte al caso
- Identifica almeno 3 punti di forza, 3 debolezze e 2-3 assunzioni implicite
- Le best practice devono essere collegate ai problemi specifici del prompt
- Rispondi SOLO con JSON valido, nessun testo aggiuntivo prima o dopo

REGOLA CRITICA - COERENZA TRA SEZIONI:
Le tecnologie specificate nell'array "technologies" DEVONO essere IDENTICHE a quelle nell'array "architecture". 
Per garantire la coerenza:
1. Prima definisci le tecnologie nell'array "technologies"
2. Poi usa ESATTAMENTE gli stessi nomi in "architecture":
   - technologies[category="Frontend"].primary.name === architecture[componente frontend].technology
   - technologies[category="Backend"].primary.name === architecture[componente backend/api].technology
   - technologies[category="Database"].primary.name === architecture[componente database].technology
   - technologies[category="Autenticazione"].primary.name === architecture[componente auth].technology
3. NON usare varianti (es. "React" vs "React + Vite", oppure "Next.js" vs "Next.js (App Router)")
4. Scegli UN nome per ogni tecnologia e usalo IDENTICAMENTE in entrambe le sezioni`;

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analizza questo prompt che descrive un'idea di web app:\n\n${prompt}` }
        ],
        temperature: 0.7,
      }),
    });

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
      console.error("Failed to parse AI response as JSON:", parseError, content);
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
