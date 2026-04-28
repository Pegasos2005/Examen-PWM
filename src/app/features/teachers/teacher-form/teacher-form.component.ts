import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../../../core/models/teacher';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-form.component.html'
})
export class TeacherFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private teacherService = inject(TeacherService);

  editingId: string | null = null;

  teacherForm = this.fb.group({
    name: ['', Validators.required],
    department: ['', Validators.required]
  });

  ngOnInit() {
    this.teacherService.teacherToEdit$.subscribe(teacher => {
      if (teacher) {
        this.editingId = teacher.id || null;
        this.teacherForm.patchValue({ name: teacher.name, department: teacher.department });
      } else {
        this.editingId = null;
        this.teacherForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const data: Teacher = {
        name: this.teacherForm.value.name!,
        department: this.teacherForm.value.department!
      };

      if (this.editingId) {
        this.teacherService.updateTeacher(this.editingId, data).then(() => this.onClear());
      } else {
        this.teacherService.addTeacher(data).then(() => this.onClear());
      }
    } else {
      this.teacherForm.markAllAsTouched();
    }
  }

  onClear() {
    this.teacherForm.reset();
    this.editingId = null;
    this.teacherService.setTeacherToEdit(null);
  }
}
