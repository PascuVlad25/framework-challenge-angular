import { Component } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PageChangerService } from 'src/app/services';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  // FontAwesome icons
  public arrowLeft = faArrowLeft;
  public arrowRight = faArrowRight;

  constructor(private pageChangerService: PageChangerService) { }

  public isAvailableNext(): boolean {
    return this.pageChangerService.isAvailableNext();
  }

  public isAvailablePrevious(): boolean {
    return this.pageChangerService.isAvailablePrevious();
  }

  public nextPage(): void {
    this.pageChangerService.nextPage();
  }

  public previousPage(): void {
    this.pageChangerService.previousPage();
  }

}
