import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { API_PATH, TOKEN_PREFIX } from 'src/app/constants/IMPData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any[];

  constructor(private http: HttpClient) {
    this.user = [];

    if (localStorage.getItem('token') !== null) {
      const userData = {
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id'),
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
      };
      this.user.push(userData);
    }
  }

  // Get current logged-in user
  getCurrentUser() {
    return of(this.user);
  }

  // SIGNUP USER — FIXED
  signupUser(user: any) {
  return this.http.post(`${API_PATH}/auth/signup`, {
    username: user.name,        // IMPORTANT FIX 🔥
    password: user.password,
    phoneNo: user.phoneNo,
    email: user.email,
    name: user.name,
  });
}


  // LOGIN USER
  loginUser(user: any) {
    console.log('Login User');

    return this.http.post(`${API_PATH}/auth/login`, {
      username: user.username,
      password: user.password,
    });
  }

  logoutUser() {
    return this.user.splice(0, 1);
  }

  // ACCOUNT SETTINGS
  getCurrentUserData() {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/user/userdata`,
      {},
      {
        headers: {
          authorization: `${TOKEN_PREFIX} ${jwt_token}`,
        },
      }
    );
  }

  updateAccountDetails(data: any) {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/user/updatedata`,
      { data: data },
      {
        headers: {
          authorization: `${TOKEN_PREFIX} ${jwt_token}`,
        },
      }
    );
  }

  changeUserPassword(data: any) {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/user/changepassword`,
      {
        data: {
          oldpassword: data.oldPassword,
          newpassword: data.newPassword,
        },
      },
      {
        headers: {
          authorization: `${TOKEN_PREFIX} ${jwt_token}`,
        },
      }
    );
  }
}
