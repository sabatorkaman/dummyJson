
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogElementsExampleDialog } from '../../users2/users2.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent{

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

