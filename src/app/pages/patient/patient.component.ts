import { Component, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterLink, RouterOutlet } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient',
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {

  dataSource: MatTableDataSource<Patient>;
  //displayedColumns: string[] = ['idPatient','firstName','lastName','dni'];
  columnsDefinition = [
    { def: 'idPatient', label: 'idPatient', hide: true },
    { def: 'firstName', label: 'firstName', hide: false },
    { def: 'lastName', label: 'lastName', hide: false },
    { def: 'dni', label: 'dni', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => this.createTable(data));

    this.patientService.getPatientChange().subscribe(data => this.createTable(data));
    this.patientService.getMessageChangue().subscribe(message => this._snackBar.open(message, 'INFO', { duration: 2000}));
  }

  createTable(data: Patient[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value;
  }

  getDisplayedColumns() {
    return this.columnsDefinition.filter(cd => !cd.hide).map(cd => cd.def);
  }

  delete(id: number){
    this.patientService.delete(id).pipe(
      switchMap( () => this.patientService.findAll() ),
      tap( data => this.patientService.setPatientChange(data)),
      tap( () => this.patientService.setMessageChangue('DELETED!'))
    ).subscribe();
  }

}
