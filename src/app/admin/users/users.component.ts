import { AfterViewInit, Component, inject, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AllUsers, ApiService, Newusers, Userinformation } from '../../api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {

  private api = inject(ApiService)
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Userinformation>;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  users?: Userinformation[]
  allUsers?: AllUsers

  constructor() {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.api.getAllUser()
      .subscribe((data) => {
        //console.log(data)
        //console.log(this.users)
        this.allUsers = data
        this.users = this.allUsers.users
        this.dataSource = new MatTableDataSource(this.users)
        // this.dataSource.data=this.users
        //this.dataSource.data = data
        //console.log(this.dataSource.data = this.users)
        //let me = this.users
        //console.log(me)
      })
  }


}
