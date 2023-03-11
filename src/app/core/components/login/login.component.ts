import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form;
  @Input('displayLogin') displayLogin: boolean = false;
  constructor(private auth: AuthService, fb: FormBuilder) {
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

}
                
            
