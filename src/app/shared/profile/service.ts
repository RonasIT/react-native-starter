import { apiService } from '@shared/api/service';
import { User } from '@shared/user';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class ProfileService {
  public getProfile(): Observable<User> {
    return apiService.get<User>('/profile').pipe(map((response) => plainToClass(User, response)));
  }

  public updateProfile(user: User): Observable<User> {
    return apiService.put<void>('/profile', classToPlain(user)).pipe(map(() => user));
  }
}

export const profileService = new ProfileService();
