import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService){}
  canActivate(): boolean{
    if (this.auth.loggedIn()) {
    return true;
    }
    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
  }
}
