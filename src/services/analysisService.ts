import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, TechnologySuggestion } from "@/types/analysis";

// Fixed categories - always present in this order
export const FIXED_CATEGORIES = ["Frontend", "Styling", "Backend", "Database", "Autenticazione", "Hosting"] as const;
export type FixedCategory = typeof FIXED_CATEGORIES[number];

// Create placeholder for missing categories
function createPlaceholder(category: string): TechnologySuggestion {
  return {
    category,
    primary: {
      name: "Da definire",
      reason: "L'AI non ha fornito un suggerimento per questa categoria",
      pros: ["Flessibilità nella scelta"],
      cons: ["Richiede valutazione manuale"]
    },
    alternative: {
      name: "Vedi best practices",
      reason: "Consulta la documentazione del settore",
      whenToUse: "Quando hai requisiti specifici"
    }
  };
}

// Ensure all 6 fixed categories are present and in correct order
export function ensureAllCategories(technologies: TechnologySuggestion[] = []): TechnologySuggestion[] {
  const categoryMap = new Map(technologies.map(t => [t.category, t]));
  
  const result = FIXED_CATEGORIES.map(category => {
    const existing = categoryMap.get(category);
    if (!existing) {
      console.warn(`Missing category: ${category}, adding placeholder`);
      return createPlaceholder(category);
    }
    return existing;
  });
  
  return result;
}

// Validate and ensure all required fields exist in the result
export function validateAndSyncResult(data: Partial<AnalysisResult>): { 
  result: AnalysisResult; 
  isSynced: boolean; 
  corrections: string[] 
} {
  const corrections: string[] = [];
  
  // Ensure all required arrays exist with defaults
  const result: AnalysisResult = {
    overallScore: data.overallScore ?? 50,
    dimensions: data.dimensions ?? [],
    strengthsWeaknesses: data.strengthsWeaknesses ?? [],
    optimizedPrompt: data.optimizedPrompt ?? "Nessun prompt ottimizzato disponibile.",
    technologies: ensureAllCategories(data.technologies),
    architecture: [], // No longer used - derived from technologies
    vibeCodingPractices: data.vibeCodingPractices ?? [],
    architecturePractices: data.architecturePractices ?? []
  };

  // Log any missing fields
  if (!data.dimensions || data.dimensions.length === 0) {
    corrections.push("Missing dimensions array");
  }
  if (!data.strengthsWeaknesses || data.strengthsWeaknesses.length === 0) {
    corrections.push("Missing strengthsWeaknesses array");
  }
  if (!data.technologies || data.technologies.length < 6) {
    corrections.push(`Technologies array incomplete: ${data.technologies?.length ?? 0}/6`);
  }
  if (!data.vibeCodingPractices || data.vibeCodingPractices.length === 0) {
    corrections.push("Missing vibeCodingPractices array");
  }
  if (!data.architecturePractices || data.architecturePractices.length === 0) {
    corrections.push("Missing architecturePractices array");
  }

  if (corrections.length > 0) {
    console.warn("Result validation corrections:", corrections);
  }

  return { 
    result, 
    isSynced: corrections.length === 0,
    corrections
  };
}

export async function analyzePrompt(prompt: string): Promise<{ 
  result: AnalysisResult; 
  isSynced: boolean; 
  corrections: string[] 
}> {
  const { data, error } = await supabase.functions.invoke('analyze-prompt', {
    body: { prompt }
  });

  if (error) {
    console.error("Analysis error:", error);
    throw new Error(error.message || "Failed to analyze prompt");
  }

  if (data.error) {
    throw new Error(data.error);
  }

  // Validate and sync the result with defensive defaults
  return validateAndSyncResult(data as Partial<AnalysisResult>);
}
