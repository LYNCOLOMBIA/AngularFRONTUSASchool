
import { Component, OnInit } from '@angular/core';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { ReportService } from '../services/report.service';
import { ActivatedRoute,Router } from '@angular/router';
import { GameResultsDetailed } from '../interfaces/interfaces';

import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {

    requestFilters:GameResultsDetailed = {}
    reportResults: any= {};
    cols: any[] = [];

    exportColumns: any[] =[];

    //filters report

    constructor(private ReportService: ReportService, private route: ActivatedRoute, private router:Router) {

      
      this.route.queryParams.subscribe(params=>{
        this.requestFilters.token = params['token'];
        this.requestFilters.initial_date = params['initial_date'];
        this.requestFilters.end_date = params['end_date'];
        this.requestFilters.group_id = params['group_id'];
        this.requestFilters.report_id = params['report_id'];
        this.requestFilters.report_type = params['report_type'];
        this.requestFilters.student_id = params['student_id'];
    })


        console.log(this.requestFilters)

        this.ReportService.getGameResults(this.requestFilters).subscribe(resp=>{
             this.reportResults = resp.Data;
             this.cols = resp.ColumnHeaders
        

             this.exportColumns = this.cols.map(a=>({header:a, dataKey:a}))

            //  this.exportColumns = this.cols.reduce((a,v) => ({...a, header: [v]}),{});
             console.log(this.exportColumns)
             console.log(this.reportResults)
            //  this.exportColumns = this.cols.reduce((accumulator, value) => {
            //    return {...accumulator, header: value};
            //  }, {});
             // this.exportColumns = this.cols.reduce((col,index) => ({title: col[index], dataKey: col[index]}));
             this.exportPdf()
            this.router.navigate(['/auth'], { replaceUrl: true });

        });

   

     }

    ngOnInit() {


    }

    exportPdf() {

        const doc = new jsPDF({
          orientation: 'l',
          unit: 'mm',
          format: 'legal',
        });
        autoTable(doc, ({
          columnStyles: { europe: { halign: 'center' } }, // European countries centered
          body: this.reportResults,
          columns: this.exportColumns,
        }))
        doc.save(`report${this.requestFilters.initial_date}_${this.requestFilters.end_date}.pdf`)
        
    }

    // exportExcel() {
    //   import("xlsx").then(xlsx => {
    //     const worksheet = xlsx.utils.json_to_sheet(this.reportResults.data);
    //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    //     const excelBuffer: any = xlsx.write(workbook, {
    //       bookType: "xlsx",
    //       type: "array"
    //     });
    //     this.saveAsExcelFile(excelBuffer, "products");
    //   });
    // }

    // saveAsExcelFile(buffer: any, fileName: string): void {
    //   import("file-saver").then(FileSaver => {
    //     let EXCEL_TYPE =
    //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    //     let EXCEL_EXTENSION = ".xlsx";
    //     const data: Blob = new Blob([buffer], {
    //       type: EXCEL_TYPE
    //     });
    //     FileSaver.saveAs(
    //       data,
    //       fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    //     );
    //   });
    // }

}
