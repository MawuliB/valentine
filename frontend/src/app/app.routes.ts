import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CelebrationComponent } from './celebration/celebration.component';
import { InteractiveComponent } from './interactive/interactive.component';

export const routes: Routes = [
  { path: '', redirectTo: '/interactive/:username', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'interactive/:username', component: InteractiveComponent },
  { path: 'celebration/:username', component: CelebrationComponent },
  { path: '**', redirectTo: '/interactive/:username' }
];
