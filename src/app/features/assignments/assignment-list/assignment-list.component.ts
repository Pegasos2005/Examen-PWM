import { Component, inject, OnInit } from '@angular/core';
import { AssignmentFormComponent } from '../assignment-form/assignment-form.component';
import { TeacherService } from '../../teachers/teacher.service';
import { CourseService } from '../../courses/course.service';
import { Assignment } from '../../../core/models/assignment';
import { Teacher } from '../../../core/models/teacher';
import { Course } from '../../../core/models/course';
import {AssignmentService} from '../assigment.service';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [AssignmentFormComponent],
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  private assignmentService = inject(AssignmentService);
  private teacherService = inject(TeacherService);
  private courseService = inject(CourseService);

  assignments: Assignment[] = [];
  teachers: Teacher[] = [];
  courses: Course[] = [];

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(t => this.teachers = t);
    this.courseService.getCourses().subscribe(c => this.courses = c);
    this.assignmentService.getAssignments().subscribe(a => this.assignments = a);
  }

  getTeacherName(id: string): string {
    const teacher = this.teachers.find(t => t.id === id);
    return teacher ? teacher.name : 'Loading...';
  }

  getCourseTitle(id: string): string {
    const course = this.courses.find(c => c.id === id);
    return course ? course.title : 'Loading...';
  }

  onDelete(id: string | undefined) {
    if (id && confirm('Delete assignment?')) this.assignmentService.deleteAssignment(id);
  }

  onEdit(assignment: Assignment) {
    this.assignmentService.setAssignmentToEdit(assignment);
  }
}
