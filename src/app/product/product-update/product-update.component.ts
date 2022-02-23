import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  id!: number;
  product!: Product;
  form!: FormGroup;
  
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.find(this.id).subscribe((data: Product)=>{
      this.product = data;
    });
    
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      // productCode: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      // starRating: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.productService.update(this.id, this.form.value).subscribe(res => {
         console.log('Product updated successfully!');
         this.router.navigateByUrl('product/index');
    })
  }

}
