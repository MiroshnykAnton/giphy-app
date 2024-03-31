import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IGifData {
  title: string;
  trending_datetime: string;
  images: any
}

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  giphyApiKey = '82SzS25fScZCxd1Vd6v7o39ASQAaVuUC';
  gifs = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  public loadGifs() {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=82SzS25fScZCxd1Vd6v7o39ASQAaVuUC&q=1&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    .subscribe((response: any)=> {
      this.gifs.next(response.data);
    });
  }


  public searchGifs(_inputValue: string | undefined) {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=82SzS25fScZCxd1Vd6v7o39ASQAaVuUC&q=1&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    .subscribe((response: any)=> {
      this.gifs.next(response.data);
    });
  }

  public getGifs(): Observable<any> {
    return this.gifs.asObservable().pipe(
      map((response)=> {
        return this.transormGifsResponse(response)
      })
    );
  }

  private transormGifsResponse(data: any): IGifData[] {
    return data.map(({ title, trending_datetime, images }: any) => {
      const shortenedTitle = title.split(' ').slice(0, 3).join(' ');
      
      const dateParts = new Date(trending_datetime).toDateString().split(' ');
      const formattedDate = `${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;
      
      return {
        title: shortenedTitle,
        trending_datetime: formattedDate,
        images
      };
    });
  }
}
