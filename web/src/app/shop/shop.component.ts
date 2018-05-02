import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  images: string[] = [
    './../../assets/images/slider/example-slide-350-1.jpg',
    './../../assets/images/slider/example-slide-350-2.jpg',
    './../../assets/images/slider/example-slide-350-3.jpg',
    './../../assets/images/slider/example-slide-350-4.jpg'];

  carouselOptions: any = {
    nav: false,
    dots: true,
    loop: true,
    items: 1,
    lazyLoad: true,
    autoplay: true
  };
  constructor() { }

  ngOnInit() {
  }

}
