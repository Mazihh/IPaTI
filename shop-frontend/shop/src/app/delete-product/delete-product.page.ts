import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../api/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.page.html',
  styleUrls: ['./delete-product.page.scss'],
})
export class DeleteProductPage implements OnInit {
  deleteProductForm: FormGroup;
  constructor(   
    public navCtrl: NavController,
    formBuilder:FormBuilder,
    private productService :ProductService,
    private router: Router,
    private zone: NgZone,
   ) { 

    this.deleteProductForm = formBuilder.group({
      id:["",[Validators.required]],

    })
   }


   onSubmit(){
    if (!this.deleteProductForm.valid) {
      return false;
    }else{
        console.log("Delete Form")
        this.productService.delete_product(this.deleteProductForm.value.id).subscribe((response) => {
          this.zone.run(() => {
            this.deleteProductForm.reset();
            this.router.navigate(['/home']);
          })
        });;
      }
    
  }


   backToHome(){
    this.navCtrl.back();
  }


  ngOnInit() {
  }

}
