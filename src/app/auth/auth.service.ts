import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signedIn$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username
      }
      );
    }
    
  signUp(credentials: SignupCredentials){    
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, { credentials }, {
                    withCredentials: true
                  })
                .pipe(
                  tap(()=> this.signedIn$.next(true))
                );
              }
              
  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`, { withCredentials: true })
    .pipe(
      tap(({authenticated}) => this.signedIn$.next(authenticated))
    )
  }
                
  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(()=> this.signedIn$.next(false))
    );
  }

  signIn(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
                .pipe(
                  tap(()=> this.signedIn$.next(true))
                );          
  }
}
