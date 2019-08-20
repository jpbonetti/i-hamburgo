import { Hamburguer } from './hamburguer.model';
import { CustomHamburguer } from './custom.hamburguer.model';

export class Order {
    id: number;
    hamburguers: Hamburguer[];
    customHamburguers: CustomHamburguer[];
}