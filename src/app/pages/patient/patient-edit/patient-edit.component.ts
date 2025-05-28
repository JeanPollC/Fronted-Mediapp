import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../model/patient';
import { pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-patient-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      dni: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.patientService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          dni: new FormControl(data.dni),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone),
          email: new FormControl(data.email)
        });
      });
    }
  }

  operate() {
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email']; 

    if(this.isEdit){
      //UPDATE
      this.patientService.update(this.id, patient).subscribe( () => {
        this.patientService.findAll().subscribe( data => {
          this.patientService.setPatientChange(data); 
        })
      })
    }else{
      //SAVE
      //PRACTICA IDEAL RECOMENDADA
      /*this.patientService.save(patient)
      .pipe(switchMap( () => this.patientService.findAll() ))
      .subscribe(data => this.patientService.setPatientChange(data));*/
      this.patientService.save(patient).pipe(
        switchMap( () => this.patientService.findAll()),
        tap(data => this.patientService.setPatientChange(data))
      ).subscribe();
    }

    this.router.navigate(['/pages/patient'])
  }

}
