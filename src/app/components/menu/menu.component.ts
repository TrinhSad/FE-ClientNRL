import { Component, Input } from '@angular/core';
import { VAA_URL } from '../../utils/config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  VAA_URL = VAA_URL;

  @Input() isOpen = false;

  toggleDropdown(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement;
    if (parent) {
      parent.classList.toggle('active');
    }
  }

}
