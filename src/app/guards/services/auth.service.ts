import { Student } from '../../shared/models/Student';
import { Teacher } from '../../shared/models/teacher';
import { Admin } from 'src/app/shared/models/admin';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}admin`;
  private readonly APIstudent = `${environment.API}alunos`;
  private readonly APIteacher = `${environment.API}professores`;

  constructor(private httpClient: HttpClient) { }

  // getAdmins() {
  //   return this.httpClient.get<Admin[]>(this.API)
  //     .pipe(
  //       retry(2)
  //     )
  // }

  // getStudents() {
  //   return this.httpClient.get<Student[]>(this.APIstudent)
  //     .pipe(
  //       retry(2)
  //     )
  // }

  // getTeachers() {
  //   return this.httpClient.get<Teacher[]>(this.APIteacher)
  //     .pipe(
  //       retry(2)
  //     )
  // }

  getAny(API: string) {
    return this.httpClient.get<Teacher[] | Student[] | Admin[]>(API)
      .pipe(
        retry(2)
      )
  }

  getAdminById(id: number) {
    return this.httpClient.get<Admin>(this.API + '/' + id)
      .pipe(
        retry(2)
      )
  }

  async AuthAny(email: string, password: string, typeUser: string) {
    const response = typeUser == 'admin' ? await this.getAny(this.API).toPromise():
          typeUser == 'student' ? await this.getAny(this.APIstudent).toPromise():
          await this.getAny(this.APIteacher).toPromise();

    for(let user of response) {
      if (user.email == email && user.password == password) {
        return true;
      }
    }
    return false;
  }

  // async AuthAdmin(email: string, password: string) {
  //   const response = await this.getAdmins().toPromise();
  //   for(let admin of response) {
  //     if (admin.email == email && admin.password == password) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // async AuthStudent(email: string, password: string) {
  //   const response = await this.getStudents().toPromise();
  //   for(let student of response) {
  //     if (student.email == email && student.password == password) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // async AuthTeacher(email: string, password: string) {
  //   const response = await this.getTeachers().toPromise();
  //   for(let student of response) {
  //     if (student.email == email && student.password == password) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
