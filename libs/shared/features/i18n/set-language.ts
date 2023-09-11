import * as Localization from 'expo-localization';
import { useEffect } from 'react';
import { i18n } from './i18n';

export function setLanguage<T extends (typeof i18n)['translations']>(
  translations: T,
  defaultLanguage: keyof typeof translations): (language?: keyof typeof translations) => void {
  i18n.translations = translations;

  return (language: keyof typeof translations = Localization.locale.split('-')[0]): void => {
    useEffect(() => {
      i18n.locale = language in i18n.translations ? (language as string) : (defaultLanguage as string);
      i18n.enableFallback = true;
    }, [language]);
  };
}
