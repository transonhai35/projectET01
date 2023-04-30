
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SONGS } from '../features/Songs';
import { elementAt } from 'rxjs';
import { DataProgressService } from '../service/data-progress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  progress: any = 0;
  className:string = 'fa-solid fa-play';
  isRandomActive: string = '';
  isUndoActive: string = '';
  listSongs = SONGS;
  presentNameSong:string = '';
  presentImgSong: string = '../../assets/img/hustlogo.png';
  presentAudioSrc: string = '';
  checkAudioPlaying: boolean = false;
  audio = new Audio();
  currentIndex: number = -1;
  newIndex:number = -3;

  constructor(private dataProgress$:DataProgressService ){
    this.dataProgress$.dataProgressObs.subscribe(value => {
      this.progress = Number(value);
    })
  }

  ngAfterViewInit() {
    this.isUpdate();
    this.isAudioEnded();
    // this.onChange();
  }



  checkIndexSelection(index:number) {
    return index === this.currentIndex;
  }


  onClickSong(index:number) {
    this.presentNameSong = this.listSongs[index].name;
    this.presentImgSong = this.listSongs[index].image;
    this.presentAudioSrc = this.listSongs[index].path;
    this.audio.src = this.presentAudioSrc;
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
    this.presentNameSong = this.listSongs[this.currentIndex].name;
    this.presentImgSong = this.listSongs[this.currentIndex].image;
    this.presentAudioSrc = this.listSongs[this.currentIndex].path;
    this.audio.src = this.presentAudioSrc;
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
    this.presentNameSong = this.listSongs[this.currentIndex].name;
    this.presentImgSong = this.listSongs[this.currentIndex].image;
    this.presentAudioSrc = this.listSongs[this.currentIndex].path;
    this.audio.src = this.presentAudioSrc;
    this.checkAudioPlaying = true;
    this.className = 'fa-solid fa-pause';
    this.audio.load();
    this.audio.play();
  };

  isUpdate(){
    this.audio.ontimeupdate = () => {
      if (this.audio.duration){

        let progressPercent = Math.floor(this.audio.currentTime / this.audio.duration * 100)
        this.progress = progressPercent;
      }


    };

  }

  onChange() {
    this.progress.onchange = () => {

      let seekTime = this.audio.duration / 100 * this.progress ;
      this.audio.currentTime = seekTime;
    }

  }

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

  isAudioEnded() {
    this.audio.onended = () => {
      if( this.isUndoActive === 'active'){
        this.audio.play();
      }else {
        this.doNextSong();
      }
    }
  }

  playUndoSong(){}





}
