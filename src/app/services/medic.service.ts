import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Medic } from '../model/medic';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic>{

  private medicChange: Subject<Medic[]> = new Subject<Medic[]>();
  private messageChange: Subject<string> = new Subject<string>();
 
  constructor() { 
    super(
      inject(HttpClient),
      `${environment.HOST}/medics`
    )
  }

  setMedicChange(data: Medic[]){
    this.medicChange.next(data);
  }

  getMedicChange(){
    return this.medicChange.asObservable();
  }

  setMessageChange(message: string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

}
