import { Component } from '@angular/core';
import { RestService } from './rest.service';
import { Hamburguer } from './model/hamburguer.model';
import { Ingredients } from './model/ingredients.model';
import { Promotion } from './model/promotion.model';
import { Order } from './model/order.model';

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
  buttonSaveName = 'Efetuar Pedido';

  listOrdersHamburguers = [];
  listOrdersCustomHamburguers = [];

  listHamburguersAdded = [];
  listIngredientsAdded = [];
  listDefaultNumberLists = [0, 1, 2, 3, 4, 5];
  listHamburguers = [];
  listIngredients = [];
  listPromotions = [];

  disabledButtonSaveOrder = true;
  disabledPainelNewOrder = true;
  showProgressBar = true;
  servicesCalled = 0;
  numberOfServices = 3;

  constructor(public rest: RestService) {
  }

  ngOnInit() {
    this.getHamburguers();
    this.getIngredients();
    this.getPromotions();
  }

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

    this.disableSaveOrderButton();
  }

  addCustomHamburguer() {
    const price = this.createPriceOrder();
    const order = this.createOrder(this.createDescryptionOrder(), this.listIngredientsAdded, price);
    if (this.listIngredientsAdded.length > 0) {
      this.listOrdersCustomHamburguers.push(order);
      this.totalLanches += order.price;
    }

    this.disableSaveOrderButton();
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
      descryption : descryptionOrigin,
      price : priceOrigin,
      ingredients : ingredientsOrigin
    };
  }

  removeSelectedHamburguer(item) {
    this.listOrdersHamburguers.splice(this.getIndexList(this.listOrdersHamburguers, item), 1);

    this.totalLanches = this.calculateValueOrder(this.listOrdersHamburguers);
    this.totalLanches += this.calculateValueOrder(this.listOrdersCustomHamburguers);

    this.disableSaveOrderButton();
  }

  removeSelectedCustomHamburguer(item) {
    this.listOrdersCustomHamburguers.splice(this.getIndexList(this.listOrdersCustomHamburguers, item), 1);

    this.totalLanches = this.calculateValueOrder(this.listOrdersHamburguers);
    this.totalLanches += this.calculateValueOrder(this.listOrdersCustomHamburguers);

    this.disableSaveOrderButton();
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

  getHamburguers() { 
    this.rest.getHamburguers().subscribe((data: Hamburguer[]) => {
      this.listHamburguers = data;

      this.servicesCalled ++;
      this.checkServicesCalled();
    });
  }

  getIngredients() { 
    this.rest.getIngredients().subscribe((data: Ingredients[]) => {
      this.listIngredients = data;

      this.servicesCalled ++;
      this.checkServicesCalled();
    });
  }

  getPromotions() { 
    this.rest.getPromotions().subscribe((data: Promotion[]) => {
      this.listPromotions = data;

      this.servicesCalled ++;
      this.checkServicesCalled();
    });
  }

  saveOrder() { 
    let order = new Order();
    order.id = 0;
    order.hamburguers = this.listOrdersHamburguers;
    order.customHamburguers = this.listOrdersCustomHamburguers;
    
    this.rest.saveOrder(order).subscribe((result) => {
      window.alert(result);
    });
  }

  disableSaveOrderButton() {
    this.disabledButtonSaveOrder = true;
    if (this.listOrdersHamburguers.length > 0 || this.listOrdersCustomHamburguers.length > 0) {
      this.disabledButtonSaveOrder = false;
    }
  }

  checkServicesCalled() {
    if(this.servicesCalled == this.numberOfServices) {
      this.showProgressBar = false;
    }
  }
}
