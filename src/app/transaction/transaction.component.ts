import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import { SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { Category } from '../models/category.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CategoryComponent } from '../category/category.component';
import { filter } from 'rxjs/operators';
import { SplitTransComponent } from '../split-trans/split-trans.component';







@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements AfterViewInit, OnInit {

   prekidac : number=0;

  fileNameDialogRef: MatDialogRef<CategoryComponent> | undefined;
  fileNameDialogRef1: MatDialogRef<SplitTransComponent> | undefined;


  selectedValue = null;
  closeResult = '';
  dvaDugmeta:boolean | undefined;
  brojac=0;
  nizz : number[]=[];

 

  public transactions1 : Transaction[]=[];
 // public category : Category[]=[];
  public selected : any;
  
  elementcina : Transaction[]=[];
  

 constructor(private dialog: MatDialog, private modalService: NgbModal, private transacionService : TransactionService, private _liveAnnouncer: LiveAnnouncer){}

 
public ngOnInit(): void{
      this.transacionService.getTransactions().subscribe((transactions:Transaction[])=> {
        //console.log(transactions);
        this.dataSource.data=transactions;
        this.transactions1=transactions;
        this.elementcina[0]=transactions[0];
        console.log(this.elementcina[0].description)
      });
      
      
     
      
}



openAddFileDialog(element:Transaction){
  let config: MatDialogConfig = {

    data: {
       element
      
}
};


  this.fileNameDialogRef = this.dialog.open(CategoryComponent,config);

  this.fileNameDialogRef.afterClosed().pipe(
    filter(cat => cat)
  ).subscribe(cat => {

    if(this.prekidac==1){
      
      for (let index = 0; index < this.transactions1.length; index++) {
        for (let index1 = 0; index1 < this.nizz.length; index1++) {
          if(this.transactions1[index].id==this.nizz[index1]){
            console.log("if")
          //  element.catcode=cat;
            this.transactions1[index].catcode=cat;
          }
          
        }
        
      }
      this.prekidac=0;
      this.nizz.length=0;
    }
    else{
      console.log("else")
    let a= this.transactions1.indexOf(element);
    //element.catcode=cat;
    this.transactions1[a].catcode=cat;
    }
  })
}





  displayedColumns: string[] = ['first', 'middle', 'second', 'third','fourth','fifth'];
 public dataSource = new MatTableDataSource(this.transactions1);
  selection = new SelectionModel<Transaction>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;


  }
  
  fja(){
    
    this.prekidac++;
    for (let index = 0; index < this.transactions1.length; index++) {
      if(this.selection.isSelected(this.transactions1[index])){
          this.nizz.push(this.transactions1[index].id);
          console.log(this.transactions1[index].id);
      }
      
    }
  }

  div1Function(){
    this.dvaDugmeta=true;
 }

  openSelect(){
    this.brojac++;
    this.div1Function();
    if(this.brojac % 2 == 1 ){
  this.displayedColumns.unshift('select');
    }else{
      this.displayedColumns = this.displayedColumns.filter(e => e !== 'select'); 
  
    }
    
    }

    restart(){
      this.nizz.length=0;
    }

    

    closeSelect(){
      this.displayedColumns = this.displayedColumns.filter(e => e !== 'select'); 
      this.dvaDugmeta=false;
      this.brojac=0;
      this.nizz.length=0;
  
    }


    open(content: any) {
      this.modalService.open(content,
         {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = 
               `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
        selectFormControl = new FormControl('', Validators.required);
      
    private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return `with: ${reason}`;
          }
        }

        
        
    
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    @ViewChild(MatSort) sort: MatSort;
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort;
     }
   // displayedColumns: string[] = ['imageUrl','position', 'name',];

   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  openSplitMenu(element){
    let config: MatDialogConfig = {

      data: {
         element
        
  }
  };
  
  
    this.fileNameDialogRef1 = this.dialog.open(SplitTransComponent,config);
  
    this.fileNameDialogRef1.afterClosed().pipe(
      filter(cat => cat)
    ).subscribe(cat => {
  
      
      console.log("else")
      let a= this.transactions1.indexOf(element);
      //element.catcode=cat;
      this.transactions1[a].catcode=cat;
      

    })
  }
  
}
