"use client";
import React from 'react';
import { AuthProvider } from "@/contexts/AuthContext";
import I18n from './i18n/I18n';

export default function Main({children}: {children: React.ReactNode;}){
    return(
    <AuthProvider>
        <I18n>
            {children}
        </I18n>
    </AuthProvider>
    )
}