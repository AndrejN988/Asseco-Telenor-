import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Category } from '../models/category.model';
import { TransactionService } from '../services/transaction.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { stringify } from 'querystring';


@Component({
  selector: 'app-split-trans',
  templateUrl: './split-trans.component.html',
  styleUrls: ['./split-trans.component.scss']
})
export class SplitTransComponent implements OnInit {

  public category : Category[]=[];
  selected : any;
  selected1 : any;
  andrej:string="";
  andrej1:string="";
  konacan:string="";
  form!: FormGroup;
  form1!: FormGroup;
  brojcanik : number[]=[1];
  
  displayedColumns: string[] = ['form'];

  iznos:string="";
  formaIznos:string="";
  iznosBroj:number=0;

  prvi:number=0;
  drugi:number=0;

  prviString:string="";
  drugiString:string="";



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transacionService : TransactionService, public formBuilder: FormBuilder, public dialogRef: MatDialogRef<SplitTransComponent>) {
    this.form = this.formBuilder.group({
      kategori: '',
      sabkategori:'',
      amaunt:''
    
  })

  this.form1 = this.formBuilder.group({
    kategori1: '',
    sabkategori1:''
  
})
   }

  ngOnInit(): void {
    this.iznos=this.data.element.amount;
    this.transacionService.getCategories().subscribe((categories:Category[])=>
    {
      //console.log(categories);
      this.category=categories;
    });

    this.iznos=this.iznos.substring(1);
    console.log(this.iznos)
    
  }

  dodajNovi(){
    this.brojcanik.push(1);
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      kategori: '',
      sabkategori:'',
      amaunt:''
    }));
  }
   
  submit(form:any, form1:any){

    this.formaIznos=`${form.value.amaunt}`;
    this.prvi=+this.formaIznos;
    this.iznosBroj=+this.iznos;
    this.drugi=this.iznosBroj-this.prvi;

    this.prviString=this.prvi+"";
    this.drugiString=this.drugi+"";

    console.log(this.data.element.id);
    const a=this.data.element.id;
    const b=form.value.kategori;
    this.transacionService.addSplit(a,{"splits": [
      {
        "catcode": `${form.value.kategori}`,
        "amount": this.prvi
      }
    ]}).subscribe(res => {
      console.log(res);
      });
    //this.dialogRef.close(``);
    

    for (let index = 0; index < this.category.length; index++) {
      if(this.category[index].code==`${form.value.kategori}`){
          this.andrej=this.category[index].name;
          console.log(this.andrej);
      }
      
    }

    for (let index = 0; index < this.category.length; index++) {
      if(this.category[index].code==`${form1.value.kategori1}`){
          this.andrej1=this.category[index].name;
          console.log(this.andrej1);
      }
      
    }
    
    if(this.prvi>this.iznosBroj){
      alert("The amount you entered is greater than the total amount!")
    }
    else if(this.prvi==0){
      alert("You did not enter an amount!")
    }
    else{
      this.konacan=this.andrej+"("+"€"+this.prviString+")"+"•"+this.andrej1+"("+"€"+this.drugiString+")";
    this.dialogRef.close(this.konacan);
    this.prvi=0;
    this.drugi=0;
    }
    

    
  }
}
