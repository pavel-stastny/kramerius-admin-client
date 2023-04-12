import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-schedule-sync-with-sdnnt',
  templateUrl: './schedule-sync-with-sdnnt.component.html',
  styleUrls: ['./schedule-sync-with-sdnnt.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ScheduleSyncWithSdnntComponent implements OnInit {
  displayedColumns = ['pid','catalog', 'name', 'sync_actions'];

  columnsToDisplay = ['pid','catalog', 'title', 'sync_actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null;

  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  id: string;
  catalog: string;
  title:string,
  type_of_rec: string;
  state: string;
  pid: string;
  license:string;
  type: string;
  real_kram_licenses:any;
  sync_actions: any; 
  children: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id:'oai:aleph-nkp.cz:SKC01-000949099_1',
    catalog:'oai:aleph-nkp.cz:SKC01-000084336', 
    title:'Morbus Kitahara / Christoph Ransmayr ; [z němčiny přeložila Jana Zoubková]',
    type_of_rec:"BK",
    state:'A',
    pid:"uuid:c960ddc0-c72a-11e4-af6e-005056827e51",
    license:"dnnto",
    type:"main",
    sync_actions:["add_dnnto"], 
    real_kram_licenses: null,
    children:[]
  },
  {
    id:"oai:aleph-nkp.cz:SKC01-001009694_1",
    catalog:"oai:aleph-nkp.cz:SKC01-001009694",
    title:"Obejmi mě, lásko / Jennifer Blake ; [přeložila Lenka Tichá]",
    type_of_rec:"BK",
    state:"A",
    pid:"uuid:4ddf2470-380c-11e4-8e0d-005056827e51",
    license:"dnntt",
    type:"main",
    real_kram_licenses:["dnnto"],
    sync_actions:["change_dnntt_dnnto"],
    children:[]
  },
  {
    id:"oai:aleph-nkp.cz:SKC01-004170462_1",
    catalog:"oai:aleph-nkp.cz:SKC01-004170462",
    title:"Sanace dřevěných konstrukcí a staveb ... : odborný seminář : sborník odborných příspěvků",
    type_of_rec:"SE",
    state:"A",
    pid:"uuid:359c6770-e7bb-11e3-b72e-005056827e52",
    license:"dnntt",
    type:"main",
    real_kram_licenses:["dnntt"],
    sync_actions:["partial_change"],
    children:[
      {
        parent_id:"oai:aleph-nkp.cz:SKC01-004170462_1",
        state:"A",
        type:"granularity",
        pid:"uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        id:"oai:aleph-nkp.cz:SKC01-004170462_1_uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        license:"dnntt",
        real_kram_licenses:["dnnto"],
        sync_actions:["change_dnntt_dnnto"]
      },
      {
        parent_id:"oai:aleph-nkp.cz:SKC01-004170462_1",
        state:"A",
        type:"granularity",
        pid:"uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        id:"oai:aleph-nkp.cz:SKC01-004170462_1_uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        license:"dnntt",
        real_kram_licenses:["dnnto"],
        sync_actions:["change_dnntt_dnnto"]
      },
      {
        parent_id:"oai:aleph-nkp.cz:SKC01-004170462_1",
        state:"A",
        type:"granularity",
        pid:"uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        id:"oai:aleph-nkp.cz:SKC01-004170462_1_uuid:82c58ee0-e7bc-11e3-adbd-5ef3fc9bb22f",
        license:"dnntt",
        real_kram_licenses:["dnnto"],
        sync_actions:["change_dnntt_dnnto"]
      }
    ]
  }
];
  

