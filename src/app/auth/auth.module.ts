import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
