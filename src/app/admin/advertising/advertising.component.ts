import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { AdvertisingService } from "./services/advertising.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Advertising } from './interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
  providers:[MessageService]
})
export class AdvertisingComponent {

  private storageURL:string =  environment.storageURL;
  get loggedAdvertising(){
    return this.authservice.loggedUser;
  }

  //PrimeNg Table Variables
  advertisingDialog: boolean = false;

  advertisingBannerDialog: boolean = false;

  deleteAdvertisingDialog: boolean = false;

  deleteAdvertisingsDialog: boolean = false;

  advertisings: Advertising[] = [];
  
  advertising: Advertising = {};

  selectedAdvertisings: Advertising[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  advertising_state:boolean = true;

  bannerSM:any;
  bannerXL:any;


  loading: boolean = true;
  
  @ViewChild('dt2') table!: Table;
  rowsPerPageOptions = [5, 10, 20];

  dash = 'admin';
  fileName = ''
  private baseUrl: string = environment.baseUrl;
  constructor(private router: Router,
    private authservice:AuthService,
    private messageService: MessageService,
    private advertisingService: AdvertisingService,
    private fb:FormBuilder,
    private http: HttpClient ) { }

  ngOnInit() {
      this.advertisingService.getAdvertising().subscribe(
        resp=>{
            this.advertisings = resp;
            this.loading = false;
        }
      );

      this.cols = [

          { field: 'url_xl', header: 'url_xl' },
          { field: 'url_sm', header: 'url_sm' },
          { field: 'advertising_name', header: 'advertising_name' },
          { field: 'advertising_state', header: 'advertising_state' },
          { field: 'created_at', header: 'created_at' },
      ];
  }



    //Reactive forms

  //Update Password Advertising Reactive Form
  // updateAdvertisingForm: FormGroup =this.fb.group({
  //   url_xl: ['',[Validators.required]],
  //   url_sm: ['',[Validators.required]],
  //   advertising_name: ['',[Validators.required]],
  //   advertising_state: ['',[Validators.required]],
  // });

  
  //PrimeNg functions
  openNew() {
      this.advertising_state = true;
      this.advertising = {};
      console.log(this.advertising)
      this.advertisingDialog = true;
      this.submitted = false
  }

  deleteSelectedAdvertisings() {
      this.deleteAdvertisingsDialog = true;

  }

  editAdvertising(advertising: Advertising) {
      this.advertising = { ...advertising };
      this.advertising_state = this.advertising.advertising_state ? true:false;
      console.log(this.advertising )
      console.log(this.advertising_state)
      this.advertisingDialog = true;
  }
  viewBannerAdvertising(advertising: Advertising) {
    this.advertising = { ...advertising};
    if(this.advertising.banner_sm_url){
      this.advertising.banner_sm_url = `${this.storageURL}${this.advertising.banner_sm_url?.replace('public','')}` 
    }
    else{
      this.advertising.banner_sm_url = ''
    }
    if(this.advertising.banner_xl_url){
      this.advertising.banner_xl_url = `${this.storageURL}${this.advertising.banner_xl_url?.replace('public','')}` 
    }
    else{
      this.advertising.banner_xl_url = ''   
    }

    this.advertisingBannerDialog = true;
    console.log(this.advertising);
  }

  deleteAdvertising(advertising: Advertising) {
      this.deleteAdvertisingDialog = true;
      this.advertising = {...advertising };
      console.log(advertising);
  }



  myUploader(event:any){
    console.log(event.files)
  }
  myFile(event:any){
    console.log(event.files)
  }
  onFileSelectedSM(event:any){
    this.bannerSM = event.currentFiles[0];
    console.log(event)
  }

onFileSelectedXL(event:any){
  this.bannerXL = event.currentFiles[0];
  console.log(event)
}

  async uploadBannerAdvertisingSM(){
  const file:File = this.bannerSM ;
  const url = `${this.baseUrl}/advertising/upload-banner-sm`;
  let headersList = {
    "User-Agent": "School Front",
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
   }
   
   let bodyContent = new FormData();
   bodyContent.append("file", file);
   
   let response = await fetch(url, { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
   return data.route;
   
}


async uploadBannerAdvertisingXL(){
  const file:File = this.bannerXL ;
  const url = `${this.baseUrl}/advertising/upload-banner-sm`;
  let headersList = {
    "User-Agent": "School Front",
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
   }
   
   let bodyContent = new FormData();
   bodyContent.append("file", file);
   
   let response = await fetch(url, { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
   return data.route;
   
}



  confirmDelete() {
      this.deleteAdvertisingDialog = false;
      this.advertisingService.deleteAdvertising(this.advertising.id!).subscribe(
        resp=>{
            this.advertisings = this.advertisings.filter(val => val.id !== this.advertising.id);
            this.messageService.add({ severity: 'info', summary: 'Advertising deleting', detail: resp, life: 3000 });
            this.advertising = {};
        });
  }

    //Hide advertising update and advertising save dialog
  hideDialog() {
      this.advertisingDialog = false;
      this.submitted = false;
    }
    //Only Hide advertising password update dialog
  hideAdvertisingbannerDialog() {
    this.advertisingBannerDialog = false;
    this.submitted = false;
    }


    async saveAdvertising() {
      this.submitted = true;

      this.advertising.advertising_state = this.advertising_state;

      if(this.bannerSM ){
      this.advertising.banner_sm_url = await this.uploadBannerAdvertisingSM();
      this.advertising.banner_xl_url = await this.uploadBannerAdvertisingXL();
    }
    if( this.bannerXL){
      this.advertising.banner_sm_url = await this.uploadBannerAdvertisingSM();
      this.advertising.banner_xl_url = await this.uploadBannerAdvertisingXL();
    }
      console.log('RouteSM:', this.advertising.banner_sm_url,'RouteXL:',this.advertising.banner_xl_url)

      this.submitted = true;
          if (this.advertising.id) {
            this.advertisings[this.findIndexById(this.advertising.id)] = this.advertising;

            this.loading = true;
              this.advertisingService.updateAdvertising(this.advertising).subscribe(
                resp=>{
                  this.messageService.add({ severity: 'info', summary: 'Advertising Updating', detail: resp.message, life: 3000 });
                  this.advertisingService.getAdvertising().subscribe(
                    resp=>{
                        this.advertisings = resp;
                        this.loading = false;
                    }
                  );
                }
              )
          } else {

            this.loading = true;
              this.advertisingService.storeAdvertising(this.advertising).subscribe(
                resp=>{
                  console.log(resp);
                  this.messageService.add({ severity: 'info', summary: 'Advertising creation', detail: resp.message, life: 3000 });

                  this.advertisingService.getAdvertising().subscribe(
                    resp=>{
                        this.advertisings = resp;
                        this.loading = false;
                    }
                  );
                }
              )


          }
          this.advertising_state = true;
          this.bannerSM = '';
          this.bannerXL = '';
          this.advertisingDialog = false;
          this.advertising = {};
          this.submitted = false;
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.advertisings.length; i++) {
          if (this.advertisings[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }


  onFilter(event: Event,field:string,stringVal:string) {
      this.table.filter((event.target as HTMLInputElement).value, field,stringVal);
      console.log(stringVal)
  }

  onGlobalFilter(event: Event,stringVal:string) {
      this.table.filterGlobal((event.target as HTMLInputElement).value, stringVal);

  }
  onDateSelect(value:Date) {
    this.table.filter(this.formatDate(value), 'created_date', 'equals');
    console.log(this.formatDate(value))
    }


    formatDate(date:any) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }


}
