import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    './../../assets/images/slider/example-slide-350-1.jpg',
    './../../assets/images/slider/example-slide-350-2.jpg',
    './../../assets/images/slider/example-slide-350-3.jpg',
    './../../assets/images/slider/example-slide-350-4.jpg'];

  tileImages: string[] = [
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

  tileCarouselOptions: any = {
    nav: true,
    dots: false,
    loop: false,
    items: 3,
    lazyLoad: true,
    autoplay: false
  };

  constructor() { }

  ngOnInit() {
  }

}
