import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth, authState, updateProfile, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {from, switchAll, switchMap}from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(private auth:Auth) { }

 login(username:string,password:string){
  return from(signInWithEmailAndPassword(this.auth,username,password));
 } 
 
  signUp(name:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({user}) => updateProfile(user,{displayName: name})) )
  }

 logout(){
  return from(this.auth.signOut());
 }
}
