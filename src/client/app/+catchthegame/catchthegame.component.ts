/**
 * Created by dan.cannova on 7/16/16.
 */

import { Component, ElementRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-catchthegame',
  templateUrl: 'catchthegame.component.html',
  styleUrls: ['catchthegame.component.css'],
})

export class CatchTheGameComponent {
  // States
  private started: boolean = false;

  // Objects
  private stage: Stage;
  private box : Box;

  constructor(private _elm: ElementRef){
      console.log(this._elm);
  }

  ngOnInit(){
    this.stage = new Stage();
    this.box = new Box();
  }

  public Start(){
    this.started = true;
    this.addBox();
  }

  private addBox(){
    this.stage.SetupBox(this.box);
  }

}

class Stage {
  private _sizingDiv;
  private _stageDiv;
  private _box: Box;

  constructor() {
    // Init
    this._stageDiv = document.getElementsByClassName('stage')[0];
    this._sizingDiv = document.getElementsByClassName('sizeMe')[0];
    console.log('My (Size) ', this._sizingDiv.getBoundingClientRect());
    console.log('My Stage ', this._stageDiv.getBoundingClientRect());

    this.setDefaultValues();

  }

  public OnResize() {
    this.m_setWindowDimensions();
    this.m_setBoxDimensions();
  }

  public setDefaultValues() {
    this.m_setWindowDimensions();
  }

  public SetupBox(box:Box) {
    this._box = box;
    this.m_setBoxDimensions();
  }

  private m_setBoxDimensions() {
    if( this._box) {
      let dims = this.m_getDimensions();
      this._box.SetDimensionByScale(dims.width/4, dims.height/4);
    }
  }

  private m_setWindowDimensions() {
    // get height
    let stageHeight = this.m_getDimensions().height;
    this._stageDiv.style.height = stageHeight + 'px';
  }

  private m_getDimensions() {
    let rect = this._sizingDiv.getBoundingClientRect();
    let stageHeight = rect.height - rect.top;
    return { width: this._stageDiv.getBoundingClientRect().width, height: stageHeight};
  }

}

class Box {
  private _boxDiv;
  private _goingRight = false;

  constructor(){
    this._boxDiv = document.getElementsByClassName('box')[0];
  }

  public SetDimensionByScale(stageWidth, stageHeight) {
    this._boxDiv.style.width = stageWidth + "px";
    this._boxDiv.style.height = stageHeight + "px";
  }

  public Move(){
    this._boxDiv.className = 'box goto-top-right';
    this._goingRight = true;
  }

  public NewDirection(){
    if (this._goingRight){
      this._goingRight = false;
      this._boxDiv.className = 'box goto-top-left';
    }else{
      this.Move();
    }
  }
}
