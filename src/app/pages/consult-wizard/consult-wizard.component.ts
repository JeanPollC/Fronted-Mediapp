import { Component, inject, } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { Patient } from '../../model/patient';
import { PatientService } from '../../services/patient.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { consultDetail } from '../../model/consultDetail';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Exam } from '../../model/exam';
import { ExamService, } from '../../services/exam-service.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Medic } from '../../model/medic';
import { MedicService } from '../../services/medic.service';

@Component({
  selector: 'app-consult-wizard',
  imports: [
    MaterialModule,
    MatStepperModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatListModule
  ],
  templateUrl: './consult-wizard.component.html',
  styleUrl: './consult-wizard.component.css'
})
export class ConsultWizardComponent {

  firstFormGroup: FormGroup;
  patients$: Observable<Patient[]>;
  details: consultDetail[] = [];
  exams: Exam[];
  examFiltered$: Observable<Exam[]>
  examControl: FormControl = new FormControl();
  examsSelected: Exam[] = [];
  medics: Medic[] = [];

  private patientService = inject(PatientService);
  private examService = inject(ExamService);
  private medicService = inject(MedicService);

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      patient: new FormControl(),
      consultDate: new FormControl(new Date()),
      exam: this.examControl,
      diagnosis: new FormControl(),
      treatment: new FormControl()
    })
    this.loadInicialData();
  }

  loadInicialData() {
    this.patients$ = this.patientService.findAll();
    this.examService.findAll().subscribe((data) => (this.exams = data));
    this.medicService.findAll().subscribe(data => this.medics = data);

    this.examFiltered$ = this.examControl.valueChanges.pipe(map((val) => this.filterExams(val)));
  }

  filterExams(val: any) {
    if (val?.idExam > 0) {
      return this.exams.filter(
        (el) =>
          el.nameExam.toLowerCase().includes(val.nameExam.toLowerCase()) ||
          el.descriptionExam.toLowerCase().includes(val.descriptionExam.toLowerCase())
      );
    } else {
      return this.exams.filter(
        (el) =>
          el.nameExam.toLowerCase().includes(val?.toLowerCase()) ||
          el.descriptionExam.toLowerCase().includes(val?.toLowerCase())
      );
    }
  }

  showExam(val: any){
    return val ? val.nameExam : val;
  }

  addDetail() {
    const det = new consultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    const tmpExam: Exam = this.firstFormGroup.value['exam'];
    this.examsSelected.push(tmpExam);
  }

}
