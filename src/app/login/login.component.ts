import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg:string=''
  successMsg:boolean=false
//login  group 

loginForm = this.fb.group({
  //array
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswn:['',[Validators.required,Validators.pattern('[0-9a-z A-Z]*')]]
})
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

    login(){
      if(this.loginForm.valid){
        let acno = this.loginForm.value.acno
        let pswd = this.loginForm.value.pswn
        //login api call
        this.api.login(acno,pswd)
        .subscribe(
          //success
          (result:any)=>{
            this.successMsg=true
            //store username in local storage
            localStorage.setItem("usename",result.usename)

            //store current acno
            localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))

            //store token
            localStorage.setItem("token",result.token)

         // alert(result.message)
         setTimeout(()=>{
          //navigate dashboard

         this.router.navigateByUrl('dashborad')
         },2000)
          

         },
         //client error
         (result:any)=>{
          this.errorMsg = result.error.message
          setTimeout(()=>{
              this.errorMsg=''
              this.loginForm.reset()
          },3000);     
         })
      }

      else{
        alert('Invalid Form')
      }
      
    }
}
