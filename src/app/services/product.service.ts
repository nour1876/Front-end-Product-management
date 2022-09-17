import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { Product } from '../Models/Product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
addProduct(product:Product){
    return this.http.post("http://localhost:8083/api/v1/products",product);
}
updateProduct(id: any,product:Product){
    return this.http.put("http://localhost:8083/api/v1/product/"+id,product);
    
}
deleteProduct(id:any){
  return this.http.delete("http://localhost:8083/api/v1/product/"+id);

}
getProductById(id: any){
  return this.http.get("http://localhost:8083/api/v1/products/" + id);
}
getProducts(){
  return this.http.get("http://localhost:8083/api/v1/products");
}
}

