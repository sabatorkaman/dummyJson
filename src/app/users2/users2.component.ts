import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllUsers, ApiService, Userinformation } from '../api.service';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, merge, startWith } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, MatCardModule, RouterLink, MatIcon,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './users2.component.html',
  styleUrl: './users2.component.scss'
})

export class UsersComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  private api = inject(ApiService)
  private route = inject(ActivatedRoute)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action', 'delete'];
  dataSource: MatTableDataSource<Userinformation>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(NgModel) searchModel: NgModel | null = null
  resultsLength = 0
  filterValue: string = ""
  search = ""
  userId: number = 0
  constructor() {
    this.dataSource = new MatTableDataSource();
    
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  ngAfterViewInit() {
    merge(this.searchModel!!.valueChanges!!, this.paginator!!.page!!)
      .pipe(
        startWith({}),
        debounceTime(300),
      ).subscribe(() => {
        let newSkip = this.paginator?.pageSize!! * this.paginator?.pageIndex!!
        this.api.getAllUser(this.paginator?.pageSize!!, newSkip, this.search).subscribe((data) => {
          this.dataSource.data = data.users
          this.resultsLength = data.total
        })
      }
      )
  }
  deleteUser(id: number) {
    let confrimDelete = window.confirm("sure delete user??")
    if (confrimDelete === true) {
      this.api.deleteUser(id).subscribe((data) => {
        console.log(data)
      })
    }
    else {

    }
  }
  


}
export class DialogElementsExampleDialog {}

