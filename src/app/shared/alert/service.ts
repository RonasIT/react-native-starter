import { Alert, AlertButton, AlertOptions, Platform } from 'react-native';
import I18n from 'i18n-js';

class AlertService {
  public show({ title, message }: { title?: string; message: string }): void {
    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert(title, message);
    }
  }

  public error({ title, message }: { title?: string; message?: string } = {}): void {
    this.show({
      title: title || I18n.t('SHARED.ALERT.TEXT_TITLE_ERROR'),
      message: message || I18n.t('SHARED.ALERT.TEXT_ERROR_MESSAGE')
    });
  }

  public confirm({
    title,
    message,
    onConfirm,
    onCancel,
    cancelButtonText,
    confirmButtonText,
    confirmButtonStyle,
    options
  }: {
    title?: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    cancelButtonText?: string;
    confirmButtonText?: string;
    confirmButtonStyle?: AlertButton['style'];
    options?: AlertOptions;
  } = {}): void {
    Alert.alert(
      title || I18n.t('SHARED.ALERT.TEXT_CONFIRM_ACTION'),
      message,
      [
        {
          text: cancelButtonText || I18n.t('SHARED.ALERT.TEXT_CANCEL'),
          onPress: onCancel,
          style: 'cancel'
        },
        {
          text: confirmButtonText || I18n.t('SHARED.ALERT.TEXT_YES'),
          onPress: onConfirm,
          style: confirmButtonStyle
        }
      ],
      options
    );
  }
}

export const alertService = new AlertService();
