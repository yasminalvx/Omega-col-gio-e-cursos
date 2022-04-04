import { Student } from './../../shared/models/Student';
import { Teacher } from './../../shared/models/teacher';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  type!: Student[] | Teacher[];
  isStudent: boolean = false;
  getDetails: boolean = true;
  id: number = 1;

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isStudent = this.router.url == '/alunos';
    this.loadList();
  }

  loadList() {
    this.isStudent ? this.studentService.getStudents().subscribe(data => this.type = data) : this.teacherService.getTeachers().subscribe(data => this.type = data);
  }

  delete(id: number) {
    this.isStudent ? this.studentService.deleteStudent(id).subscribe() : this.teacherService.deleteTeacher(id).subscribe();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
