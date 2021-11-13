import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router) {

      this.form = fb.group({
          email: ['student@angular-university.io', [Validators.required]],
          password: ['password', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password).subscribe((res: any)=>{
      localStorage.setItem("authJwtToken", res.authJwtToken);
      
      this.router.navigateByUrl('/courses');
      },
      err => {
        alert('Login failed');
      });
  }

}

