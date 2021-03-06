import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-sell-coins',
  templateUrl: './sell-coins.component.html',
  styleUrls: ['./sell-coins.component.css']
})


export class SellCoinsComponent implements OnInit {
  currentVal: number = 0;  //These 3 lines could generate issues
  coinOwned: number = 0;  //since i had to assigned value 0
  userInput: number = 0;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getCoinVal();
    this.getCoinBalance();
  }
  getCoinVal(){
    this.currentVal = this._httpService.getCurrentValue();
  }
  getCoinBalance(){
    this.coinOwned = this._httpService.getBalance();
    return this.coinOwned;
  }
  sellCoin(){
    let currentVal = this._httpService.getCurrentValue();
    let currentCoin= this.getCoinBalance();
    if(this.userInput <= currentCoin ){
    this._httpService.decreaseShintoCoinValue(this.userInput);
    this._httpService.RemoveCoin(this.userInput);
    this._httpService.generateTran(0,this.userInput,currentVal); //"sold" changed to value 0
    this.coinOwned = this._httpService.getBalance();
    this.currentVal = this._httpService.getCurrentValue();
    console.log('how much I have: ',this.coinOwned);
    }else{
      console.log("not enough coin to sell");
    }
  }
}
