import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from 'src/app/shared/models/teacher';
import { environment } from 'src/environments/environment';
import { retry, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly API = `${environment.API}professores`;

  constructor(private httpClient: HttpClient) { }

  getTeachers() {
    return this.httpClient.get<Teacher[]>(this.API)
      .pipe(
        retry(2)
      )
  }

  getTeacherById(id: number) {
    return this.httpClient.get<Teacher>(this.API + '/' + id)
      .pipe(
        retry(2)
      )
  }

  createTeacher(teacher: Teacher) {
    return this.httpClient.post(this.API, teacher).pipe(take(1));
  }

  updateTeacher(teacher: Teacher) {
    return this.httpClient.put<Teacher>(this.API + '/' + teacher.id, teacher)
    .pipe(
      take(1)
    )
  }

  deleteTeacher(id: Number) {
    return this.httpClient.delete<Teacher>(this.API + '/' + id)
    .pipe(
      retry(1)
    )
  }

}
