import { Head } from 'nextra/components'
import 'nextra-theme-blog/style.css'
import '@/styles/globals.css'
import CustomFooter from "@/components/custom-footer";
import CustomHeader from "@/components/custom-header";
import { FloatingNav } from "@/components/floating-nav";
import { PageTransition } from "@/components/page-transition";
import { Providers } from "@/components/providers";
import { Metadata } from "next";
import { Layout } from "nextra-theme-blog";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
    title: 'IROL - Intelligent Robotics Lab'
}

const bodyFont = Inter({
    subsets: ['latin', 'vietnamese'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning

            className={bodyFont.className}
        >
            <Head backgroundColor={{ dark: '#15120d', light: '#faf5e9' }} />
            <body className="min-h-screen">
                <Providers>
                    <Layout>
                        <CustomHeader />

                        <PageTransition>
                            {children}
                        </PageTransition>

                        <CustomFooter />
                    </Layout>
                    <FloatingNav />
                </Providers>
            </body>
        </html>
    )
}