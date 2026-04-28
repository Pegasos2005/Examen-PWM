import { Component, inject } from '@angular/core';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseService } from '../course.service';
import { AsyncPipe } from '@angular/common';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseFormComponent, AsyncPipe],
  templateUrl: './course-list.component.html'
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  courses$ = this.courseService.getCourses();

  onDelete(id: string | undefined) {
    if (id && confirm('Delete course?')) {
      this.courseService.deleteCourse(id);
    }
  }

  onEdit(course: Course) {
    this.courseService.setCourseToEdit(course);
  }
}
