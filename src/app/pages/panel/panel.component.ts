import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  fragment: string | null = '';
  activatedRoute = inject(ActivatedRoute);

  scrollToSection() {
    setTimeout(() => {
      document.querySelector('#' + this.fragment)!.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  async ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment; });
  }




  ngAfterViewInit() {
    this.scrollToSection();
  }

}
