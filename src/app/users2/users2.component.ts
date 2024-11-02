import { AfterViewInit, Component, inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllUsers, ApiService, Userinformation } from '../api.service';
import {MatCardModule} from '@angular/material/card';
import { debounceTime, merge, startWith, switchMap } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule,MatCardModule,RouterLink],
  templateUrl: './users2.component.html',
  styleUrl: './users2.component.scss'
})

export class UsersComponent implements AfterViewInit {
  applyFilter($event: Event) {
    throw new Error('Method not implemented.');
  }
  private api = inject(ApiService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Userinformation>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(NgModel) searchModel: NgModel | null = null

  resultsLength = 0;
  filterValue: string = ""
  search = ""

  constructor() {
    this.dataSource = new MatTableDataSource();

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
}
