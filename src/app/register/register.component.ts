import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
register:any = FormGroup;
userList:any = [];
id: any;
  constructor(private fb:FormBuilder, private router:Router, private commonserv: CommonService) { 

  }

  ngOnInit(): void {
    this.register = this.fb.group({
      name:['',Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

    registerSubmit(data:any){
      console.log(data)

      this.commonserv.getUser().subscribe((data:any)=>{
        this.userList = data;
      })

      let dataToPass = {
        name:data.name,
        email:data.email,
        id: this.userList.length
      }
      this.id++;
      this.commonserv.addUser(dataToPass).subscribe((data:any)=>{
        console.log(data);
      })
      this.router.navigate(['login'])
    }

    goToLogin(){
      this.router.navigate(['login'])
    }
  

}
