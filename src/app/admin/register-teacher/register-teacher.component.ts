import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Validator } from '../../assets/Validators';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  formTeacher!: FormGroup;
  location!: Location;
  isEdit: boolean = false;
  Idteacher: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private route: Router,
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {

    this.formTeacher = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contact: [null, [Validators.required, Validator.ValidaContact]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required ,Validators.minLength(8), Validators.maxLength(12)]]
    });

    let urlActive = this.route.url;
    if (urlActive.includes('edit') == true) {
      this.isEdit = true;
      this.Idteacher = parseInt(urlActive.replace('/professores/edit/', ''));
      this.updateForm(this.Idteacher);
    }

    console.log(this.formTeacher)
  }

  updateForm(id: number) {
    return this.teacherService.getTeacherById(id)
    .subscribe(
      data => {
        this.formTeacher.controls['name'].setValue(data.name);
        this.formTeacher.controls['contact'].setValue(data.contact);
        this.formTeacher.controls['email'].setValue(data.email);
        this.formTeacher.controls['password'].setValue(data.password);
      }
    )
  }

  createteacher(teacher: Teacher) {
    this.teacherService.getTeachers()
    .subscribe(data => {
      teacher.id = data.length + 1;
      this.teacherService.createTeacher(teacher)
      .subscribe(
        success => this.route.navigate(['professores']),
        error => console.error()
        );
    });
  }

  onClick() {
    this.formTeacher.valid ? this.createteacher(this.formTeacher.value) : console.log('formulário inválido!');
  }

  onEdit() {
    const teacher: Teacher = this.formTeacher.value;
    teacher.id = this.Idteacher;
    console.log(teacher);

    this.teacherService.updateTeacher(teacher)
    .subscribe(
      success => this.route.navigate(['professores']),
      error => console.error()
    )
  }

  getFormControl(id: string) {
    return this.formTeacher.controls[id] ? this.formTeacher.controls[id]:  this.formTeacher.controls['name'];
  }

  isValid(controlName: any) {
    const control = this.getFormControl(controlName);
    return control.touched ? this.validatorService.isValid(control) ? 'is-valid' : 'is-invalid' : '';
  }

  onKeyUp(event: any) {
    const id = event.target.id;
    id == 'contact' ? this.validatorService.contact(this.formTeacher.controls.contact, this.formTeacher) : null;
  }

}
