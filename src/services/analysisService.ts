import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, ArchitectureComponent, TechnologySuggestion } from "@/types/analysis";

// Fixed categories - always present in this order
export const FIXED_CATEGORIES = ["Frontend", "Styling", "Backend", "Database", "Autenticazione", "Hosting"] as const;
export type FixedCategory = typeof FIXED_CATEGORIES[number];

// Keyword mappings for category detection
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  frontend: ['frontend', 'presentation', 'ui', 'client', 'web', 'app'],
  backend: ['backend', 'api', 'server', 'edge', 'function', 'service'],
  database: ['database', 'db', 'data', 'storage', 'postgres', 'supabase', 'mongo'],
  autenticazione: ['auth', 'identity', 'login', 'user', 'session', 'jwt'],
};

// Detect category from component name
function detectCategory(componentName: string): string | null {
  const lower = componentName.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  return null;
}

// Validate and sync architecture with technologies
export function validateAndSyncArchitecture(result: AnalysisResult): { 
  result: AnalysisResult; 
  isSynced: boolean; 
  corrections: string[] 
} {
  const corrections: string[] = [];
  
  // Create map: category → primary technology name
  const techMap = new Map<string, string>();
  result.technologies.forEach(t => {
    techMap.set(t.category.toLowerCase(), t.primary.name);
  });

  // Sync architecture with technologies
  const syncedArchitecture: ArchitectureComponent[] = result.architecture.map(comp => {
    const category = detectCategory(comp.name);
    if (category) {
      const expectedTech = techMap.get(category);
      if (expectedTech && comp.technology !== expectedTech) {
        corrections.push(`${comp.name}: "${comp.technology}" → "${expectedTech}"`);
        return { ...comp, technology: expectedTech };
      }
    }
    return comp;
  });

  if (corrections.length > 0) {
    console.warn("Architecture sync corrections applied:", corrections);
  }

  // Ensure all 6 categories are present
  const ensuredTechnologies = ensureAllCategories(result.technologies);

  return { 
    result: { ...result, architecture: syncedArchitecture, technologies: ensuredTechnologies }, 
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

  // Validate and sync the result
  return validateAndSyncArchitecture(data as AnalysisResult);
}

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
export function ensureAllCategories(technologies: TechnologySuggestion[]): TechnologySuggestion[] {
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
