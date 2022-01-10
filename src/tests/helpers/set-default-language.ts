import I18n from 'i18n-js';

export function setDefaultLanguage(): object {
  const defaultLanguage = 'en';
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const translation = require(`../../assets/i18n/${defaultLanguage}.json`);
  I18n.translations = {
    en: translation
  };
  I18n.locale = defaultLanguage;

  return translation;
}
