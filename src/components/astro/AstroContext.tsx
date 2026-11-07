import { createContext, useContext, useState, type ReactNode } from "react";

export interface AstroContextState {
  selectedPlanet?: string | null;
  selectedMission?: string | null;
  selectedArtifact?: string | null;
  selectedComponent?: string | null;
  currentStoryStage?: string | null;
  coordinates?: { lat: number; lon: number } | null;
}

interface AstroContextValue {
  context: AstroContextState;
  updateContext: (updates: Partial<AstroContextState>) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  openWithPrompt: (prompt: string) => void;
  initialPrompt: string | null;
  clearInitialPrompt: () => void;
}

const AstroContext = createContext<AstroContextValue | null>(null);

export function AstroProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AstroContextState>({});
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);

  const updateContext = (updates: Partial<AstroContextState>) => {
    setContext((prev) => ({ ...prev, ...updates }));
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const openWithPrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    setIsOpen(true);
  };

  const clearInitialPrompt = () => setInitialPrompt(null);

  return (
    <AstroContext.Provider
      value={{
        context,
        updateContext,
        isOpen,
        setIsOpen,
        toggleOpen,
        openWithPrompt,
        initialPrompt,
        clearInitialPrompt,
      }}
    >
      {children}
    </AstroContext.Provider>
  );
}

export function useAstro() {
  const ctx = useContext(AstroContext);
  if (!ctx) {
    throw new Error("useAstro must be used within an AstroProvider");
  }
  return ctx;
}
