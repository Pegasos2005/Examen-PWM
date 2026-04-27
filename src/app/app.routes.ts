import { Routes } from '@angular/router';
import { StudentListComponent } from './features/students/student-list/student-list.component';
import { SubjectListComponent } from './features/subjects/subject-list/subject-list.component';
import { GradeListComponent } from './features/grades/grade-list/grade-list.component';

export const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'grades', component: GradeListComponent },

  // Ruta por defecto: si el usuario entra a la raíz ('/'), lo mandamos a estudiantes
  { path: '', redirectTo: '/students', pathMatch: 'full' },

  // Ruta comodín (opcional, pero buena práctica): si escribe una URL que no existe
  { path: '**', redirectTo: '/students' }
];
