import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
// import { } from 'rxjs';   

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch:true,}
    } 
      return null;
    }
  };


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignUpComponent implements OnInit {
  name1:string=""
  email1:string=''
  password1:string=''
  signUpForm =new FormGroup(
    {
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required),
    },{validators:passwordsMatchValidator()});

  constructor(private authService:AuthenticationService,private toast :HotToastService,private router:Router) {}

  ngOnInit(): void {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }
 
submit(){
  if (!this.signUpForm.valid) return ;

  // { this.name1,this.email1,this.password1 } = this.signUpForm.value;
  this.authService.signUp(this.signUpForm.value.name || '',this.signUpForm.value.email || '',this.signUpForm.value.password || '').pipe(
    this.toast.observe({
      success:'You are signed up!',
      loading:'Signing in',
      error:({message}) => `${message}`
    })
  
  ).subscribe(()=>{
    this.router.navigate(['/home']);
  })
}
}
