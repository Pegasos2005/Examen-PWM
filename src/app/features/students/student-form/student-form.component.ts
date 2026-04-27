import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule], // <-- Imprescindible para que funcione el form
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);

  // Creamos el formulario con sus validaciones
  studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  // Función que se ejecuta al darle al botón Add
  onSubmit() {
    // Si el formulario es válido (no está vacío y el email es correcto)
    if (this.studentForm.valid) {
      // Extraemos los datos
      const newStudent: Student = {
        name: this.studentForm.value.name!,
        email: this.studentForm.value.email!
      };

      // Llamamos al servicio
      this.studentService.addStudent(newStudent)
        .then(() => {
          console.log('¡Estudiante guardado en Firebase!');
          this.studentForm.reset(); // Limpiamos el formulario automáticamente
        })
        .catch(error => console.error('Error al guardar:', error));
    } else {
      // Si no es válido, marcamos todos los campos para que salte el error visual (si lo tuvieras)
      this.studentForm.markAllAsTouched();
    }
  }

  // Función para el botón Clear
  onClear() {
    this.studentForm.reset();
  }
}
