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
  @Output('onDisplayLogin') onDisplayLogin = new EventEmitter();
  form;
  emailControlFocused: boolean = false;
  pwControlFocused: boolean = false;
  formVals?: any;
  formSubmitted: boolean = false;
  registerSequence: "email-pw" | "username" | "error" = "email-pw";
  
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
    {
      this.registerSequence = "username";
    } 
    else 
    {
      this.formSubmitted = true;
    }
  }

  async submit(event: any)
  {
    if (this.form.valid)
    {
      // Removing property
      const { ['confirm']: remove, ...rest } = this.formVals;
      // Combining properties
      this.formVals = {...rest, ...event }
      let registerResults = await this.auth.registerUser(this.formVals)
      console.log(`registerResults is ${registerResults}`);
      if (typeof(registerResults) == 'string')
      {
        this.registerSequence = "error";
      }
    }
  }

  displayLogin()
  {
    this.onDisplayLogin.emit();
  }

  showRegistrationForm()
  {
    this.registerSequence = "email-pw";
    this.form.reset();
  }
}

