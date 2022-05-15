import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:any = FormGroup;
  users:any = [];
  constructor(private fb: FormBuilder, private router:Router, private commonserv: CommonService) { 

  }

  ngOnInit(): void {
    this.login = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required, Validators.email])]

    })

    this.commonserv.getUser().subscribe((data:any)=>{
      this.users = data;
    })
  }

  loginSubmit(data:any){
      console.log(data);

      if(data.name){
        this.users.forEach((item:any)=>{

          if(item.name === data.name && item.email === data.email){
            localStorage.setItem("isLoggedIn", "true");
            this.router.navigate(['home']);
          }

          else{
            localStorage.clear()
            // this.login.name.clear();
            // this.login.email.clear();

          }

        });
      }
  }

  goToRegister(){
    this.router.navigate(['register'])
  }
}
