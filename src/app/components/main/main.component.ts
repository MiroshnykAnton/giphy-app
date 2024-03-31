import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  gifsList: any[] = [];
  subscription!: Subscription;

  constructor(private giphyService: GiphyService) {}
  
  ngOnInit() {
    this.giphyService.loadGifs();
    this.subscription = this.giphyService.getGifs().subscribe((response:any) => {
      this.gifsList = response;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

