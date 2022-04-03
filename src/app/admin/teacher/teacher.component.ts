import { Teacher } from './../../models/teacher';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers!:Teacher[];

  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadteachers();
  }

  loadteachers() {
    this.teacherService.getTeachers()
      .subscribe(
        data => {
          this.teachers = data;
        }
      )
  }

  deleteTeacher(id: number) {
    this.teacherService.deleteTeacher(id).subscribe();
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
