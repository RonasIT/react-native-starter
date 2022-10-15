import { TranslateOptions } from 'i18n-js';
import { i18n } from './i18n';

export function useTranslation(basePath: string) {
  return (key: string, options?: TranslateOptions): string => {
    return i18n.t(`${basePath}.${key}`, options);
  };
}
