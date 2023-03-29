import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';
import { CustomValidators } from 'Validators/validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  form;
  focused: boolean = false;
  formVals?: any;
  stepOne?: boolean = true;
  @Output('onDisplayLogin') onDisplayLogin = new EventEmitter();
  
  constructor(private auth: AuthService, fb: FormBuilder) {
    this.form = fb.group({
      email: ['', 
      [
          Validators.email,
          Validators.required
      ]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    }, { validators: Validators.compose(
        [
          CustomValidators.match('password','confirm'), 
          CustomValidators.customLength("email", 1)
        ])
      })
   } 

  get email() { return this.form.get('email') };
  get password() { return this.form.get('password') };
  get confirm() { return this.form.get('confirm') };

  removeEmailError(ctrl: any)
  {
    ctrl.setErrors({ email: null, customLength: null })
  }

  registerSubmit()
  {
    this.formVals = this.form.getRawValue();
    if (this.formVals.email && this.formVals.password)
    this.stepOne = false;
    // this.auth.login("register", this.formVals.email, this.formVals.password);
  }

  submit(event: any)
  {
    if (this.form.valid)
    {
      // Removing property
      const { ['confirm']: remove, ...rest } = this.formVals;
      // Combining properties
      this.formVals = {...rest, ...event }
      this.auth.registerUser(this.formVals)
    }
  }

  displayLogin()
  {
    this.onDisplayLogin.emit();
  }
}

