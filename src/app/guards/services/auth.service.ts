import { Admin } from 'src/app/models/admin';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}admin`;

  constructor(private httpClient: HttpClient) { }

  getAdmins() {
    return this.httpClient.get<Admin[]>(this.API)
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

  async AuthAdmin(email: string, password: string) {
    const response = await this.getAdmins().toPromise();
    for(let admin of response) {
      if (admin.email == email && admin.password == password) {
        return true;
      }
    }
    return false;
  }
}
