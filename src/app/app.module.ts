import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionComponent } from './transaction/transaction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {  ReactiveFormsModule } from '@angular/forms';
import { SplitTransComponent } from './split-trans/split-trans.component';









@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    CategoryComponent,
    SplitTransComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgbModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule
    
    
    
   
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
