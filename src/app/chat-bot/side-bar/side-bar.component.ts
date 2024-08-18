import { Component, inject, input, output } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ButtonModule } from "primeng/button";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Conversation } from '../../core/models/chat-histories.model';
import { ChatDataService } from '../../core/services/chat-data.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  router = inject(Router);
  chatService = inject(ChatDataService)
  conversations = input.required<Conversation[]>();
  conversationsUpdated = output<Conversation>();
  public version = environment.version;

  goToConversation(convId: number) {
    this.router.navigate(['/chat'], { queryParams: { id: convId } });
    // router navigate to /chat?id=convId
  }

  createConversation() {
    this.chatService.createConversation().subscribe((res) => {
      this.conversationsUpdated.emit(res);
      this.router.navigate(['/chat'], { queryParams: { id: res.id } });
    })
  }

}
