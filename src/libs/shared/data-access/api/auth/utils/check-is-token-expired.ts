import isJwtTokenExpired from 'jwt-check-expiry';

export function checkIsTokenExpired(token: string, treatInvalidTokenAsExpired: boolean = true): boolean {
  try {
    if (treatInvalidTokenAsExpired && !token) {
      return true;
    }

    return isJwtTokenExpired(token);
  } catch (error) {
    return treatInvalidTokenAsExpired;
  }
}
