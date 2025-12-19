'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Language, translations, Translations } from './translations'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    toggleLanguage: () => void
    t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'irol-language'

function getInitialLanguage(): Language {
    if (typeof window === 'undefined') return 'en'

    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ko' || stored === 'en') return stored

    // Detect browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('ko')) return 'ko'

    return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setLanguageState(getInitialLanguage())
        setMounted(true)
    }, [])

    // Font is now set globally in globals.css - no need for dynamic switching

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem(STORAGE_KEY, lang)
    }, [])

    const toggleLanguage = useCallback(() => {
        const newLang = language === 'en' ? 'ko' : 'en'
        setLanguage(newLang)
    }, [language, setLanguage])

    const t = translations[language]

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ language: 'en', setLanguage, toggleLanguage, t: translations.en }}>
                {children}
            </LanguageContext.Provider>
        )
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export { type Language }
