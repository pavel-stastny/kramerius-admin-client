import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScheduleImportFoxmlDialogComponent } from 'src/app/dialogs/schedule-import-foxml-dialog/schedule-import-foxml-dialog.component';
import { ScheduleProcessingIndexRebuildDialogComponent } from 'src/app/dialogs/schedule-processing-index-rebuild-dialog/schedule-processing-index-rebuild-dialog.component';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private ui: UIService
  ) { }

  ngOnInit() {
  }

  openscheduleProcessingIndexRebuildDialog() {
    const dialogRef = this.dialog.open(ScheduleProcessingIndexRebuildDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
        this.ui.showErrorSnackBar("Nepodařilo se naplánovat proces Vybudování Processing indexu")
      } else if (result === 'cancel' || result === undefined) {
        //nothing, dialog was closed
      } else {
        this.ui.showInfoSnackBar(`Proces Vybudování Processing indexu byl naplánován`);
      }
    });
  };

  openScheduleImportFoxmlDialog() {
    const dialogRef = this.dialog.open(ScheduleImportFoxmlDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
        this.ui.showErrorSnackBar("Nepodařilo se naplánovat proces Import FOXML")
      } else if (result === 'cancel' || result === undefined) {
        //nothing, dialog was closed
      } else {
        this.ui.showInfoSnackBar(`Proces Import FOXML byl naplánován`);
      }
    });
  }


}
