import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam>{

  constructor() {
    super(
    inject(HttpClient),
    `${environment.HOST}/exams`
   );
  }
}
