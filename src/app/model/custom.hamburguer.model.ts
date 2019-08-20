import { Ingredients } from './ingredients.model';

export class CustomHamburguer {
    id: number;
    name: string;
    descryption: string;
    price: number;
    number: number;
    ingredients: Ingredients[];
}