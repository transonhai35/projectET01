import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SONGS } from '../features/Songs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  emptySong: Song = {
    name:'',
    singer:'',
    path:'',
    image:'../../assets/img/hustlogo.png'
  }
  songList: Song[] = SONGS;

  private currentSong$: Subject<Song> = new BehaviorSubject(this.emptySong);
  public currentSongObservable = this.currentSong$.asObservable();

  private timeSong$: Subject<number> = new BehaviorSubject(0);
  public timeSongObservable = this.timeSong$.asObservable();

  private durationSong$: Subject<number> = new BehaviorSubject(0);
  public  durationSongObservable = this.durationSong$.asObservable();



  constructor() { }

  public set currentSong(data : Song) {
    this.currentSong$.next(data);
  }

  public set timeSong(value: number) {
    this.timeSong$.next(value);
  }

  public set durationSong(value: number) {
    this.durationSong$.next(value);
  }

}
