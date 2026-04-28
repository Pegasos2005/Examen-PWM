import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../../teachers/teacher.service';
import { CourseService } from '../../courses/course.service';
import { Assignment } from '../../../core/models/assignment';
import { Teacher } from '../../../core/models/teacher';
import { Course } from '../../../core/models/course';
import {AssignmentService} from '../assigment.service';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './assignment-form.component.html'
})
export class AssignmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assignmentService = inject(AssignmentService);
  private teacherService = inject(TeacherService);
  private courseService = inject(CourseService);

  editingId: string | null = null;
  teachers: Teacher[] = [];
  courses: Course[] = [];

  assignmentForm = this.fb.group({
    teacherId: ['', Validators.required],
    courseId: ['', Validators.required],
    semester: ['', Validators.required]
  });

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(t => this.teachers = t);
    this.courseService.getCourses().subscribe(c => this.courses = c);

    this.assignmentService.assignmentToEdit$.subscribe(assignment => {
      if (assignment) {
        this.editingId = assignment.id || null;
        this.assignmentForm.patchValue({
          teacherId: assignment.teacherId,
          courseId: assignment.courseId,
          semester: assignment.semester
        });
      } else {
        this.editingId = null;
        this.assignmentForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      const data: Assignment = {
        teacherId: this.assignmentForm.value.teacherId!,
        courseId: this.assignmentForm.value.courseId!,
        semester: this.assignmentForm.value.semester!
      };

      if (this.editingId) {
        this.assignmentService.updateAssignment(this.editingId, data).then(() => this.onClear());
      } else {
        this.assignmentService.addAssignment(data).then(() => this.onClear());
      }
    } else {
      this.assignmentForm.markAllAsTouched();
    }
  }

  onClear() {
    this.assignmentForm.reset();
    this.editingId = null;
    this.assignmentService.setAssignmentToEdit(null);
  }
}
