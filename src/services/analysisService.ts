import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, ArchitectureComponent } from "@/types/analysis";

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

  return { 
    result: { ...result, architecture: syncedArchitecture }, 
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
