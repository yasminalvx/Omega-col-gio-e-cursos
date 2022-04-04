import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/models/course';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses!:Course[];

  constructor(
    private courseService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadcourses();
  }

  loadcourses() {
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }

  onClick(id: number) {
    this.router.navigate([`cursos/matricula/${id}`]);
  }

}
