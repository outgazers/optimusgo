import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  goToCRM() {
    window.open(environment.crmUrl, '_blank');
  }
}
