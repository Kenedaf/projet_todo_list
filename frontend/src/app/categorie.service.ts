import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:8000/categorie';
 
  constructor(private http: HttpClient) { }
  Get(id): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  GetCategorie_by_id(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/detail/${id}`);
  }
  GetCategorieList(query:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${query}`);
  }
  CreateCategorie(categorie: Object,query:any): Observable<object> {
    return this.http.post(`${this.baseUrl}/${query}`, categorie);
  }
  UpdateCategorie(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/detail/${id}`, value);
  }
  DeleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/detail/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}