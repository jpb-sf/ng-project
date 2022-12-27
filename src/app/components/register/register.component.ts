import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
  
  constructor(private auth: AuthService, fb: FormBuilder) {
    this.form = fb.group({
      email: ['', 
      [
          Validators.email,
          Validators.required
      ]],
      password:['', Validators.required],
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

  test(ctrl: any)
  { 
    console.log(ctrl.value.length)
    console.log('test')
    console.log(ctrl)
  }

  removeEmailError(ctrl: any)
  {
    ctrl.setErrors({email: null, customLength: null})
  }

  registerSubmit()
  {
    this.formVals = this.form.getRawValue();
    this.stepOne = false;
    // if (formVals.email && formVals.password)
    // this.auth.login(id, formVals.email, formVals.password);
  }

  submit(event: any)
  {
    // Removing property
    const {['confirm']: remove, ...rest } = this.formVals;
    // Combining properties
    this.formVals = {...rest, ...event }
    this.auth.registerUser(this.formVals)
  }
}

