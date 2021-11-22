import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 // httpClient: any;

 // public transactions : Transaction[];
  
 okej : string;

  constructor(private http : HttpClient) { 

      

  }

    public getTransactions() : Observable<Transaction[]>  {
   
      return this.http.get<PageTransaction>('http://127.0.0.1:4010/transactions').pipe(
        map((rsp : PageTransaction)=>{
          return rsp.items.map(transaction =>({
            id: transaction.id,
            beneficiaryName: transaction['beneficiary-name'],
            date: transaction.date,
            direction: transaction.direction,
            amount: transaction.amount,
            description:transaction.description,
            currency:transaction.currency,
            mcc:transaction.mcc,
            kind:transaction.kind,
            imageUrl:transaction.imageUrl,
            catcode:transaction.catcode



          }))
        })
      );
    }

    public getCategories() : Observable<Category[]>{
      return this.http.get<PageCategories>('http://127.0.0.1:4010/categories').pipe(
        map((and: PageCategories)=>{
          return and.items.map(category=>({
            code: category.code,
            parentCode: category['parent-code'],
            name: category.name
          }))
        })
      )
    }

    public addCategory(id:any,data:any){
      this.okej=`{ "catcode" : "${data}" } `

      const url=`http://127.0.0.1:4010/transaction/${id}/categorize`;
      return this.http.post(url,data);
    }


    public addSplit(id:any,data:any){
      

      const url=`http://127.0.0.1:4010/transaction/${id}/split`;
      return this.http.post(url,data);
    }
    
  
}
interface PageTransaction{
        items : Transaction[];
    }

interface PageCategories{
      items : Category[];
}