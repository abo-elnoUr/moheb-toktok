import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  badCredential = false;
  error = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {

    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(31),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(31)
      ])
    });
  }
  ngOnInit(): void {
  }

  login(loginForm: FormGroup) {
    const formValue = loginForm.value;
    this.userService.loginUsers(formValue).subscribe(response => {
      if (response.token) {
        console.log(response) ;
        localStorage.setItem('currentUser', JSON.stringify((response.token)));
        localStorage.setItem('role', JSON.stringify((response.user.role)));
        this.router.navigate(['/']);
      }
    }, err => {
      if (err.status === 403) {
        this.badCredential = true;
        this.loginForm.reset();
        setTimeout(() => {
          this.badCredential = false;
        }, 7000);
      } else {
        this.error = true;
        this.loginForm.reset();
        setTimeout(() => {
          this.error = false;
        }, 7000);
      }
    });
    // this.loginForm.reset();
  }
}
