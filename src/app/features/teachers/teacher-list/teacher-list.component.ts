import { Component, inject } from '@angular/core';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { TeacherService } from '../teacher.service';
import { AsyncPipe } from '@angular/common';
import { Teacher } from '../../../core/models/teacher';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [TeacherFormComponent, AsyncPipe],
  templateUrl: './teacher-list.component.html'
})
export class TeacherListComponent {
  private teacherService = inject(TeacherService);
  teachers$ = this.teacherService.getTeachers();

  onDelete(id: string | undefined) {
    if (id && confirm('Delete teacher?')) {
      this.teacherService.deleteTeacher(id);
    }
  }

  onEdit(teacher: Teacher) {
    this.teacherService.setTeacherToEdit(teacher);
  }
}
