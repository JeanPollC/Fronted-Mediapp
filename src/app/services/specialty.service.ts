import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Specialty } from '../model/specialty';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty> {

  constructor() { 
    super(
      inject(HttpClient),
      `${environment.HOST}/specialties` 
    )
  }
}
