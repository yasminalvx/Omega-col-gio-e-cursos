import { Student } from 'src/app/shared/models/Student';
import { StudentService } from './../../admin/services/student.service';
import { ValidatorService } from './../../admin/services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validator } from 'src/app/shared/Validators';

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.css']
})
export class RegistrationStudentComponent implements OnInit {

  formStudent!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private validatorService: ValidatorService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.formStudent = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      age: [null, [Validators.required, Validator.ValidaAge]],
      contact: [null, [Validators.required, Validator.ValidaContact]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onClick() {
    this.isSubmitted = this.formStudent.valid;
    this.isSubmitted ? this.createStudent(this.formStudent.value) : console.log('formulário inválido');
  }

  createStudent(student: Student) {
    this.studentService.createStudentPending(student)
    .subscribe(
      success => {
        this.route.navigate(['cursos']);
      },
      error => console.error()
      );
  }

  getFormControl(id: string) {
    return this.formStudent.controls[id] ? this.formStudent.controls[id]:  this.formStudent.controls['name'];
  }

  isValid(controlName: any) {
    const control = this.getFormControl(controlName);
    return control.touched ? this.validatorService.isValid(control) ? 'is-valid' : 'is-invalid' : '';
  }

  onKeyUp(event: any) {
    const id = event.target.id;
    id == 'contact' ? this.validatorService.contact(this.formStudent.controls.contact, this.formStudent) : null;
  }

}
