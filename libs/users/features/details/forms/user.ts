import { UserGender, UserStatus } from '@libs/shared/data-access/api/user/enums';
import { useTranslation } from '@libs/shared/features/i18n';
import * as Yup from 'yup';

export class UserSchema {
  public email: string;
  public name: string;
  public gender: UserGender;
  public status: UserStatus;

  public static get validationSchema(): Yup.SchemaOf<UserSchema> {
    const translate = useTranslation('USERS.VALIDATION');

    return Yup.object().shape({
      email: Yup.string()
        .email(translate('TEXT_VALIDATION_EMAIL'))
        .required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      name: Yup.string().required(translate('TEXT_VALIDATION_REQUIRED_FIELD')),
      gender: Yup.mixed()
        .required(translate('TEXT_VALIDATION_REQUIRED_FIELD'))
        .oneOf(Object.values(UserGender), translate('TEXT_VALIDATION_INVALID')),
      status: Yup.mixed()
        .required(translate('TEXT_VALIDATION_REQUIRED_FIELD'))
        .oneOf(Object.values(UserStatus), translate('TEXT_VALIDATION_INVALID'))
    });
  }

  constructor() {
    this.email = '';
    this.name = '';
    this.gender = null;
    this.status = null;
  }
}
