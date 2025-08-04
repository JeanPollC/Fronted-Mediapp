import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { consultListExamDTOI } from '../model/consutListExamDTOI';
import { FilterConsultDTO } from '../model/FilterConsultDTO';
import { Consult } from '../model/consult';
import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url : string = `${environment.HOST}/consults`

  constructor(private http: HttpClient) { }

  saveTransactional(dto:  consultListExamDTOI){
    return this.http.post(this.url, dto)
  }

  searchOthers (dto: FilterConsultDTO){
    return this.http.post<Consult[]>(`${this.url}/search/others`, dto);
  }

  searchDates(date1: string, date2: string){
    /*const params: HttpParams = new HttpParams();
    params.set('date1', date1);
    params.set('date2', date2);

    return this.http.get<Consult[]>(`${this.url}/search/dates`, {params: params});*/

    return this.http.get<Consult[]>(`${this.url}/search/dates?date1=${date1}&date2=${date2}`);
  }

  getExamsByIdConsult(idConsult: number){
    return this.http.get<Exam[]>(`${environment.HOST}/consultexams/${idConsult}`);
  }

  callProcedureOrFuntion(){
    return this.http.get<any>(`${this.url}/getProcedureNative`)
  }

  generateReport(){
    return this.http.get(`${this.url}/generateReport`, {responseType: 'blob'});
  }

  saveFile(data: File){
    const formData : FormData = new FormData();
    formData.append('file', data)

    return this.http.post(`${this.url}/saveFile`, formData)
  }

  readFile(id: number){
    return this.http.get(`${this.url}/readFile/${id}`, {responseType: 'blob'});
  }

}
