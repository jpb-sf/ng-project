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
  constructor(private userService: UserService, private authService: AuthService, router: Router) {
    // app component is a single instance so don't worry about unsubscribing
    // this need to be an actual change
    this.authService.user$.subscribe(user => {
        let returnUrl = localStorage.getItem('returnUrl');
        console.log('appComponent refresh')
        if (returnUrl && returnUrl != "null")
        {   
            // userService.save(user)
            console.log(`returnUrl is ${returnUrl}`);
            localStorage.removeItem('returnUrl');
            return router.navigateByUrl(returnUrl);
        }
        return; 
    })
}
}
