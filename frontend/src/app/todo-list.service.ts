import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private baseUrl = 'http://localhost:8000/todo_list';
 
  constructor(private http: HttpClient) { }
  Get(id): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  GetTodo_list(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  GetSalarier_by_date(id: number, annee:number, mois:number): Observable<object> {
    return this.http.get(`${this.baseUrl}/date/${id}/${annee}/${mois}`);
  }

  CreateTodo_list(todo_list: Object, query:any): Observable<object> {
    return this.http.post(`${this.baseUrl}/query`, todo_list);
  }
  CreateSalarier_with_service(salarier: Object, service_id:number): Observable<object> {
    return this.http.post(`${this.baseUrl}/add_with_service/${service_id}`, salarier);
  }
  CreateTodo_list_with_categorie(todo_list: any, categorie_id:number): Observable<object> {
    return this.http.post(`${this.baseUrl}/post_with_cat/${categorie_id}`, todo_list);
  }
  Update_salarier_avec_service(pk: number, service_id:number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/salarier_put_with_service/${pk}/${service_id}`, value);
  }
  Update_salarier_avec_poste(pk: number, categorie_id:number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/put_with_cat/${pk}/${categorie_id}`, value);
  }
  UpdateTodo_list(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  DeleteSalarier_du_serv(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/effacer_sal_du_serv/${id}`);
  }
  DeleteTodo_list(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  GetTodo_list_List(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}