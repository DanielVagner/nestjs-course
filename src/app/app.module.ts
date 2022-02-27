import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './shared/material/material.module';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AuthModule.forRoot(),
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
