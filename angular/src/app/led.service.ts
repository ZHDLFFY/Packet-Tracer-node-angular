import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LedService {

  constructor(private httpClient: HttpClient) { }

  getLeds() {
    return this.httpClient.get('http://127.0.0.1:3000/led');
  }

  changeLed(id, status) {
    return this.httpClient.post('http://127.0.0.1:3000/led/' + id + '/' + status, {});
  }

}


