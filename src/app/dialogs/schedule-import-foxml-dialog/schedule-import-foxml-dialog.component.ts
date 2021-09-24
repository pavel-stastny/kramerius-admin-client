import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-schedule-import-foxml-dialog',
  templateUrl: './schedule-import-foxml-dialog.component.html',
  styleUrls: ['./schedule-import-foxml-dialog.component.scss']
})
export class ScheduleImportFoxmlDialogComponent implements OnInit {

  inProgress = false;
  importDirs = [];

  constructor(public dialogRef: MatDialogRef<ScheduleImportFoxmlDialogComponent>, private adminApi: AdminApiService) { }

  ngOnInit() {
    this.inProgress = true;
    this.adminApi.getImportFoxmlInputDirs().subscribe(response => {
      this.importDirs = response.dirs;
      this.inProgress = false;
    }, error => {
      console.log(error);
      this.dialogRef.close('error');
    })
  }

  schedule(formData) {
    this.adminApi.scheduleProcess({
      defid: 'import',
      params: {
        inputDataDir: formData.import_dir,
        startIndexer: formData.schedule_indexations,
      }
    }).subscribe(response => {
      //console.log(response);
      this.dialogRef.close("scheduled");
    }, error => {
      console.log(error);
      this.dialogRef.close('error');
    });
  }

}
