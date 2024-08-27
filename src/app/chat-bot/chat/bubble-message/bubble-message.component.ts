import { CommonModule } from '@angular/common';
import { Component, effect, input, InputSignal, type OnInit } from '@angular/core';
import { role } from '../../../core/models/chat-history-details.model';
export enum messageTypeEnum {
  sent,
  received
}
@Component({
  selector: 'app-bubble-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './bubble-message.component.html',
  styleUrl: './bubble-message.component.scss',
})
export class BubbleMessageComponent implements OnInit {

  content: InputSignal<string> = input('text');
  type: InputSignal<role> = input.required();
  messageType = messageTypeEnum;
  isJSON = false;


  private contentInput = effect(
    () => {
      if (this.content().startsWith('[\n    {')) {
        this.isJSON = true;
        this.companies = JSON.parse(this.content());
        // Generate table headers based on the first company object
        this.tableHeaders = Object.keys(this.companies[0]);
        console.log(this.tableHeaders);

      }
    }
  )
  companies: any;
  tableHeaders: string[] = [];

  ngOnInit(): void { }

}
