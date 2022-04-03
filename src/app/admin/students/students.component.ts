import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from './../../models/Student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students!: Student[];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

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
