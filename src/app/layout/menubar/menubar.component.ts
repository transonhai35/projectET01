import { PlayerService } from 'src/app/service/player.service';
import { DataProgressService } from './../../service/data-progress.service';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements AfterViewInit {


  @Output() doClickUndo = new EventEmitter<void>();
  @Output() doClickBackward = new EventEmitter<void>();
  @Output() doClickPlay = new EventEmitter<void>();
  @Output() doClickNext = new EventEmitter<void>();
  @Output() doClickRandom = new EventEmitter<void>();
  @Output() doClickProgress = new EventEmitter<void>();

  @Input() controlToggle:string = 'fa-solid fa-play';
  @Input() isRandomActive:string = '';
  @Input() isUndoActive:string = '';
  @Input() progress:any = '';

  constructor(private dataProgressSvc: DataProgressService, private playerSvc: PlayerService){
    this.progress
  }

  ngAfterViewInit(): void {
  }

  onClickProgress() {
    this.dataProgressSvc.dataProgress = this.progress;
  }

}
