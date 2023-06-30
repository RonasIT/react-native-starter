import { i18n } from '@libs/shared/features/i18n/i18n';

export function setDefaultLanguage(): object {
  const defaultLanguage = 'en';
  const translation = {
    ...require(`../../i18n/scenes/${defaultLanguage}.json`),
    ...require(`../../i18n/auth/${defaultLanguage}.json`),
    ...require(`../../i18n/profile/${defaultLanguage}.json`),
    ...require(`../../i18n/shared/${defaultLanguage}.json`),
    ...require(`../../i18n/users/${defaultLanguage}.json`)
  };
  i18n.translations = {
    en: translation
  };
  i18n.locale = defaultLanguage;

  return translation;
}
