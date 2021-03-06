import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrls: ['./buy-coins.component.css']
})
export class BuyCoinsComponent implements OnInit {
  currentVal: number = 0;
  coinOwned: number=0;
  userInput: number=0;
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
  buyCoin(){
    let currentVal = this._httpService.getCurrentValue();
    this._httpService.increaseShintoCoinValue(this.userInput);
    this._httpService.AddCoin(this.userInput);
    this._httpService.generateTran(0,this.userInput,currentVal); //"Buy" changed to value 0
    this.coinOwned = this._httpService.getBalance();
    this.currentVal = this._httpService.getCurrentValue();
    console.log('how much I have: ',this.coinOwned);
  }
}
