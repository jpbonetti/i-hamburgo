import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalLanches = 0;

  menuName = 'Cardápio - I-Hamburgo';
  menuDescryption = 'Escolha suas opções, adicione ao pedido e tenha um ótimo apetite';

  buttonAddName = 'Adicionar ao Pedido';

  listOrders = [];
  listHamburguersAdded = [];
  listIngredientsAdded = [];
  listHamburguers = this.createListOfHamburguers();
  listIngredients = this.createListIngredients();
  listPromotions = this.createListPromotions();

  onSelectItems(item, itemChecked) {
    if(itemChecked) {
      this.listHamburguersAdded.push(item);
    } else {
      if(this.listHamburguersAdded.length > 0) {
        for (let i = 0; i < this.listHamburguersAdded.length; i++) {
          const element = this.listHamburguersAdded[i];
          if(item.id == element.id) {
            this.listHamburguersAdded.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  onSelectIngredients(item, itemChecked) {
    if(itemChecked) {
      this.listIngredientsAdded.push(item);
    } else {
      if(this.listIngredientsAdded.length > 0) {
        for (let i = 0; i < this.listIngredientsAdded.length; i++) {
          const element = this.listIngredientsAdded[i];
          if(item.id == element.id) {
            this.listIngredientsAdded.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  addHamburguersChecked() {
    if(this.listHamburguersAdded.length > 0) {
      this.listHamburguersAdded.forEach(element => {
        this.listOrders.push(element);
        this.totalLanches += element.price;
      });
    }
  }

  addCustomHamburguer() {
    let descryption = '';
    let price = 0;
    
    if(this.listIngredientsAdded.length > 0) {
      for (let index = 0; index < this.listIngredientsAdded.length; index++) {
        const element = this.listIngredientsAdded[index];
      
        if(index == 0) {
          descryption += element.name;
        } else {
          descryption += ', ' + element.name;
        }
        
        price += element.price;
      }

      this.listOrders.push(
        {
          name : descryption,
          type : 'Personalizado',
          descryption : descryption,
          price : price
        }
      );

      this.totalLanches += price;
    }
  }

  createListOfHamburguers() {
    let listHamburguers = [
      { id : 1, name : 'X-Bacon', type: 'da Casa', descryption: 'Bacon, hambúrguer de carne e queijo', price : 6.50},
      { id : 2, name : 'X-Burger', type: 'da Casa', descryption: 'Hambúrguer de carne e queijo', price : 4.50},
      { id : 3, name : 'X-Egg', type: 'da Casa', descryption: 'Ovo, hambúrguer de carne e queijo', price : 5.30},
      { id : 4, name : 'Bacon', type: 'da Casa', descryption: 'Ovo, bacon, hambúrguer de carne e queijo', price : 7.30}
    ];

    return listHamburguers;
  }

  createListIngredients() {
    let listIngredients = [
      { id : 1, name : 'Alface', price : 0.40 },
      { id : 2, name : 'Bacon', price : 2.00 },
      { id : 3, name : 'Hambúrguer de carne', price : 3.00 },
      { id : 4, name : 'Ovo', price : 0.80 },
      { id : 5, name : 'Queijo', price : 1.50 }
    ];

    return listIngredients;
  }

  createListPromotions() {
    let listIngredients = [
      { id : 1, name : 'Light', descryption : 'Se o lanche tem alface e não tem bacon, ganha 10% de desconto' },
      { id : 2, name : 'Muita carne', descryption : 'A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...' },
      { id : 3, name : 'Muito queijo', descryption : 'A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...' }
    ];

    return listIngredients;
  }
}
