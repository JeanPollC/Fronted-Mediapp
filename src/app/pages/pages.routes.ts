import { Routes } from "@angular/router";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";

export const pagesRoutes: Routes = [
    {
            path: 'patient', component: PatientComponent, children: [
                { path: 'new', component: PatientEditComponent },
                { path: 'edit/:id', component: PatientEditComponent },
            ],
        },
        { path: 'medic', component: MedicComponent },
]