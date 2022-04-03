import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Validator } from '../../assets/Validators';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  formStudent!: FormGroup;
  location!: Location;
  isEdit: boolean = false;
  IdStudent: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: Router,
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {

    this.formStudent = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      age: [null, [Validators.required, Validator.ValidaAge]],
      contact: [null, [Validators.required, Validator.ValidaContact]],
      date: [null, [Validators.required, Validator.validaDate]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required ,Validators.minLength(8), Validators.maxLength(12)]]
    });

    let urlActive = this.route.url;
    if (urlActive.includes('edit') == true) {
      this.isEdit = true;
      this.IdStudent = parseInt(urlActive.replace('/alunos/edit/', ''));
      this.updateForm(this.IdStudent);
    }

    console.log(this.formStudent)
  }

  updateForm(id: number) {
    return this.studentService.getStudentById(id)
    .subscribe(
      data => {
        this.formStudent.controls['name'].setValue(data.name);
        this.formStudent.controls['age'].setValue(data.age);
        this.formStudent.controls['contact'].setValue(data.contact);
        this.formStudent.controls['date'].setValue(data.date);
        this.formStudent.controls['email'].setValue(data.email);
        this.formStudent.controls['password'].setValue(data.password);
      }
    )
  }

  createStudent(student: Student) {
    this.studentService.getStudents()
    .subscribe(data => {
      student.id = data.length + 1;
      this.studentService.createStudent(student)
      .subscribe(
        success => this.route.navigate(['alunos']),
        error => console.error()
        );
    });
  }

  onClick() {
    this.formStudent.valid ? this.createStudent(this.formStudent.value) : console.log('formulário inválido!');
  }

  onEdit() {
    const student: Student = this.formStudent.value;
    student.id = this.IdStudent;
    console.log(student);

    this.studentService.updateStudent(student)
    .subscribe(
      success => this.route.navigate(['alunos']),
      error => console.error()
    )
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
