import { useContext } from "react";
import { locales } from "../i18n/i18n-config";
import { LocaleContext } from "../i18n/LocaleContext";

export default function LangSwitcher() {
  // Pull in the top-level locale and its setter.
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <div>
      <select
        value={locale}
        // Whenever the user selects a locale, update the
        // top-level active locale.
        onChange={(e) => setLocale(e.target.value)}
      >
        {Object.keys(locales).map((loc) => (
          <option value={loc} key={loc}>
            {locales[loc].name}
          </option>
        ))}
      </select>
    </div>
  );
}