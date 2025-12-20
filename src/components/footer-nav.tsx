'use client'

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { IconBrandGithub, IconRss } from "@tabler/icons-react";

export function FooterNav() {
    const { t } = useLanguage();

    const navGroups = [
        {
            title: t.nav.research,
            links: [
                { href: '/research', label: t.nav.researchOverview },
                { href: '/research/publications', label: t.nav.publications },
                { href: '/research/conferences', label: t.nav.conferences },
                { href: '/research/patents', label: t.nav.patents },
                { href: '/research/projects', label: t.nav.projects },
            ]
        },
        {
            title: t.nav.people,
            links: [
                { href: '/people?tab=professor', label: t.nav.professor },
                { href: '/people?tab=members', label: t.nav.members },
                { href: '/people?tab=alumni', label: t.nav.alumni },
            ]
        },
        {
            title: t.nav.notices,
            links: [
                { href: '/notices?tab=news', label: t.notices.tabs.news },
                { href: '/notices?tab=announcement', label: t.notices.tabs.announcement },
            ]
        },
    ];

    return (
        <footer className="border-t border-border/50 bg-muted/30 mt-16">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-black text-xl tracking-tight">
                            IROL
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                            Intelligent Robotics Lab<br />
                            Soongsil University
                        </p>
                    </div>

                    {/* Nav Groups */}
                    {navGroups.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} IROL. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/rss.xml"
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="RSS Feed"
                        >
                            <IconRss className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://github.com/IROL123"
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="GitHub"
                        >
                            <IconBrandGithub className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterNav;
