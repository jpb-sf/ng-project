import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { DisplayLoginService } from 'shared/services/display-login.service';
import { ErrorMessagesService } from 'shared/services/error-messages.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form;
  focused: boolean = false;
  @Input('displayLoginNav') displayLoginNav: boolean = false;
  emptyCartError: boolean = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';

  constructor(
    private auth: AuthService, 
    private fb: FormBuilder, 
    private screenBrightnessService: ScreenBrightnessService,
    private displayLoginService: DisplayLoginService, 
    private errorMessageService: ErrorMessagesService
    ) {
    this.form = this.fb.group({
      email: ['', 
      [
          Validators.email,
          Validators.required 
      ]],
      password:['', Validators.required]
    })
  }

  get email() { return this.form.get('email') };

  ngOnInit(): void {
    this.errorMessageService.emptyCart$
    .subscribe((error: boolean) => {
      console.log(`ngOnInit() is being clled from login.comp`);
      this.emptyCartError = error;
    }) 
  }
  
  async onSubmit(id: string)
  {
    if (this.form.valid)
    {
      const formVals = this.form.getRawValue();
      if (formVals.email && formVals.password)
      {
        const loginResult = await this.auth.login(id, formVals.email, formVals.password);
        console.log(`loginResult is ${loginResult }`)
        if (loginResult == "auth/too-many-requests")
        {
          this.loginError = true; 
          this.loginErrorMessage = "For security purposes, this account has beeb temporalily locked. Please try again later." 
        }
        if (loginResult == "auth/wrong-password")
        {
          this.loginError = true;
          this.loginErrorMessage = "The password is invalid. Please try again."   
        }

        if (loginResult == "auth/user-not-found")
        {
            this.loginError = true;
            this.loginErrorMessage = "This email address is not recognized."
        }
      }
    }
  }

  checkout()
  {
    //   if there is no empty cart error
    if (!this.emptyCartError)
    {
      this.screenBrightnessService.changeBrightness();
      this.displayLoginService._setDisplayLogin(false);
    }
  }

}
                
            
