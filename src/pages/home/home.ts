import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import MarvinImage
import { MarvinImage } from 'marvin';
// import Filters
import { Filter, GrayScaleFilter, BlackAndWhiteFilter, SepiaFilter, EmbossFilter, EdgeDetectionFilter, ResetFilter } from '../../app/models/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  originalImg: MarvinImage;  // original image
  outputImg: MarvinImage;  // modified image by the filters
  imageSrc: string = "/assets/test_image.jpg";  // path to the test image
  filters: Filter[] = [];  // filters to bind in the list

  constructor(public navCtrl: NavController) {
    this.loadImage();
    this.setupFilters();
  }

  refreshCanvas(image: MarvinImage) {
    image.draw(document.getElementById("canvasFilters"));
  }

  loadImage(){
    let self = this;
    this.originalImg = new MarvinImage();
    this.originalImg.load(this.imageSrc, function(){
      self.refreshCanvas(this);
      // create an empty MarvinImage with the same dimesions of the originalImg
      self.outputImg = new MarvinImage(this.getWidth(), this.getHeight());
    });
  }

  itemSelected(filter: Filter) {
    // handle the click event
    let img = filter.applyFilter(this.originalImg, this.outputImg);
    this.refreshCanvas(img);
  }

  setupFilters(){
    this.filters.push(new GrayScaleFilter("GrayScale"));
    this.filters.push(new BlackAndWhiteFilter("Black and White", 30));
    this.filters.push(new SepiaFilter("Sepia", 30));
    this.filters.push(new EmbossFilter("Emboss"));
    this.filters.push(new EdgeDetectionFilter("Edge Detection"));
    this.filters.push(new ResetFilter("Reset"));
  }

}
