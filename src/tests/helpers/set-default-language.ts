import { i18n } from '@shared/features/i18n/i18n';

export function setDefaultLanguage(): object {
  const defaultLanguage = 'en';
  const translation = {
    ...require(`../../assets/i18n/${defaultLanguage}.json`),
    ...require(`../../libs/auth/assets/i18n/${defaultLanguage}.json`),
    ...require(`../../libs/profile/assets/i18n/${defaultLanguage}.json`),
    ...require(`../../libs/shared/assets/i18n/${defaultLanguage}.json`)
  };
  i18n.translations = {
    en: translation
  };
  i18n.locale = defaultLanguage;

  return translation;
}
