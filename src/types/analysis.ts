export interface AnalysisDimension {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  reasoning: string;
  missing: string[];
  improvements: string[];
  icon: string;
}

export interface StrengthWeakness {
  id: string;
  type: 'strength' | 'weakness' | 'assumption';
  title: string;
  description: string;
}

export interface TechnologySuggestion {
  category: string;
  primary: {
    name: string;
    reason: string;
    pros: string[];
    cons: string[];
  };
  alternative: {
    name: string;
    reason: string;
    whenToUse: string;
  };
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  technology: string;
  role: string;
  reason: string;
  risks: string[];
  position: { x: number; y: number };
  connections: string[];
}

export interface BestPractice {
  id: string;
  category: string;
  title: string;
  description: string;
  examples: string[];
  relatedIssues?: string[];
}

export interface AnalysisResult {
  overallScore: number;
  dimensions: AnalysisDimension[];
  strengthsWeaknesses: StrengthWeakness[];
  optimizedPrompt: string;
  technologies: TechnologySuggestion[];
  architecture: ArchitectureComponent[];
  vibeCodingPractices: BestPractice[];
  architecturePractices: BestPractice[];
}
