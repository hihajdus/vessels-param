import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.scss']
})
export class VesselsComponent {

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'mmsi' },
    { field: 'imo' },
    { field: 'companyId' },
    { field: 'companyName' },
    { field: 'startDate' },
    { field: 'active' },
    { field: 'vesselType' }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  
  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private dataService: DataService) {}

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.dataService.getDataStream();
    
    // Example with service load in params

    // this.dataService.getDataStream().subscribe((data) => {
    //   params.api?.setRowData(data);
    // });
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
}
