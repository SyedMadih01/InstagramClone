import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://randomuser.me/api/';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(seed: any): any {
    return this.http.get(this.apiUrl+'?seed='+seed).toPromise();
  }
}
