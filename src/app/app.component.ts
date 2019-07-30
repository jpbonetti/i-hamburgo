import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalLanches = 0;

  labelHamburguerName = 'Nome';
  labelOrders = 'Pedido';
  labelValueOrder = 'Total(R$)';
  labelIngrediente = 'Ingrediente';
  labelIngredientes = 'Ingredientes';
  labelPrice = 'Preço';
  labelNumber = 'Quantidade';
  labelCustomHamburguers = 'Personalizados';

  tabHamburguerName = 'Lanches';
  tabCustomName = 'Personalizar';
  tabPromotionName = 'Promoções';

  menuName = 'Cardápio I-Hamburgo';
  menuDescryption = 'Escolha suas opções, adicione ao pedido e tenha um ótimo apetite';

  buttonAddName = 'Adicionar ao Pedido';

  listOrdersHamburguers = [];
  listOrdersCustomHamburguers = [];

  listHamburguersAdded = [];
  listIngredientsAdded = [];
  listDefaultNumberLists = [0, 1, 2, 3, 4, 5];
  listHamburguers = this.createListOfHamburguers();
  listIngredients = this.createListIngredients();
  listPromotions = this.createListPromotions();

  onSelectNumberOfHamburguers(item, numberSelected) {
    this.listOrdersHamburguers = [];
    for (let i = 0; i < numberSelected; i++) {
      this.removeItemList(this.listHamburguersAdded, item);

      item.number = numberSelected;
      this.listHamburguersAdded.push(item);
    }
  }

  onSelectIngredients(item, numberSelected) {
    if (numberSelected === 0) {
      this.removeItemList(this.listIngredientsAdded, item);
    } else {
      for (let i = 0; i < numberSelected; i++) {
        this.removeItemList(this.listIngredientsAdded, item);
        item.number = numberSelected;
        this.listIngredientsAdded.push(item);
      }
    }
  }

  removeItemList(listOrigin, objectToCompare) {
    for (let i = 0; i < listOrigin.length; i++) {
      const element = listOrigin[i];
      if (objectToCompare.id === element.id) {
        listOrigin.splice(i, 1);
        break;
      }
    }
  }

  addHamburguersChecked() {
    let foundHamburguer = false;
    if (this.listHamburguersAdded.length > 0) {
      this.listHamburguersAdded.forEach(element => {

        this.listOrdersHamburguers.forEach(order => {
          if (order.id === element.id) {
            element.number ++;
            foundHamburguer = true;
          }
        });

        if (!foundHamburguer) {
          this.listOrdersHamburguers.push(element);
        }
        this.totalLanches += element.price;
      });
    }
  }

  addCustomHamburguer() {
    const price = this.createPriceOrder();
    const order = this.createOrder(this.createDescryptionOrder(), this.listIngredientsAdded, price);
    if (this.listIngredientsAdded.length > 0) {
      this.listOrdersCustomHamburguers.push(order);
      this.totalLanches += order.price;
    }
  }

  createPriceOrder() {
    let price = 0;

    const ingredients = this.getNumberIngredients(this.listIngredientsAdded);

    price = price + (this.listIngredients[0].price * ingredients.countAlface);
    price = price + (this.listIngredients[1].price * ingredients.countBacon);
    price += this.listIngredients[3].price * ingredients.countOvo;
    price = this.applyPromotionsOnPrice(ingredients);

    return price;
  }

  applyPromotionsOnPrice(ingredients) {
    let price = 0;
    if (ingredients.countCarne >= 3) {
      price += this.listIngredients[2].price * (ingredients.countCarne - (ingredients.countCarne / 3));
    } else {
      price += this.listIngredients[2].price * ingredients.countCarne;
    }

    if (ingredients.countQueijo >= 3) {
      price -= this.listIngredients[4].price * (ingredients.countQueijo - (ingredients.countQueijo / 3));
    } else {
      price += this.listIngredients[4].price * ingredients.countQueijo;
    }

    if (ingredients.countAlface > 0 && ingredients.countBacon === 0) {
      price -= price * 0.1;
    }

    return price;
  }

  createDescryptionOrder() {
    let descryption = '';
    for (let index = 0; index < this.listIngredientsAdded.length; index++) {
      const element = this.listIngredientsAdded[index];
      if (index === 0) {
        descryption += element.number + ' - ' + element.name;
      } else {
        descryption += ', ' + element.number + ' - ' + element.name;
      }
    }

    return descryption;
  }

  createOrder(descryptionOrigin, ingredientsOrigin, priceOrigin) {
    return {
      id : this.listOrdersCustomHamburguers.length,
      name : descryptionOrigin,
      type : 'Personalizado',
      descryption : descryptionOrigin,
      price : priceOrigin,
      ingredients : ingredientsOrigin
    };
  }

  createListOfHamburguers() {
    const listHamburguers = [
      { id : 1, name : 'X-Bacon', type: 'Padrão', descryption: 'Bacon, hambúrguer de carne e queijo', price : 6.50, number: 1 },
      { id : 2, name : 'X-Burger', type: 'Padrão', descryption: 'Hambúrguer de carne e queijo', price : 4.50, number: 1 },
      { id : 3, name : 'X-Egg', type: 'Padrão', descryption: 'Ovo, hambúrguer de carne e queijo', price : 5.30, number: 1 },
      { id : 4, name : 'X-Egg Bacon', type: 'Padrão', descryption: 'Ovo, bacon, hambúrguer de carne e queijo',
        price : 7.30, number: 1 }
    ];

    return listHamburguers;
  }

  createListIngredients() {
    const listIngredients = [
      { id : 1, name : 'Alface', price : 0.40, number: 1 },
      { id : 2, name : 'Bacon', price : 2.00, number: 1 },
      { id : 3, name : 'Hambúrguer de carne', price : 3.00, number: 1 },
      { id : 4, name : 'Ovo', price : 0.80, number: 1 },
      { id : 5, name : 'Queijo', price : 1.50, number: 1 }
    ];

    return listIngredients;
  }

  createListPromotions() {
    const listIngredients = [
      { id : 1, name : 'Light', descryption : 'Se o lanche tem alface e não tem bacon, ganha 10% de desconto' },
      { id : 2, name : 'Muita carne', descryption : 'A cada 3 porções de carne o cliente só paga 2.' +
        'Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...' },
      { id : 3, name : 'Muito queijo', descryption : 'A cada 3 porções de queijo o cliente só paga 2.' +
        'Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...' }
    ];

    return listIngredients;
  }

  removeSelectedHamburguer(item) {
    this.listOrdersHamburguers.splice(this.getIndexList(this.listOrdersHamburguers, item), 1);

    this.totalLanches = this.calculateValueOrder(this.listOrdersHamburguers);
    this.totalLanches += this.calculateValueOrder(this.listOrdersCustomHamburguers);
  }

  removeSelectedCustomHamburguer(item) {
    this.listOrdersCustomHamburguers.splice(this.getIndexList(this.listOrdersCustomHamburguers, item), 1);

    this.totalLanches = this.calculateValueOrder(this.listOrdersHamburguers);
    this.totalLanches += this.calculateValueOrder(this.listOrdersCustomHamburguers);
  }

  getIndexList(list, item) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === item.id) {
        return i;
      }
    }
  }

  calculateValueOrder(list) {
    let value = 0;
    list.forEach(element => {
      value += element.price;
    });

    return value;
  }

  getNumberIngredients(ingredients) {
    const ingredient = { countAlface : 0, countBacon : 0, countCarne : 0, countOvo : 0, countQueijo : 0 };

    ingredients.forEach(element => {
      if (element.id === 1) {
        ingredient.countAlface = element.number;
      } else if (element.id === 2) {
        ingredient.countBacon = element.number;
      } else if (element.id === 3) {
        ingredient.countCarne = element.number;
      } else if (element.id === 4) {
        ingredient.countOvo = element.number;
      } else if (element.id === 5) {
        ingredient.countQueijo = element.number;
      }
    });

    return ingredient;
  }
}
