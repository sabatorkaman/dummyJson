import { AfterViewInit, Component, inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllUsers, ApiService, Userinformation } from '../../userService.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements AfterViewInit {
  private api = inject(ApiService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Userinformation>;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  resultsLength = 0;
  pageSize: number = 5
  pageIndex: number = 0
  filterValue: string = ""

  constructor() {
    this.dataSource = new MatTableDataSource();

  }
  getUser() {
    let newSkip = this.pageIndex * this.pageSize
    this.api.getAllUser(this.pageSize, newSkip, this.filterValue)
      .subscribe((data: AllUsers) => {
        this.dataSource.data = data.users
        this.resultsLength = data.total
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getUser()
  }
  onChangePage(e: PageEvent) {
    this.pageSize = e.pageSize
    this.pageIndex = e.pageIndex
    this.getUser()
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.pageIndex = 0
    this.getUser()
  }
}
