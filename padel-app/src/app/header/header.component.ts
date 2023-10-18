import { Component, EventEmitter, Output } from "@angular/core";

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:  ['./header.component.css']
})
export class HeaderComponent {
    @Output() featureSelected = new EventEmitter<string>();
    isDropdownOpen = false; 

    onSelect(feature: string) {
        this.featureSelected.emit(feature);


    }
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
}

