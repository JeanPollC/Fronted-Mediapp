import { Component, Inject, inject } from '@angular/core';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../model/medic';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-medic',
  imports: [],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.css'
})
export class MedicComponent {


  dataSource:MatTableDataSource<Medic>;
  columnsDefinition = [
    { def: 'idPatient', label: 'idPatient', hide: true },
    { def: 'firstName', label: 'firstName', hide: false },
    { def: 'lastName', label: 'lastName', hide: false },
    { def: 'dni', label: 'dni', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ]


  private medicService = inject(MedicService);
  //constructor(private medicService: MedicService){ }

  ngOnInit(){
    this.medicService.findAll().subscribe(data => console.log(data))
  }

  createTable(data: Medic[]){

  }

}
