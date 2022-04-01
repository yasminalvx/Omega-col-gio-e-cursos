import { Student } from './../models/Student';
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


  constructor(
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents()
      .subscribe(
        data => {
          this.students = data;
        }
      )
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
