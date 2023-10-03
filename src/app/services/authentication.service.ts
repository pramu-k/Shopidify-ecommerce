import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserInfo
} from "@angular/fire/auth";
import {concatMap, from, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  signUp(name:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password))
      .pipe(switchMap(({user})=>updateProfile(user,{displayName:name})));
  }
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
  updateProfileData(profileData:Partial<UserInfo>):Observable<any>{
    const user=this.auth.currentUser;
    return of(user).pipe(
      concatMap(user=>{
        if(!user)throw new Error('Not Authenticated');

        return updateProfile(user,profileData);
      })
    )

  }

}
