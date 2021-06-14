import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://0.0.0.0:8000/user';
 
  constructor(private http: HttpClient) { }
  get(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  get_count() {
    return this.http.get(`${this.baseUrl}/count`);
  }

  get_by_email(email) {
    return this.http.get(`${this.baseUrl}/user_get/${email}`);
  }
  createTel(id :number, value:any): Observable<object>
  {
    return this.http.patch(`${this.baseUrl}/partiel/${id}`, value);
  }
  search_by_Query(query: any): Observable<object>
{
  return this.http.get(`${this.baseUrl}/search/${query}`);
}
  getCustomer(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getCustomer_nom(nom: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/${nom}`);
  }
 
  createContact(contact: Object, groupe_id:number): Observable<object> {
    return this.http.post(`${this.baseUrl}/add/${groupe_id}`, contact);
  }
  createContact_Gr0(contact: Object): Observable<object> {
    return this.http.post(`${this.baseUrl}/add`, contact);
  }

  updateContact(id: number,groupe_id:number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/put/${id}/${groupe_id}`, value);
  }
  updateContact_0(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/put_0/${id}`, value);
  }
 
  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
 
  getContactList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
 
  getCustomersByNom(nom: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/s_nom/${nom}`);
  }
  getCustomersByGroupe(nom_groupe: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/s_groupe/${nom_groupe}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_all`);
  }
}
