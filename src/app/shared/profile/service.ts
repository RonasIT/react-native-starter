import { apiService } from '@shared/api/service';
import { User } from '@shared/user/models/user';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class ProfileService {
  public getProfile(): Observable<User> {
    return apiService.get<User>('/profile').pipe(map((response) => plainToInstance(User, response)));
  }

  public updateProfile(user: User): Observable<User> {
    return apiService.put<void>('/profile', instanceToPlain(user)).pipe(map(() => user));
  }
}

export const profileService = new ProfileService();
