import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult } from "@/types/analysis";

export async function analyzePrompt(prompt: string): Promise<AnalysisResult> {
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

  return data as AnalysisResult;
}
