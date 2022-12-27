import { ValidatorFn, AbstractControl } from "@angular/forms";

export class CustomValidators {
  static match(controlName: string, matchControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);

      if (!matchControl?.errors && control?.value !== matchControl?.value) {
          matchControl?.setErrors({
            matching: {
              actualValue: matchControl?.value,
              requiredValue: control?.value
            }
        });
        return { matching: true };
      }
      return null;
    };
  }

  static customLength(controlName: string, min?: number, max?: number): ValidatorFn {
    return (controls: AbstractControl) => {
      if (!min && !max) return null;
      const control = controls.get(controlName);
      if (control && min)
      {
        console.log('firing the custom min')
        if (Number(control.value.length) < min)
        { 
          control.setErrors({
            customMinLength: {
              actualMinLength: control.value.length,
              requiredMinLength: min
            }
          })
          console.log('firing the custom min part 2')
          return {customMinLength: true}
        }
      }
   
      if (control && max)
      {
        console.log('firing the custom max')
        if (Number(controls.value.length) > max)
        {
          return {customMaxLength: true}
        }
      }
      return null
    }
  }
}

