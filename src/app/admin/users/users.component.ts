import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AllUsers, ApiService, Newusers } from '../../api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private api = inject(ApiService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'age'];
  dataSource = new MatTableDataSource<AllUsers>;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  users?: AllUsers[]
  constructor() {

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.api.getAllUser()
      .subscribe((data) => {
        this.users = data
        console.log(data)
        this.dataSource.data=data
      })
  }


  applyFilter(e: any) { }
}
