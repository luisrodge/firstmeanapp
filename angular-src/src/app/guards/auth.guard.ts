import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    // Inject services
    constructor(private authService: AuthService, 
        private router: Router) {}
    
    // Use AuthGuard to check if user is logged in
    // if not redirect user to login route
    canActivate() {
        if (this.authService.loggedIn()){
            return true
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
