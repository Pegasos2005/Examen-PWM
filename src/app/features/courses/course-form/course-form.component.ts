import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.component.html'
})
export class CourseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  editingId: string | null = null;

  courseForm = this.fb.group({
    title: ['', Validators.required],
    credits: [1, [Validators.required, Validators.min(1)]] // Créditos como número
  });

  ngOnInit() {
    this.courseService.courseToEdit$.subscribe(course => {
      if (course) {
        this.editingId = course.id || null;
        this.courseForm.patchValue({ title: course.title, credits: course.credits });
      } else {
        this.editingId = null;
        this.courseForm.reset({ credits: 1 });
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const data: Course = {
        title: this.courseForm.value.title!,
        credits: this.courseForm.value.credits!
      };

      if (this.editingId) {
        this.courseService.updateCourse(this.editingId, data).then(() => this.onClear());
      } else {
        this.courseService.addCourse(data).then(() => this.onClear());
      }
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  onClear() {
    this.courseForm.reset({ credits: 1 });
    this.editingId = null;
    this.courseService.setCourseToEdit(null);
  }
}
