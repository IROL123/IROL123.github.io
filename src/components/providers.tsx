'use client'

import { LanguageProvider } from '@/lib/i18n'
import { ThemeProvider } from 'next-themes'
import { ThemeTransitionProvider } from '@/components/theme-transition-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeTransitionProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </ThemeTransitionProvider>
        </ThemeProvider>
    )
}

