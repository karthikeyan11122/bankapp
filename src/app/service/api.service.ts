import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const options  = {
  headers : new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http:HttpClient) { }

  //register
  register(uname:any,acno:any,pswn:any){
    //register
    const body = {
      uname,
      acno,
      pswn
    }
    //server call to register an account and return response to register commponent
    return this.http.post('http://localhost:3000/register',body)

    }
    //login
    login(acno:any,pswn:any){
      const body = {
        acno,
        pswn
      }
         //server call to login an account and return response to login commponent
         return this.http.post('http://localhost:3000/login',body)

    }
    //appending token to the http header
    appendToken(){
              //fetch token from loal storage 
      const token =localStorage.getItem("token")||''
      //create http header 
      var headers = new HttpHeaders()
      if(token){
              //append token inside  heders

        headers=headers.append('access-token',token)
        options.headers=headers
      }
      return options

            
    }
    
    
    //get balance 

    getBalance(acno:any){
      return this.http.get('http://localhost:3000/getBalance/'+acno, this.appendToken())

    }

    //deposit
    deposit(acno:any,amount:any){
      const body = {
        acno,
        amount
      }
     return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
    }

    //fund transfer
    fundTransfer(toAcno:any,pswd:any,amount:any){
      const body={
        toAcno,
        pswd,
        amount
      }
      return this.http.post('http://localhost:3000/fundTransfer',body,this.appendToken())
    }

    //getAlltransaction 
    getAlltransaction(){
      return this.http.get('http://localhost:3000/all-transaction',this.appendToken())
    }

    //delete account api

    deleteAccount(acno:number){
      return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())

    }

  }
  

