import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Category } from '../models/category.model';
import { TransactionService } from '../services/transaction.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';


@Component({
  selector: 'app-split-trans',
  templateUrl: './split-trans.component.html',
  styleUrls: ['./split-trans.component.scss']
})
export class SplitTransComponent implements OnInit {

  public category : Category[]=[];
  selected : any;
  andrej:string="";
  form!: FormGroup;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transacionService : TransactionService, public formBuilder: FormBuilder, public dialogRef: MatDialogRef<SplitTransComponent>) { }

  ngOnInit(): void {

    this.transacionService.getCategories().subscribe((categories:Category[])=>
    {
      //console.log(categories);
      this.category=categories;
    });

    this.form = this.formBuilder.group({
    kategori: '',
    sabkategori:''
  })
  }

  
   
  submit(form:any){
    console.log(this.data.element.id);
    const a=this.data.element.id;
    const b=form.value.kategori;
    this.transacionService.addCategory(a,{"catcode": `${form.value.kategori}` }).subscribe(res => {
      console.log(res);
      });
    //this.dialogRef.close(``);
    

    for (let index = 0; index < this.category.length; index++) {
      if(this.category[index].code==`${form.value.kategori}`){
          this.andrej=this.category[index].name;
          console.log(this.andrej);
      }
      
    }

    this.dialogRef.close(this.andrej);
    
  }
}
