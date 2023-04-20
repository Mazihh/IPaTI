import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerFormGroup:FormGroup;
  constructor(
    formBuilder: FormBuilder,
    private userSerivse: UserService,
    private router: Router,
    private zone: NgZone,

  ) { 
    this.registerFormGroup = formBuilder.group({
      username:["",[Validators.required]],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password:["",[Validators.required,Validators.minLength(6)]],
      confirm_password:["",[Validators.required,Validators.minLength(6)]]
    }
    );
    
  }


  onSubmit(){
    if (!this.registerFormGroup.valid) {
      return false;
    }else{
      this.userSerivse.create_user(this.registerFormGroup.value).subscribe((response) => {
        this.zone.run(() => {
          this.registerFormGroup.reset();
          this.router.navigate(['/login']);
        })
      });;
    }
  }

  ngOnInit() {
  }

}
