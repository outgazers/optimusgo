import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public version = environment.version;

}
