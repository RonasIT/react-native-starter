import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiService } from '../api';
import { User } from '../user';

class ProfileService {
  // TODO: Demo code. Remove in a real app.
  public getDemoProfile(): Observable<User> {
    return apiService
      .get<{ data: Array<User> }>('/users')
      .pipe(map((response) => plainToInstance(User, response.data[0])));
  }

  public getProfile(): Observable<User> {
    return apiService.get<User>('/profile').pipe(map((response) => plainToInstance(User, response)));
  }

  public updateProfile(user: User): Observable<User> {
    return apiService.put<void>('/profile', instanceToPlain(user)).pipe(map(() => user));
  }
}

export const profileService = new ProfileService();
