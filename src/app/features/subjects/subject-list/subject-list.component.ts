import { Component } from '@angular/core';
import { SubjectFormComponent } from '../subject-form/subject-form.component';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [SubjectFormComponent],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent { }
