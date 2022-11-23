import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form;
  constructor(private auth: AuthService, fb: UntypedFormBuilder) {
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
    this.auth.login(id, formVals.email, formVals.password)
  }

}
                
            
