import { appNavigationService } from '@shared/navigation';
import I18n from 'i18n-js';
import { useEffect } from 'react';
import * as Localization from 'expo-localization';

export function useLanguage<T extends typeof I18n['translations']>(
  translations: T,
  defaultLanguage: keyof typeof translations
): (language?: keyof typeof translations) => void {
  I18n.translations = translations;

  return (language: keyof typeof translations = Localization.locale.split('-')[0]): void => {
    useEffect(() => {
      I18n.locale = language in I18n.translations ? (language as string) : (defaultLanguage as string);
      I18n.fallbacks = true;

      const currentRoute = appNavigationService.currentRoute;

      if (language && language in I18n.translations && currentRoute) {
        appNavigationService.navigate(currentRoute.name, { ...currentRoute.params, lang: language });
      }
    }, [language]);
  };
}
