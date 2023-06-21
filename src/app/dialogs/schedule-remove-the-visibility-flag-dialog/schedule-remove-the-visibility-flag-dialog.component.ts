import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { forkJoin } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-schedule-remove-the-visibility-flag-dialog',
  templateUrl: './schedule-remove-the-visibility-flag-dialog.component.html',
  styleUrls: ['./schedule-remove-the-visibility-flag-dialog.component.scss']
})
export class ScheduleRemoveTheVisibilityFlagDialogComponent implements OnInit {

  @ViewChild('fileWithPids', { static: true }) fileWithPids: ElementRef;

  public inProgress: boolean = false;
  public fixed: boolean = false;
  pids = "";

//  @ViewChild('fileWithPids', { static: true }) fileWithPids: ElementRef;

//  fixed = false;

  scopeKeys = ['TREE', 'OBJECT',];
  scopeNames = ['Objekt i s potomky', 'Jen objekt']; //TODO: i18n
  selectedScope = this.scopeKeys[0];

  policies = ['PUBLIC', 'PRIVATE'];

  
  title;
  policy;

  pidsCounter = 0;
  scheduledCounter = 0;
  progressBarMode = 'indeterminate';


  constructor(public dialogRef: MatDialogRef<ScheduleRemoveTheVisibilityFlagDialogComponent>,private adminApi: AdminApiService) {

   }

  ngOnInit(): void {
  }

  schedule(formData) {
    this.inProgress = true;

    const pids = this.splitPids(this.pids);
    this.pidsCounter = pids.length;
    this.scheduledCounter = 0;

    const scope = formData.scope;
    const policy = this.policy;//formData.policy;

    let requests = [];
    pids.forEach(pid => {
      requests.push(
        this.adminApi.scheduleProcess({
          defid: 'remove_policy',
          params: {
            scope: 'TREE',
            pid: pid,
          }
        }, () => this.scheduledCounter++)
      );
    })
    this.progressBarMode = 'determinate';

    forkJoin(requests).subscribe(result => {
      this.dialogRef.close(this.scheduledCounter);
    }, error => {
      console.log(error);
      this.dialogRef.close('error');
    });
  }

  splitPids(pids: string) {
    //uuid:123 uuid:456,uuid:789;uuid:012, uuid:345; uuid:678    uuid:901
    //uuid:123 uuid:456,uuid:789;uuid:012, uuid:345; uuid:678    uuid:901 xxx
    if (pids) {
      return pids
        .split(/[\s,;]+/) //split by white spaces, ',', ';'
        .filter(n => n); //remove empty strings
    }
  }

  getProgress() {
    return Math.floor(this.scheduledCounter / this.pidsCounter * 100);
  }

  onSelectFile(event: any): void {
    //console.log('fileList', event);
    let fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      this.pids = String(fileReader.result);
    }
    fileReader.readAsText(event.target.files[0]);
  }

  onPidsFromFile() {
    let el: HTMLElement = this.fileWithPids.nativeElement;
    el.click();
  }
}
