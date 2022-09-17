import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../Models/Product.model';
import { User } from '../Models/User.model';
import { ProductService } from '../services/product.service';
declare var jQuery:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 searchTerm: string;
 form!:FormGroup;
 product!:Product;
  title!: string;
  products!:Product[];
  deleteProductId!:any;
  selectedImage:string;
  constructor(private productService:ProductService,private router:Router) { }
  user:User
  ngOnInit(): void {
    if(localStorage.getItem('user') == null) {
      jQuery('.login').modal('show');
    }

    let v=localStorage.getItem('user')
    if (v!==null){
    this.user = JSON.parse(v);
    
    this.getProducts();
    
  }

    this.initializeForm();
    this.product = this.form.value;
   }
   openImage(image:string){
     this.selectedImage=image;
     jQuery('.image').modal('show');
   }
   getProducts(){
    this.productService.getProducts().subscribe((data:Product[]) => {
      this.products = data;
      console.log(data);
    })}
   initializeForm(){
    this.form= new FormGroup({
      nom: new FormControl('',[Validators.required]),
      prix: new FormControl(0,[Validators.required]),
      categorie:new FormControl('',[Validators.required]),
      promotions:new FormControl('',[Validators.required]),
      quantite:new FormControl(0,[Validators.required]),
      image:new FormControl('../assets/images/aa.jpeg',[Validators.required]),
    });
   }
  

   public openAddProductModal(){
    this.initializeForm();
    this.product = this.form.value;
    this.title = "Add Product";
    jQuery('.modal-add-product-form').modal('show');
  }
  closeModal(modalClass:string){
    jQuery(modalClass).modal('hide');
  }
  Add(){
    //this.container=this.form.value;
    this.productService.addProduct(this.form.value).subscribe(data => {
      this.closeModal('.modal-add-product-form');
    this.getProducts();
    });
  }
 
  openUpdateProductModal(product: Product) {
    this.title = "Update Product";
    this.product = product;
    jQuery('.modal-add-product-form').modal('show');

  }
  updateProduct(){
    this.productService.updateProduct(this.product.id,this.form.value).subscribe(data=>{
      this.closeModal('.modal-add-product-form');
      this.getProducts();
    });
    

  }
deleteProduct(){
  this.productService.deleteProduct(this.deleteProductId).subscribe(data=>{
    this.getProducts();
    this.closeModal('.delete-product');
  })
}
openDeleteProductModal(id:number){
  this.deleteProductId = id;
  jQuery('.delete-product').modal('show');
}
logOut(){
  localStorage.clear();
  this.router.navigate(["/login"]);

}
redirectToLogin() {
  this.router.navigate(["/login"]);
  this.closeModal(".login")
}
search(value: string): void {
  this.products = this.products.filter((val) => val.nom.toLowerCase().includes(value));
  if (value.toLowerCase()==""){
    this.getProducts()
    
  }

  }

}


