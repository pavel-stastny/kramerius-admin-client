import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collection } from 'src/app/models/collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionsService } from 'src/app/services/collections.service';


@Component({
  selector: 'app-add-item-to-collection-dialog',
  templateUrl: './add-item-to-collection-dialog.component.html',
  styleUrls: ['./add-item-to-collection-dialog.component.scss']
})
export class AddItemToCollectionDialogComponent implements OnInit {


  pid;
  title;
  isCollection = false;

  potentialSuperCollections = [];
  potentialSuperCollectionsAll = [];
  selectedSuperCollection;
  specificAuthorizedActions = [];

  inProgress = false;

  query: string;

  allowedCollections: string[];
  language:string = 'cze';

  constructor(public dialogRef: MatDialogRef<AddItemToCollectionDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
     private collectionApi: CollectionsService,
     private authService: AuthService
     ) {
    if (data) {
      this.language = data.language ? data.language : 'cze';
      this.pid = data.pid;
      this.title = data.title;
      this.isCollection = data.isCollection;

      this.specificAuthorizedActions = data.specificAuthorizedActions ;
 
      this.collectionApi.getCollectionsContainingItem( this.language, this.pid).subscribe((data: [collections: Collection[], size: number]) => {
        let pidsOfCurrentSuperCollections = data[0].map(collection => collection.id);
        //TODO: handle offset, limit
        this.collectionApi.getCollections(this.language, 0, 999).subscribe((data: [collections: Collection[], size: number]) => {
          this.potentialSuperCollections = data[0].filter(collection => collection.id != this.pid && !pidsOfCurrentSuperCollections.includes(collection.id))
          this.potentialSuperCollectionsAll = this.potentialSuperCollections;

          this.authService.getPidsAuthorizedActions(this.potentialSuperCollectionsAll.map(c=> c.id), null).subscribe((d:any) => {
            this.allowedCollections = [];
            this.potentialSuperCollectionsAll.forEach((cp)=> {
              let actions = d[cp.id];
              if (actions) {
                actions.forEach((r)=> {
                  if (r.code == 'a_collections_edit') {
                    this.allowedCollections.push(cp.id);
                  }
                });
              }
            });
          });

        }, (error) => {
          console.log(error);
          //TODO: handle error
          //this.ui.showErrorSnackBar("Nepodařil načíst seznam všech sbírek")
        });
      }, (error) => {
        console.log(error);
        //TODO: handle error
        //this.ui.showErrorSnackBar("Nepodařil načíst seznam sbírek obsahujích tuto sbírku")
      });
    }
  }

  ngOnInit() {
    this.query = "";

  }

  allowEditCollection(pid) {
    let flag =  (this.allowedCollections && this.allowedCollections.includes(pid));
    return flag;
  }

  onAdd(formData) {
    this.inProgress = true;
    this.collectionApi.addItemToCollection(this.selectedSuperCollection.id, this.pid)
      .subscribe(() => {
        this.dialogRef.close('added');
      }, error => {
        console.log(error);
        this.dialogRef.close('error');
      });
  }

  selectSuperCollection(collection: Collection) {
    this.selectedSuperCollection = collection;
  }

  onSearch() {
    if (!!this.query) {
      this.potentialSuperCollections = this.potentialSuperCollectionsAll.filter(collection => {
        return collection.name_cze.toLocaleLowerCase().indexOf(this.query.toLocaleLowerCase()) > -1
      });
    } else {
      this.potentialSuperCollections = this.potentialSuperCollectionsAll;
    }
  }
  
}
