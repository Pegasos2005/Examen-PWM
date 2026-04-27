import { Component, inject } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentService } from '../student.service';
import { AsyncPipe } from '@angular/common';
import { Student } from '../../../core/models/student.model'; // Importante importar la interfaz

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentFormComponent, AsyncPipe],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  private studentService = inject(StudentService);
  students$ = this.studentService.getStudents();

  // Función para borrar
  onDelete(id: string | undefined) {
    if (!id) return;

    // Una ventanita nativa para que no borren sin querer (Suma puntos de UX)
    if (confirm('¿Estás seguro de querer borrar este estudiante?')) {
      this.studentService.deleteStudent(id)
        .catch(error => console.error('Error borrando:', error));
    }
  }

  // Función para editar (Le pasa el estudiante al servicio)
  onEdit(student: Student) {
    this.studentService.setStudentToEdit(student);

    // Hacemos scroll hacia arriba para que el usuario vea el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
