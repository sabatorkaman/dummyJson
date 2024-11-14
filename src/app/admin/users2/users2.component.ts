import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Userinformation, userService } from '../../userService.service';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, merge, startWith } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { useAnimation } from '@angular/animations';

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
  private userApi = inject(userService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action', 'delete'];
  dataSource: MatTableDataSource<Userinformation>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(NgModel) searchModel: NgModel | null = null
  resultsLength = 0
  filterValue: string = ""
  search = ""
  constructor() {
    this.dataSource = new MatTableDataSource();
  }
  openDialog(e: Userinformation) {
    let refDialog = this.dialog.open(DialogComponent, {
      data: { message: 'are you sure delete ' + e.firstName }
    });

    refDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.userApi.deleteUser(e.id).subscribe((del) => {
          console.log(del)
          this.dataSource.data = this.dataSource.data.filter((item) => item.id !== e.id
          )
          console.log(this.dataSource.data)
        })
      }
    })
  }

  ngAfterViewInit() {
    merge(this.searchModel!!.valueChanges!!, this.paginator!!.page!!)
      .pipe(
        startWith({}),
        debounceTime(300),
      ).subscribe(() => {
        let newSkip = this.paginator?.pageSize!! * this.paginator?.pageIndex!!
        this.userApi.getAllUser(this.paginator?.pageSize!!, newSkip, this.search).subscribe((data) => {
          this.dataSource.data = data.users
          this.resultsLength = data.total
        })
      }
      )
  }
}


