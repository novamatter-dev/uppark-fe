import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";
import { fr, ro, en, de, hu } from "./src/translations";

//empty for now
const resources = {
  fr: {
    translation: fr,
  },
  ro: {
    translation: ro,
  },
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  hu: {
    translation: hu,
  },
};

const nativeLocale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

const locale = nativeLocale.split("_");
const fallBack = locale[0];
console.log("locale", fallBack);

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  //language to use if translations in user language are not available
  fallbackLng: fallBack || "ro",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
