import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // navigating the user when they login to the intended url. Doing this here because OAuth, redrirect
  constructor( private authService: AuthService, private userService: UserService, router: Router) {
    // app component is a single instance so don't worry about unsubscribing
    this.authService.user$.subscribe(user => {
        if(user){
            let returnUrl = localStorage.getItem('returnUrl');
            console.log('appComponent refresh')
            if (returnUrl && returnUrl != "null")
            {       
               
                console.log(`returnUrl is ${returnUrl}`);
                localStorage.removeItem('returnUrl');
                return router.navigateByUrl(returnUrl);
            }
            return; 
        }
        return;
    })
}
}
