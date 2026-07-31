"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

import enUS from "@/../messages/en-US.json";
import enGB from "@/../messages/en-GB.json";
import deDE from "@/../messages/de-DE.json";
import esES from "@/../messages/es-ES.json";

export type SupportedLanguage = "English (US)" | "English (UK)" | "Deutsch" | "Español";

export interface LanguageOption {
  label: SupportedLanguage;
  locale: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { label: "English (US)", locale: "en-US", dir: "ltr" },
  { label: "English (UK)", locale: "en-GB", dir: "ltr" },
  { label: "Deutsch", locale: "de-DE", dir: "ltr" },
  { label: "Español", locale: "es-ES", dir: "ltr" },
];

export function getLanguageOption(label: string): LanguageOption {
  return LANGUAGES.find((l) => l.label === label) ?? LANGUAGES[0];
}

const MESSAGES_MAP: Record<string, any> = {
  "en-US": enUS,
  "en-GB": enGB,
  "de-DE": deDE,
  "es-ES": esES,
};

interface NextIntlLanguageContextValue {
  language: string;
  locale: string;
  setLanguage: (lang: string) => void;
}

const NextIntlLanguageContext = createContext<NextIntlLanguageContextValue>({
  language: "English (US)",
  locale: "en-US",
  setLanguage: () => {},
});

export function NextIntlAppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>("English (US)");

  const option = getLanguageOption(language);
  const locale = option.locale;
  const messages = MESSAGES_MAP[locale] ?? enUS;

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_locale", getLanguageOption(lang).locale);
    }
  };

  useEffect(() => {
    document.documentElement.lang = option.locale;
    document.documentElement.dir = option.dir;
  }, [option]);

  return (
    <NextIntlLanguageContext.Provider value={{ language, locale, setLanguage }}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </NextIntlLanguageContext.Provider>
  );
}

export function useNextIntlLanguage() {
  return useContext(NextIntlLanguageContext);
}
