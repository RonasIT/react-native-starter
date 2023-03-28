import * as Yup from 'yup';
import { useTranslation } from '@shared/i18n';

export class UserForm {
  public email: string;
  public name: string;
  public gender: string;
  public status: string;

  public static get validationSchema(): Yup.SchemaOf<UserForm> {
    const translate = useTranslation('COMMON.VALIDATION');

    return Yup.object().shape({
      email: Yup.string()
        .email(translate('TEXT_VALIDATION_EMAIL'))
        .required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      name: Yup.string().required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      gender: Yup.string().required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      status: Yup.string().required(translate('TEXT_VALIDATION_REQUIRED_FIELD'))
    });
  }

  constructor() {
    this.email = '';
    this.name = '';
    this.gender = '';
    this.status = '';
  }
}
