import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  contact(control: AbstractControl, form: FormGroup) {
    let contact = this.isContact(control.value);
    form.controls.contact.setValue(contact);

    contact[0] != '(' ? contact = '(' + contact: contact;

    if (contact.length >= 3 && contact[3] != ')' && contact[0] == '(') {
      contact = contact.slice(0, 3) + ') ' + contact.slice(3);
    }
    if (contact.length >= 10 && contact[10] != '-' && contact[0] == '(' && contact[3] == ')') {
      contact = contact.slice(0, 10) + '-' + contact.slice(10);
    }
    contact.length > 14 ? contact = contact.slice(0, 15) : contact = contact;

    form.controls.contact.setValue(contact);
  }

  isContact(contact: string) {
    let result = '';
    const characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', ' ', '-'];
    for (let character of contact) {
      characters.includes(character) ? result += character: result = result;
    }
    return result;
  }

  formatDate(date: string) {
    console.log('dia', parseInt(date.slice(0, 2)))
  }

  isValid(control: AbstractControl) {
    return control.valid && control.touched;
  }
}
