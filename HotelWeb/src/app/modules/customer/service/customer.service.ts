import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8081/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getRooms(pageNumber: number): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  bookRoom(bookingDto: any): Observable<any>{
    return this.http.post(BASIC_URL + `api/customer/book`, bookingDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set (
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

  getMyBookings(pageNumber: number): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/booking/${userId}/${pageNumber}`, {
      headers: this.createAuthorizationHeader()
    });
  }
}
