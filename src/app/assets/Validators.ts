import { AbstractControl } from "@angular/forms";
import { ValidatorService } from "../admin/services/validator.service";

export class Validator {

  static ValidaContact(control: AbstractControl) {
    const contact = control.value;
    // console.log(control)
    if (contact && contact !== '') {
      const validacontact = /\(\d\d\) \d{5}-\d{4}/;
      return validacontact.test(contact) ? null : {contactInvalido: true}
    }
    return null;
  }

  static ValidaAge(control: AbstractControl) {
    const age = control.value;
    if (age && age !== '') {
      return age >= 4 && age < 19 ? null : {ageInvalido: true}
    }
    return null;
  }

  static validaDate(control: AbstractControl) {
    const timeMsYear =  31557600000;
    // console.log(control.value)
    const dateStr = control.value;
    if (control.value) {
      const year = parseInt(dateStr.slice(0, 4));
      const month = parseInt(dateStr.slice(5, 7));
      const day = parseInt(dateStr.slice(8, 10));

      const date = new Date(year, month, day);
      const dateNow = new Date();

      const currentTime = dateNow > date ? dateNow.getFullYear()*timeMsYear - date.getFullYear()*timeMsYear: date.getTime() - dateNow.getTime();

      console.log(currentTime, ':', 4*timeMsYear, ':', currentTime >= 4*timeMsYear);
      return currentTime >= 4*timeMsYear && currentTime < 19*timeMsYear ? null : {ageInvalido: true}
    }

    return false;
  }
}
