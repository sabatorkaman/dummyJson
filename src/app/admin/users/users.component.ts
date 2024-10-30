import { AfterViewInit, Component, inject, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AllUsers, ApiService, Newusers, Users } from '../../api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit{
applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
  private api = inject(ApiService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'age'];
  dataSource = new MatTableDataSource<Users>;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  users?: Users[]
  constructor() {

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.api.getAllUser()
      .subscribe((data) => {
        console.log(data)
       this.dataSource.data=data
        // console.log(this.users)
    
      })
  }


}
