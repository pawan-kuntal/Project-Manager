import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'app-language'

const LanguageCtx = createContext({
  language: 'en',
  setLanguage: (lang) => {},
})

export function LanguageProvider({ children, defaultLanguage = 'en' }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || defaultLanguage
    } catch {
      return defaultLanguage
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {}
    try {
      document.documentElement.lang = language
    } catch {}
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage: (lang) => setLanguageState(lang),
    }),
    [language],
  )

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>
}

export function useLanguage() {
  return useContext(LanguageCtx)
}
