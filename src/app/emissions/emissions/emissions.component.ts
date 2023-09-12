import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import { Vessel } from 'src/app/models/vessel';
import { DataService } from 'src/app/services/data.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-emissions',
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss']
})
export class EmissionsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options;
  updateFlag: boolean = true; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  chartRef!: Highcharts.Chart;

  public chartData$!: Observable<any[]>; 
  co2_emissions: any = [];   
  sox_emissions: any = [];
  nox_emissions: any = [];
  pm_emissions: any = [];
  ch4_emissions: any = [];
  report_from_utc: any = [];
  selected: any;

  // TO DO data will accessing from the vessel component
  vessels: Vessel[] = [
    {id: 10001, name: 'MS Alpha'},
    {id: 10002, name: 'MS Bravo'},
    {id: 10003, name: 'MS Charlie'},
  ];

  rawData =  [
    {
    "id": 10001,
    "timeSeries": [
      {"report_from_utc":"2023-01-01T00:00:00Z","report_to_utc":"2023-01-02T00:00:00","co2_emissions":94.05,"sox_emissions":1.62,"nox_emissions":2.8,"pm_emissions":0.37097,"ch4_emissions":1.51},
      ]
    }, {
      "id": 10002,
      "timeSeries": [
        {"report_from_utc":"2023-01-03T00:00:00Z","report_to_utc":"2023-01-04T01:00:00","co2_emissions":78.86,"sox_emissions":1.36,"nox_emissions":2.35,"pm_emissions":0.3109,"ch4_emissions":1.266},
      ]
    } , {
      "id": 10003,
      "timeSeries": [
        {"report_from_utc":"2023-02-26T04:00:00Z","report_to_utc":"2023-02-27T04:00:00","co2_emissions":71.87,"sox_emissions":1.24,"nox_emissions":2.14,"pm_emissions":0.28411,"ch4_emissions":1.154},
      ]
    }
  ]

  setChartData(id: any) {
    if (this.selected === 10001) {
      this.ch4_emissions = this.rawData[0].timeSeries.map((node) => node.ch4_emissions);
      this.pm_emissions = this.rawData[0].timeSeries.map((node) => node.pm_emissions);
      this.nox_emissions = this.rawData[0].timeSeries.map((node) => node.nox_emissions);
      this.sox_emissions = this.rawData[0].timeSeries.map((node) => node.sox_emissions);
      this.co2_emissions = this.rawData[0].timeSeries.map((node) => node.co2_emissions);
      this.report_from_utc = this.rawData[0].timeSeries.map((node) => {
        return Date.parse(node.report_from_utc)
      });
    } else if (this.selected === 10002) {  
      this.ch4_emissions = this.rawData[1].timeSeries.map((node) => node.ch4_emissions);
      this.pm_emissions = this.rawData[1].timeSeries.map((node) => node.pm_emissions);
      this.nox_emissions = this.rawData[1].timeSeries.map((node) => node.nox_emissions);
      this.sox_emissions = this.rawData[1].timeSeries.map((node) => node.sox_emissions);
      this.co2_emissions = this.rawData[1].timeSeries.map((node) => node.co2_emissions);
      this.report_from_utc = this.rawData[1].timeSeries.map((node) => {
        return Date.parse(node.report_from_utc)
      });
    } else if (this.selected === 10003) {
      this.ch4_emissions = this.rawData[2].timeSeries.map((node) => node.ch4_emissions);
      this.pm_emissions = this.rawData[2].timeSeries.map((node) => node.pm_emissions);
      this.nox_emissions = this.rawData[2].timeSeries.map((node) => node.nox_emissions);
      this.sox_emissions = this.rawData[2].timeSeries.map((node) => node.sox_emissions);
      this.co2_emissions = this.rawData[2].timeSeries.map((node) => node.co2_emissions);
      this.report_from_utc = this.rawData[2].timeSeries.map((node) => {
        return Date.parse(node.report_from_utc)
      });
    }

    this.chartRef.series[0].update(
      {
        data: this.co2_emissions,
        type: 'spline',
      }
    )
    this.chartRef.series[1].update(
      {
        data: this.sox_emissions,
        type: 'spline',
      }
    )
    this.chartRef.series[2].update(
      {
        data: this.nox_emissions,
        type: 'spline',
      }
    )
    this.chartRef.series[3].update(
      {
        data: this.pm_emissions,
        type: 'spline',
      }
    )
    this.chartRef.series[4].update(
      {
        data: this.ch4_emissions,
        type: 'spline',
      }
    )

    this.updateFlag = false;
  };

  loadChartData() {
    this.dataService.getDataEmissionStream().subscribe((data) => {
      this.rawData = data;

      this.rawData.forEach((node, i) => {

        // set the chart data
        this.chartData$ = this.dataService.getDataEmissionStream();
        this.selected = this.vessels[0].id;

        if (this.selected === 10001) {
          this.ch4_emissions = this.rawData[0].timeSeries.map((node) => node.ch4_emissions);
          this.pm_emissions = this.rawData[0].timeSeries.map((node) => node.pm_emissions);
          this.nox_emissions = this.rawData[0].timeSeries.map((node) => node.nox_emissions);
          this.sox_emissions = this.rawData[0].timeSeries.map((node) => node.sox_emissions);
          this.co2_emissions = this.rawData[0].timeSeries.map((node) => node.co2_emissions);
          this.report_from_utc = this.rawData[0].timeSeries.map((node) => {
            return Date.parse(node.report_from_utc)
          });
        } else if (this.selected === 10002) {  
          this.ch4_emissions = this.rawData[1].timeSeries.map((node) => node.ch4_emissions);
          this.pm_emissions = this.rawData[1].timeSeries.map((node) => node.pm_emissions);
          this.nox_emissions = this.rawData[1].timeSeries.map((node) => node.nox_emissions);
          this.sox_emissions = this.rawData[1].timeSeries.map((node) => node.sox_emissions);
          this.co2_emissions = this.rawData[1].timeSeries.map((node) => node.co2_emissions);
          this.report_from_utc = this.rawData[1].timeSeries.map((node) => {
            return Date.parse(node.report_from_utc)
          });
        } else if (this.selected === 10003) {
          this.ch4_emissions = this.rawData[2].timeSeries.map((node) => node.ch4_emissions);
          this.pm_emissions = this.rawData[2].timeSeries.map((node) => node.pm_emissions);
          this.nox_emissions = this.rawData[2].timeSeries.map((node) => node.nox_emissions);
          this.sox_emissions = this.rawData[2].timeSeries.map((node) => node.sox_emissions);
          this.co2_emissions = this.rawData[2].timeSeries.map((node) => node.co2_emissions);
          this.report_from_utc = this.rawData[2].timeSeries.map((node) => {
            return Date.parse(node.report_from_utc)
          });
        }
        
        this.chartRef.series[0].update(
          {
            data: this.co2_emissions,
            type: 'spline',
          }
        )
        this.chartRef.series[1].update(
          {
            data: this.sox_emissions,
            type: 'spline',
          }
        )
        this.chartRef.series[2].update(
          {
            data: this.nox_emissions,
            type: 'spline',
          }
        )
        this.chartRef.series[3].update(
          {
            data: this.pm_emissions,
            type: 'spline',
          }
        )
        this.chartRef.series[4].update(
          {
            data: this.ch4_emissions,
            type: 'spline',
          }
        )
        // redraw the chart
        this.chartRef.redraw();
        this.updateFlag = false;
      });
    });
  }

  ngOnInit() {
    this.loadChartData();
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  constructor(public dataService: DataService) {
    this.chartOptions = {
      chart: {
        styledMode: true,
        events: {  
          load: function () {
            // TO DO added selected vessel name
            this.title.update({
              text: 'Emissions'
            });
          }
        }
      },
      series: [{
        name: 'CO2',
        data: this.co2_emissions,
        type: 'spline',
        yAxis: 1,
      },
      {
        name: 'SOx',
        data: this.sox_emissions,   
        type: 'spline',
      },
      {
        name: 'NOx',
        data: this.nox_emissions,   
        type: 'spline',
      },
      {
        name: 'PM',
        data: this.pm_emissions,   
        type: 'spline',
      },
      {
        name: 'CH4',
        data: this.ch4_emissions,   
        type: 'spline',
      }],
      xAxis: [{ // Bottom X axis
        type: 'datetime',
        tickInterval: 24 * 3600,
        startOnTick: true,
        gridLineColor: '#F3F3F3',
        minPadding: 0,
        maxPadding: 0,
        showLastLabel: true,
        labels: {
          format: '{value}',
        },
        crosshair: true,
      }, 
      { 
        title: {
          text: null
        },
        linkedTo: 0,
        type: 'datetime',
        opposite: true,
        tickLength: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
      }
    ],
      yAxis: [{
        tickInterval: 1,
        gridLineColor: '#F3F3F3',
        min: 0,
        max: 3,
        minorGridLineWidth: 2,
        minorGridLineColor: '#F3F3F3',
      }, {
        type: 'logarithmic',
        min: 0.1,
        title: { 
          text: 'CO2',
        },
        labels: {
          enabled: false
        },
        opposite: true,
        showLastLabel: false
      }],
    };
  }
  
} 