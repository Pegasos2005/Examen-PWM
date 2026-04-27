// Añade OnInit al import de Angular core
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit { // <-- Implementamos OnInit
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);

  // Esta variable nos dirá si estamos creando (null) o editando (ID del estudiante)
  editingId: string | null = null;

  studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  // Esto se ejecuta al cargar el componente
  ngOnInit() {
    // Nos suscribimos al "canal mensajero" del servicio
    this.studentService.studentToEdit$.subscribe(student => {
      if (student) {
        // MODO EDICIÓN: Guardamos el ID y rellenamos el formulario automáticamente
        this.editingId = student.id || null;
        this.studentForm.patchValue({
          name: student.name,
          email: student.email
        });
      } else {
        // MODO CREACIÓN: Limpiamos todo
        this.editingId = null;
        this.studentForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData: Student = {
        name: this.studentForm.value.name!,
        email: this.studentForm.value.email!
      };

      if (this.editingId) {
        // Si hay un ID, significa que estamos EDITANDO
        this.studentService.updateStudent(this.editingId, studentData).then(() => {
          this.onClear(); // Limpiamos al terminar
        });
      } else {
        // Si no hay ID, estamos CREANDO
        this.studentService.addStudent(studentData).then(() => {
          this.onClear();
        });
      }
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  onClear() {
    this.studentForm.reset();
    this.editingId = null;
    // Le decimos al servicio que ya no estamos editando nada
    this.studentService.setStudentToEdit(null);
  }
}
