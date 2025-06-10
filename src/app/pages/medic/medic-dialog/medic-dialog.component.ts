import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../../model/medic';
import { FormsModule } from '@angular/forms';
import { MedicService } from '../../../services/medic.service';
import { switchMap, tap } from 'rxjs';
import { Specialty } from '../../../model/specialty';
import { SpecialtyService } from '../../../services/specialty.service';


@Component({
  selector: 'app-medic-dialog',
  imports: [MaterialModule, MatDialogModule, FormsModule],
  templateUrl: './medic-dialog.component.html',
  styleUrl: './medic-dialog.component.css'
})
export class MedicDialogComponent {

  medic: Medic;
  specialties: Specialty[];

  readonly dialogRef = inject(MatDialogRef<MedicDialogComponent>);
  readonly data = inject<Medic>(MAT_DIALOG_DATA);
  readonly medicService = inject(MedicService);
  private specialtyService = inject(SpecialtyService);

  ngOnInit(){
    //this.medic = this.data
    this.medic = {... this.data};  
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
  }

  close(){
    this.dialogRef.close();
  }

  operate(){
    if( this.medic != null && this.medic.idMedic > 0) {
      //UPDATE 
      this.medicService.update(this.medic.idMedic, this.medic).pipe(
        switchMap( () => this.medicService.findAll()),
        tap( data => this.medicService.setMedicChange(data)),
        tap(() => this.medicService.setMessageChange('UPDATED!'))
      ).subscribe();
    } else{
      //SAVE
      this.medicService.save(this.medic).pipe(
        switchMap( () => this.medicService.findAll()),
        tap(data => this.medicService.setMedicChange(data)),
        tap( () => this.medicService.setMessageChange('CREATED!'))
      ).subscribe();
    }

    this.close();
  }

}
