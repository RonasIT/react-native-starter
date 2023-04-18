import * as Yup from 'yup';
import { useTranslation } from '../../../../shared/features/i18n';

export class LoginFormSchema {
  public email: string;
  public password: string;

  public static get validationSchema(): Yup.SchemaOf<LoginFormSchema> {
    const translate = useTranslation('COMMON.VALIDATION');

    return Yup.object().shape({
      email: Yup.string()
        .email(translate('TEXT_VALIDATION_EMAIL'))
        .required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      password: Yup.string().required(translate('TEXT_VALIDATION_REQUIRED_FIELD'))
    });
  }

  constructor() {
    this.email = '';
    this.password = '';
  }
}
