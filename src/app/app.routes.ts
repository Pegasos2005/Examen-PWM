import { Routes } from '@angular/router';
import { TeacherListComponent } from './features/teachers/teacher-list/teacher-list.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { AssignmentListComponent } from './features/assignments/assignment-list/assignment-list.component';

export const routes: Routes = [
  { path: 'teachers', component: TeacherListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'assignments', component: AssignmentListComponent },
  { path: '', redirectTo: '/teachers', pathMatch: 'full' },
  { path: '**', redirectTo: '/teachers' }
];
