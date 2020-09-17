import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user-models';

@Injectable()
export class UserDaoProvider {

  private userLogin: User;

  constructor(public http: HttpClient) {
  }

  public getUserLogin(email: String, senha: string) {
    return this.http.post('http://192.168.1.130:8181/api/login', {email, senha})
                    .do((user:User) => this.userLogin = user );
  }

  getUser() {
    return this.userLogin;
  }
}
