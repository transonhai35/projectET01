import { PlayerService } from './../service/player.service';


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { elementAt, subscribeOn } from 'rxjs';
import { DataProgressService } from '../service/data-progress.service';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  progress: any = 0;
  className:string = 'fa-solid fa-play';
  isRandomActive: string = '';
  isUndoActive: string = '';
  listSongs: Array<any> = [];
  checkAudioPlaying: boolean = false;
  audio = new Audio();
  currentIndex: number = -1;
  newIndex:number = -3;
  selectedSong:  any;
  seekTime: number = 0;

  constructor(private dataProgressSvc:DataProgressService, private songListService: PlayerService ){
    this.dataProgressSvc.dataProgressObs.subscribe(value => {
      this.progress = value;
      this.seekTime = this.audio.duration / 100 * this.progress;
      this.audio.currentTime = this.seekTime;
    })

    this.listSongs = this.songListService.songList;
  }

  ngOnInit(): void {
    this.songListService.currentSong = this.songListService.emptySong;
    this.songListService.currentSongObservable.subscribe (data => {
      this.selectedSong = data;
    })
  }

  ngAfterViewInit() {
    this.audio.ontimeupdate = () => {
      if (this.audio.duration){

        let progressPercent = Math.floor(this.audio.currentTime / this.audio.duration * 100)
        this.progress = progressPercent;
        this.songListService.timeSong = this.progress;
      }


    };
    this.audio.onended = () => {
      if( this.isUndoActive === 'active'){
        this.audio.play();
      }else {
        this.doNextSong();
      }
    }
  }

  checkIndexSelection(index:number) {
    return index === this.currentIndex;
  }

  onClickSong(index:number) {
    this.songListService.currentSong = this.listSongs[index];
    this.audio.src = this.listSongs[index].path;
    this.checkAudioPlaying = true;
    this.className = 'fa-solid fa-pause';
    this.currentIndex = index;
    this.audio.play();
  }

  onAudioPlay(){
    if(this.checkAudioPlaying){
      this.checkAudioPlaying = false;
      this.className = 'fa-solid fa-play';
      this.audio.pause();
    }else {
      this.checkAudioPlaying = true;
      this.className = 'fa-solid fa-pause';
      this.audio.play();
    }
  }



  doNextSong () {
    if(this.isRandomActive !== 'active'){
      this.currentIndex++;
      if (this.currentIndex >= this.listSongs.length) {
          this.currentIndex = 0;
      }
    }else {
      this.playRandomSong();
      this.currentIndex = this.newIndex;
    }
    this.songListService.currentSong = this.listSongs[this.currentIndex];
    this.audio.src = this.listSongs[this.currentIndex].path;
    this.checkAudioPlaying = true;
    this.className = 'fa-solid fa-pause';
    this.audio.load();
    this.audio.play();
  };
  doPrevSong () {
    if(this.isRandomActive !== 'active'){
      this.currentIndex--;
      if (this.currentIndex < 0) {
          this.currentIndex = this.listSongs.length - 1;
      }
    }else {
      this.playRandomSong();
      this.currentIndex = this.newIndex;
    }
    this.songListService.currentSong = this.listSongs[this.currentIndex];
    this.audio.src = this.listSongs[this.currentIndex].path;
    this.checkAudioPlaying = true;
    this.className = 'fa-solid fa-pause';
    this.audio.load();
    this.audio.play();
  };

  onClickRandomSong() {
    if(this.isRandomActive !== 'active') {
      this.isRandomActive = 'active';
    }else{
      this.isRandomActive = '';
      return;
    }
  }

  onClickRepeatSong() {
    if(this.isUndoActive !== 'active') {
      this.isUndoActive = 'active';
    }else{
      this.isUndoActive = '';
      return;
    }
  }

  playRandomSong(){
      do {
          this.newIndex = Math.floor(Math.random() * this.listSongs.length);
      }while (this.newIndex === this.currentIndex);
    }


  playUndoSong(){}
}
