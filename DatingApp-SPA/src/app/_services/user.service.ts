import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const url = this.baseUrl + 'users';
    const paginatedResult = new PaginatedResult<User[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(url, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, user: User) {
    const url = `${this.baseUrl}users/${id}`;

    return this.http.put(url, user);
  }

  setMainPhoto(userId: number, id: number) {
    const url = `${this.baseUrl}users/${userId}/photos/${id}/setMain`;

    return this.http.post(url, {});
  }

  deletePhoto(userId: number, id: number) {
    const url = `${this.baseUrl}users/${userId}/photos/${id}`;

    return this.http.delete(url);
  }
}

