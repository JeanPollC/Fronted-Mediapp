import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient>{

  //private url: string = `${environment.HOST}/patients`;
  private patientChange: Subject<Patient[]> = new Subject<Patient[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(){
    super(
      inject(HttpClient),
      `${environment.HOST}/patients`
    )
  }


  //constructor(private http: HttpClient) { }

  /*findAll(){
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient){
    return this.http.post(this.url, patient);
  }

  update(id: number, patient: Patient){
    return this.http.put(`${this.url}/${id}`, patient)
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/

  getPatientChange(){
    return this.patientChange.asObservable();
  }

  setPatientChange(data: Patient[]){
    this.patientChange.next(data);
  }

  getMessageChangue(){
    return this.messageChange.asObservable();
  }

  setMessageChangue(data: string){
    this.messageChange.next(data);
  }


}
