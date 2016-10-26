/**
 * Created by dan.cannova on 7/16/16.
 */

import { Component, ElementRef } from '@angular/core';
import random = require("core-js/fn/number/random");

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

  ngOnDestroy() {
    console.log("leaving");
    this.box.Destroy();
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
    //this.stage.SetupBlock();
  }

  private BoxClick() {
    this.box.click();
  }

}

class Stage {
  private _sizingDiv: any;
  private _stageDiv: any;
  private _box: Box;
  private _block: Box;

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
    this._box.SetLabel("Click Me!");
    this.m_setBoxDimensions();
    this._box.NewDirection();
  }

  public SetupBlock() {
    this._block = new Box('block');
    let dims = this.m_getDimensions();
    this._block.SetDimensionByScale(dims.width/4, dims.height/4);
    // Set transform?
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
  private _boxDiv: any;
  private _goingRight = false;

  private cssDirections = [
    'top-right',
    'top-left',
    'bottom-left',
    'bottom-right',
  ];

  private cssTransform: Array<string> = [
    'translate(300%, 0%)',
    'translate(0%, 0%)',
    'translate(0%, 299.4%)',
    'translate(299.4%, 299.4%)'
  ];

  private minTransitionTime = 1;
  private currentTransitionTime = this.minTransitionTime;
  private cssTransition: string = `transform ${this.minTransitionTime}s ease`;
  private timeoutID;

  constructor(who = 'box'){
    this._boxDiv = document.getElementsByClassName(who)[0];
  }

  public Destroy() {
    window.clearTimeout(this.timeoutID);
  }

  public click() {
    this.currentTransitionTime = this.currentTransitionTime/2;
  }

  public SetDimensionByScale(stageWidth: any, stageHeight: any) {
    this._boxDiv.style.width = stageWidth + "px";
    this._boxDiv.style.height = stageHeight + "px";
  }

  public SetLabel(labelString){
    console.log(this._boxDiv.getElementsByClassName('boxLabel')[0]);
    //this._boxDiv.getElementsByClassName('boxLabel')[0].innerHTML = labelString;
  }

  public NewDirection() {
    let cssClass = this._boxDiv.className;
    let index = this.getRandomInt(0,3);
    let newClass = this.cssDirections[index];

    console.log(cssClass,",", newClass);

    //TODO: turn this into a if condition to not delay so much
    while(cssClass.indexOf(newClass) !== -1){
      index = this.getRandomInt(0,3);
      newClass = this.cssDirections[index];
    }

    //console.log("ClassName:", this._boxDiv.className);

//    this._boxDiv.className = 'box goto-'+ newClass;
    //this._boxDiv.className = 'box goto-'+ newClass;

    // console.log("transform:", this._boxDiv.style.transform, index, this.cssTransform[index]);
    this._boxDiv.style.transform = this.cssTransform[index];
    this._boxDiv.style.transition = this.cssTransition.replace(/\d+/g, this.currentTransitionTime );
    // console.log("transform:", this._boxDiv.style.transform);

    //TODO: How to setTimeOut to call this function again.
    this.timeoutID = window.setTimeout(this.NewDirection.bind(this), this.currentTransitionTime * 1000);
  }

   /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
   private getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
}
