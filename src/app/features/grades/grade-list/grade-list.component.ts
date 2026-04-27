import { Component } from '@angular/core';
import { GradeFormComponent } from '../grade-form/grade-form.component';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [GradeFormComponent],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.css'
})
export class GradeListComponent { }
