import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Medic } from '../model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic>{

  constructor() { 
    super(
      inject(HttpClient),
      `${environment.HOST}/medics`
    )
  }

}
