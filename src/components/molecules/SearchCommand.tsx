"use client";

import { useEffect } from "react";

interface SearchCommandProps {
  inputId?: string;
}

export function SearchCommand({ inputId = "global-search" }: SearchCommandProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById(inputId)?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputId]);

  return null;
}
