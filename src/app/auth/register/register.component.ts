import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '../../service/snack-bar.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['password', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth.register(val.email, val.password, 'STUDENT').subscribe(
      () => {
        this.router.navigateByUrl('/login');
      },
      (err) => {
        this.snackBarService.displaySnackBar(err.error.errorMessage, 'ok');
      }
    );
  }
}
