import { Student } from '../shared/models/Student';
import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  students!: Student[];
  pending!: Student[];
  hasPending: boolean = false;


  constructor(
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchPending();
  }

  async searchPending() {
    const response = await this.studentService.getStudentsPending().toPromise();
    response ? this.hasPending = true: false;
    this.students = response;
  }

  async onClick(student: Student) {
    const response = await this.studentService.getStudents().toPromise();
    const id = student.id;
    student.id = response[response.length-1].id + 1;
    const date = new Date();
    this.createStudent(student, id);
  }

  createStudent(student: Student, id: number) {
    this.studentService.createStudent(student).subscribe(
      sucess => this.router.navigate([`alunos/edit/${student.id}`]),
      error => console.error
    );
    this.studentService.deletePending(id).subscribe();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
