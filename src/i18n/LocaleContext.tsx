import { createContext, Dispatch, SetStateAction } from "react";

export const LocaleContext = createContext<{
    locale: string;
    setLocale: Dispatch<SetStateAction<string>>;
}>({
    locale: "",
    setLocale: (() => {}) as Dispatch<SetStateAction<string>>,
});