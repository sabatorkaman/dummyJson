import { AfterViewInit, Component, inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllUsers, ApiService, Userinformation } from '../../api.service';
import { PagingComponent } from "../../paging/paging.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, PagingComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements AfterViewInit, OnChanges {
  private api = inject(ApiService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Userinformation>;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  users?: Userinformation[]
  allUsers?: AllUsers
  resultsLength = 110;
  limit = 2
  skip = 0

  constructor() {
    this.dataSource = new MatTableDataSource();


  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.pageSize = this.limit - this.skip
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // if (this.limit !== undefined && this.skip !== undefined) {


    this.api.getAllUser(this.limit, this.skip)
      .subscribe((data) => {
        this.allUsers = data
        this.limit = this.allUsers.limit
        this.users = this.allUsers.users
        this.dataSource = new MatTableDataSource(this.users)
        console.log(data.users.length)
        console.log(this.limit, this.skip)

        console.log(this.paginator?.pageSize + "pageSize")
        console.log(this.paginator?.pageIndex + "index")

        if (data.users.length === this.paginator?.pageSize) {
          // this.resultsLength = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 0) + (this.paginator?.pageSize ?? 0) + 1
          this.resultsLength = 10
        } else { 

          // this.resultsLength = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 0) + data.users.length
          this.resultsLength = 11
        }
        if (data.users.length == this.paginator?.pageSize)
          this.resultsLength = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 0) + (this.paginator?.pageSize ?? 0) + 1
        else
          this.resultsLength = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 0) + data.users.length

      })
      console.log(this.resultsLength)
    // }
  }


  // nextData() {
  //   let me = this.limit += this.pageSize+5
  //   console.log(me)
  //   console.log(this.pageSize + 5)
  // }


}
