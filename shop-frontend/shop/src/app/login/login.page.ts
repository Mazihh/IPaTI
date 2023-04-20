import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { GetOneUser } from '../models/user';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';  

var is_active = false

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup:FormGroup;
  typeError: boolean = false;
  user : Observable<GetOneUser>
  constructor(
    formBuilder:FormBuilder,
    private userService : UserService,
    private dataService: DataService,
    private router: Router,
    private zone: NgZone,
    public alertCtrl: AlertController,

  ) { 

    this.loginFormGroup =formBuilder.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]]
    });
 

  }


  async onSubmit() {
    if (!this.loginFormGroup.valid) {
      return false;
    } else {
      const username = this.loginFormGroup.value.username
   
      let data  = ''
      await fetch('http://localhost:5000/users/'+username)
      .then(function(response) {
        return response.json();
      })
      .then(async function(myJson) {
    
        data=myJson
        
     if(data['is_active']){
      console.log('user is active!')

      is_active = true
      

      
      
    }else{
      is_active = false
      document.getElementById("checkEmailLabel").style.display ="block"
      console.log('Please Confirm Your email to activate your account!')
      fetch('http://127.0.0.1:5000/send_email/'+username)
      
    }
      });
      


      if(is_active){
      this.userService.loginUser(this.loginFormGroup.value)
      .subscribe((response) => {
        this.zone.run(() => {
          
         

          this.loginFormGroup.reset();
          try {

          if(response['token']){
            //console.log(response)
            this.dataService.addToken('token',response['token']);
            this.router.navigate(['/home']);
          }}
          catch(TypeError){
            this.typeError = true;
            console.log(response)
          }  
        })
      });
    }
    }
  }
 



  ngOnInit() {
  }

}
