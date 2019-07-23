import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  totalLanches = 0;
  listLanches = [
    { id : 1, order : 0, name : 'X-Bacon', descryption: 'Bacon, hambúrguer de carne e queijo', checked : false, price : 6.50},
    { id : 2, order : 0, name : 'X-Burger', descryption: 'Hambúrguer de carne e queijo', checked : false, price : 4.50},
    { id : 3, order : 0, name : 'X-Egg', descryption: 'Ovo, hambúrguer de carne e queijo', checked : false , price : 5.30},
    { id : 4, order : 0, name : 'Bacon', descryption: 'Ovo, bacon, hambúrguer de carne e queijo', checked : false, price : 7.30}
  ];

  listaPedidos = [];

  listLanchesAdded = [];

  personalizarAlfaceChecked = false;
  personalizarBaconChecked = false;
  personalizarHamburguerCarneChecked = false;
  personalizarOvoChecked = false;
  personalizarQueijoChecked = false;

  onSelectItems(item, itemChecked) {
    if(itemChecked) {
      this.listLanchesAdded.push(item);
    } else {
      if(this.listLanchesAdded.length > 0) {
        for (let i = 0; i < this.listLanchesAdded.length; i++) {
          const element = this.listLanchesAdded[i];
          if(item.id == element.id) {
            this.listLanchesAdded.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  addLanchesChecked() {
    if(this.listLanchesAdded.length > 0) {
      
      this.listLanchesAdded.forEach(element => { 
        this.listaPedidos.push(element);
        this.totalLanches += element.price;
      });
    }
  }
}
