import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isSideBarOpen = signal<boolean>(true);

  toggleSidebar() {
    this.isSideBarOpen.set(!this.isSideBarOpen());
  }

}

