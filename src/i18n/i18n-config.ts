import enMessages from "./lang/en-US.json";
import esMessages from "./lang/es-US.json";

export type Messages = Record<string, string>;

export interface LocaleEntry {
    name: string;
    messages: Messages;
}

export interface LocaleMap {
    [localeCode: string]: LocaleEntry;
}

export const defaultLocale = "en-US";


export const locales: LocaleMap = {
    "en-US": {
        name: "English",
        messages: enMessages
    },
    "es-US": {
        name: "Español",
        messages: esMessages
    },
};