import { Routes } from "@angular/router";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";
import { ExamComponent } from "./exam/exam.component";
import { Component } from "@angular/core";
import { ConsultWizardComponent } from "./consult-wizard/consult-wizard.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { SearchComponent } from "./search/search.component";
import { ReportComponent } from "./report/report.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {
        path: 'patient', component: PatientComponent, 
        children: [
            { path: 'new', component: PatientEditComponent },
            { path: 'edit/:id', component: PatientEditComponent },
        ],
    },
    { path: 'medic', component: MedicComponent },
    { path: 'exam', component: ExamComponent },
    { path: 'consult-wizard', component: ConsultWizardComponent},
    { path: 'specialty', component: SpecialtyComponent},
    { path: 'search', component: SearchComponent},
    { path: 'report', component: ReportComponent}
]