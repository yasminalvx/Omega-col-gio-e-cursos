import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../shared/models/course';
import { retry, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}cursos`;

  constructor(private httpClient: HttpClient) { }

  getCourses() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        retry(2)
      )
  }

  getCourseById(id: number) {
    return this.httpClient.get<Course>(this.API + '/' + id)
      .pipe(
        retry(2)
      )
  }

  createCourse(Course: Course) {
    return this.httpClient.post(this.API, Course).pipe(take(1));
  }

  updateCourse(Course: Course) {
    return this.httpClient.put<Course>(this.API + '/' + Course.id, Course)
    .pipe(
      take(1)
    )
  }

  deleteCourse(id: Number) {
    return this.httpClient.delete<Course>(this.API + '/' + id)
    .pipe(
      retry(1)
    )
  }
}
