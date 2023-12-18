import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleClassService {

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
