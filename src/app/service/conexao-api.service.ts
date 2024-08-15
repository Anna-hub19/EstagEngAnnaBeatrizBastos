import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexaoApiService {

  constructor(private http: HttpClient) { }
  //validar o cpf
  ValidateCpf(cpf: string): Observable <any>{
   const url = `http://localhost:5124/cpf/validar/${cpf}`
   return this.http.get(url);
  }
}
