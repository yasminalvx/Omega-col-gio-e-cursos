import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [AuthGuard, LoginGuard]
})
export class LoginModule { }
