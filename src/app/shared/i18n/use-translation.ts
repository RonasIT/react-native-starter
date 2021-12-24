import I18n, { TranslateOptions } from 'i18n-js';

export function useTranslation(basePath: string) {
  return (key: string, options?: TranslateOptions): string => {
    return I18n.t(`${basePath}.${key}`, options);
  };
}
