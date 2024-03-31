import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private giphyService: GiphyService) {}

  onSearchGifs(inputValue?: string) {
  if(inputValue !== '') {
      this.giphyService.searchGifs(inputValue);
    }
  }
}
