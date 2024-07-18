import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public formGroup!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.formGroup = this.fb.group({
      message: [null],
    });
  }

  submitForm(){
    console.log(this.formGroup.value);
  }
}
