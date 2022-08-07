import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse } from '../interface/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRes =  new BehaviorSubject<any>(null);


  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get userResponse$(): Observable<UserResponse> {
    return this.userRes.asObservable();
  }

  get userResponseValue(): UserResponse {
    return this.userRes.getValue();
  }

  get isLoggged$(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  get isLoggedValue(): boolean {
    return this.isLogged.getValue();
  }


  login(authData: any): Observable<any | void> {
    return this.http.post<UserResponse>(`${environment.API_KEY}/auth/login`, authData).pipe(
      map((userResponse: UserResponse) => {
        this.saveLocalStorage(userResponse);
        this.userRes.next(userResponse);
        this.isLogged.next(true);
        return userResponse;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }

  register(userData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_KEY}/users`, userData).pipe(
      map((user: UserResponse) => {
        this.saveLocalStorage(user);
        return user;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }


  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<UserResponse>(`${environment.API_KEY}/auht/change-password`, { currentPassword, newPassword }).pipe(
      map((user: UserResponse) => {
        return user;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }

  logout() {
    localStorage.removeItem('User');
    this.userRes.next(null);
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }



  private checkToken() {
    const user = JSON.parse(localStorage.getItem('User')|| '{}') || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        const { userId, message, ...dataUser } = user; // Operador split(propagación), almacena el resto de propiedades

        this.userRes.next(dataUser);
        console.log(dataUser);
        this.isLogged.next(true);
      }
    }
  }

  private saveLocalStorage(userRes: UserResponse) {
    const { userId, message, ...dataUser } = userRes; // Operador split(propagación), almacena el resto de propiedades

    localStorage.setItem('User', JSON.stringify(dataUser));
  }

  private handlerError(error: Error): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(()=>errorMessage);
  }

  resendEmail(userData: any) {
    console.log(userData);
    return this.http.post<UserResponse>(`${environment.API_KEY}/users/resendEmail`, userData).pipe(
      map((user: UserResponse) => {
        // localStorage.setItem('User.token', JSON.stringify(res.token));
        console.log('Res => ', user);
        return user;
      }),
      catchError(async (err) => alert(err.error.message))
    );
  }
}
