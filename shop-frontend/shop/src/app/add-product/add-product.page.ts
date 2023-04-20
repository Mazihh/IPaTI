import { Component, NgZone, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../api/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productForm: FormGroup;

  constructor(   
     public navCtrl: NavController,
     formBuilder:FormBuilder,
     private productService: ProductService,
     private router: Router,
     private zone: NgZone,
    ) { 

      this.productForm = formBuilder.group({
        title:["",[Validators.required]],
        imageUrl:["",[Validators.required]],
        description:["",[Validators.required]],
        price:["",[Validators.required]],

      })
    }


    onSubmit(){
      if (!this.productForm.valid) {
        return false;
      }else{
        this.productService.add_product(this.productForm.value).subscribe((response) => {
          this.zone.run(() => {
            this.productForm.reset();
            this.router.navigate(['/home']);
          })
        });;
      }
      //this.productService.add_product();
    }
  backToHome(){
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
