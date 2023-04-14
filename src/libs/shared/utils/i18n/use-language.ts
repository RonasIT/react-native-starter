import * as Localization from 'expo-localization';
import { useEffect } from 'react';
import { appNavigationService } from '@shared/navigation';
import { i18n } from './i18n';

export function useLanguage<T extends typeof i18n['translations']>(
  translations: T,
  defaultLanguage: keyof typeof translations
): (language?: keyof typeof translations) => void {
  i18n.translations = translations;

  return (language: keyof typeof translations = Localization.locale.split('-')[0]): void => {
    useEffect(() => {
      i18n.locale = language in i18n.translations ? (language as string) : (defaultLanguage as string);
      i18n.enableFallback = true;

      const currentRoute = appNavigationService.currentRoute;

      if (language && language in i18n.translations && currentRoute) {
        appNavigationService.navigate(currentRoute.name, { ...currentRoute.params, lang: language });
      }
    }, [language]);
  };
}
