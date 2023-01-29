import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { elementAt } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  allTransaction:any
  searchKey:string=''

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Login ......")
      //navigate login
      this.router.navigateByUrl('')
    }

    this.api.getAlltransaction()
    .subscribe((result:any)=>{
      this.allTransaction = result.transaction
      console.log(this.allTransaction);
      
    })
  }
  //search
  search(event:any){
    this.searchKey = event.target.value
  }

  //generatePdf
  generatePdf(){
    var pdf = new jspdf()
    let col = ['type','fromAcno','toAcno','amount']
    let row:any = []
    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    // covert array of object to nested Array (allTransaction)
    var itemNew = this.allTransaction;
    console.log(itemNew);
    

    for(let element of itemNew){
      var temp = [element.type,element.fromAcno,element.toAcno,element.amount];
      row.push(temp)

    }
    (pdf as any).autoTable(col,row,{startY:10})
    pdf.output('dataurlnewwindow');
    //downlode pdf document
    pdf.save('ministatement.pdf')
  }
}

