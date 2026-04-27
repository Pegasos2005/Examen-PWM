import { Component, inject } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentService } from '../student.service';
import { AsyncPipe } from '@angular/common'; // <-- Importante

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentFormComponent, AsyncPipe], // <-- Añadir AsyncPipe aquí
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  private studentService = inject(StudentService);

  // Guardamos el observable con la lista de estudiantes
  students$ = this.studentService.getStudents();
}
