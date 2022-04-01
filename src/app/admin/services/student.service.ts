import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, take } from 'rxjs/operators';
import { Student } from 'src/app/models/Student';
import { getLocaleDayPeriods } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API = `${environment.API}alunos`;

  constructor(private httpClient: HttpClient) { }

  getStudents() {
    return this.httpClient.get<Student[]>(this.API)
      .pipe(
        retry(2)
      )
  }

  getStudentById(id: number) {
    return this.httpClient.get<Student>(this.API + '/' + id)
      .pipe(
        retry(2)
      )
  }

  createStudent(student: Student) {
    return this.httpClient.post(this.API, student).pipe(take(1));
  }

  updateStudent(student: Student) {
    return this.httpClient.put<Student>(this.API + '/' + student.id, student)
    .pipe(
      take(1)
    )
  }

  deleteStudent(id: Number) {
    return this.httpClient.delete<Student>(this.API + '/' + id)
    .pipe(
      retry(1)
    )
  }


}
