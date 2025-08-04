import { Component, inject, ViewChild } from '@angular/core';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../model/medic';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-medic',
  imports: [MaterialModule, MatDialogModule],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.css'
})
export class MedicComponent {


  dataSource:MatTableDataSource<Medic>;
  columnsDefinition = [
    { def: 'idMedic', label: 'idMedic', hide: true },
    { def: 'primaryName', label: 'primaryName', hide: false },
    { def: 'surname', label: 'surname', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ]

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private medicService = inject(MedicService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  //constructor(private medicService: MedicService){ }

  ngOnInit(){
    this.medicService.findAll().subscribe(data => this.createTable(data));
    this.medicService.getMedicChange().subscribe(data => this.createTable(data));
    this.medicService.getMessageChange().subscribe(message => this._snackBar.open(message, 'INFO', {duration: 2000}))
  }

  createTable(data: Medic[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value;
  }

  getDisplayedColumns(){
    return this.columnsDefinition.filter(cd => !cd.hide).map(cd => cd.def)
  }

  openDialog(medic?: Medic){
    this._dialog.open(MedicDialogComponent, {
      width: '750px',
      data: medic,
      disableClose: true
    });
  }

  delete(id: number){
    this.medicService.delete(id).pipe(
      switchMap( () => this.medicService.findAll() ),
      tap( data => this.medicService.setMedicChange(data)),
      tap( () => this.medicService.setMessageChange('DELETED!'))
    ).subscribe();
  }

}
