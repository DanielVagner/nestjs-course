import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../../shared/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from '../services/courses-http.service';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'article-card-list',
  templateUrl: './article-card-list.component.html',
  styleUrls: ['./article-card-list.component.scss']
})
export class ArticleCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesHttpService
  ) {}

  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.coursesService
      .deleteCourse(course._id)
      .subscribe(() => this.courseChanged.emit());
  }
}
