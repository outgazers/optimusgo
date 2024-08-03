import { Component, inject, input } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ButtonModule } from "primeng/button";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Conversation } from '../../core/models/chat-histories.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  router = inject(Router);
  conversations = input.required<Conversation[]>();
  public version = environment.version;

  goToConversation(convId: number) {
    this.router.navigate(['/chat'], { queryParams: { id: convId } });
    // router navigate to /chat?id=convId
  }

}
