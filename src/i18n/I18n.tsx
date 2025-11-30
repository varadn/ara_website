"use client";
import React from 'react';
import { IntlProvider } from "react-intl";
import { useState } from "react";
import { LocaleContext } from "./LocaleContext";
import { defaultLocale, locales } from "./i18n-config";


export default function I18n({children}: {children: React.ReactNode}) {
    const [locale, setLocale] = useState(defaultLocale);
    return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
        <IntlProvider
            locale={locale}
            defaultLocale={defaultLocale}
            messages={locales[locale as keyof typeof locales].messages}
        >
            {children}
        </IntlProvider>
    </LocaleContext.Provider>
    );
}