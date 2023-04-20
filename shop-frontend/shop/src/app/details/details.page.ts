import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  description:string;
  title:string;
  imageUrl:string;
  price:string;
  totalAmount: number = 0;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    public navCtrl: NavController,
    private productService: ProductService,
    

  ) {
   }

  backToHome(){
    this.navCtrl.back();
  }



  async calcTotalAmount(){
    const listPrice =  await this.productService.getData('price')
    //this.totalAmount =
    if(listPrice){

      for (let i of listPrice) {
        console.log(i)
        this.totalAmount += await i
      }

    } 
    
  }


  addPrice(){
    this.calcTotalAmount()
    this.productService.addData("price",[Number(this.price)])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.description = params.get('description')
      this.title = params.get('title')
      this.imageUrl = params.get('imageUrl')
      this.price = params.get('price')

    });
  }

}
