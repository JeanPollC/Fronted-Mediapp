import { Consult } from "./consult";
import { Exam } from "./exam";

export interface consultListExamDTOI {
    consult: Consult;
    lstExam: Exam[];
}