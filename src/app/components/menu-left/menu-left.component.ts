import { Component, Output, EventEmitter, Input } from '@angular/core';
import { VAA_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent {
  @Output() menuToggle = new EventEmitter<void>();
  VAA_URL = VAA_URL;
  isOpen = false;

  selectedColor: string = '#fff';
  textColor: string = '#000';
  colors: string[] = ['#ffffff', '#384289', '#3F51B5', '#0099cc'];

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggle.emit();
  }

  toggleDropdown(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement;
    if (parent) {
      parent.classList.toggle('active');
    }
  }

  changeColor(color: string) {
    this.selectedColor = color;
    this.textColor = this.getTextColor(color);
  }

  getTextColor(backgroundColor: string): string {
    const color = backgroundColor.substring(1);
    const rgb = parseInt(color, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000' : '#fff';
  }
}
