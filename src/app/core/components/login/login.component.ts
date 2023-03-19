import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { DisplayLoginService } from 'shared/services/display-login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form;
  @Input('displayLogin') displayLogin: boolean = false;
  @Input('locationOfLogin') locationOfLogin: string = '';
  
  constructor(
    private auth: AuthService, 
    private fb: FormBuilder, 
    private screenBrightnessService: ScreenBrightnessService,
    private displayLoginService: DisplayLoginService
    ) {
    this.form = fb.group({
      email: ['', 
      [
          Validators.email,
          Validators.required 
      ]],
      password:['', Validators.required]
    })
  }
  
  onSubmit(id: string)
  {
    const formVals = this.form.getRawValue();
    if (formVals.email && formVals.password)
    this.auth.login(id, formVals.email, formVals.password);
  }

  checkout()
  {
    this.screenBrightnessService.changeBrightness();
    this.displayLoginService._setDisplayLogin();
  }

}
                
            
