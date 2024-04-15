import {v4 as uuidv4} from 'uuid';

class Item {
    private readonly _id: string;
    private _name: string;
    private _price: number;
    private _description: string;
    

    constructor(name: string, price: number, description: string) {
        this._id = uuidv4()
        this._name = name
        this._price = price
        this._description = description
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
}

class User {
    private _name : string
    private _age: number
    private _cart: Item[]

    constructor(name: string, age: number, cart:Item[]=[]){
        this._name = name,
        this._age = age,
        this._cart = cart
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get cart(): Item[] {
        return this._cart;
    }


    set name(name: string) {
        this._name = name;
    }

    set age(age: number) {
        this._age = age;
    }

    set cart(cart: Item[]) {
        this._cart = cart;
    }

    addToCart(item: Item): void {
        this.cart.push(item);
    }

    removeFromCart(item: Item): void {
        if (this.cart.includes(item)) {
            this.cart = this.cart.filter((cartItem) => cartItem !== item);
        } else {
            console.log(`Item ${item.name} not in the cart!`);
        }
    }
    removeQuantityfromcart(user:User,item:Item,quantity:number):void{
        for (let i=0; i < quantity; i++){
            let itemIndex = user.cart.findIndex( cartItem => cartItem.id == item.id)
            user.cart.splice(itemIndex,1)
        }
        console.log(`${quantity} ${item.name} have been removed your cart `)
    }
    carTotal(user:User):void{
        let total = 0
        for (let item of user.cart){
            total += item.price
        }
        console.log(`Here is the total price of your cart ${total}$`)
    }
    printCart(user:User):void{
        for(let item of user.cart){
            console.log(item.name)
        }
    }

    static loginInUser():User | null | undefined{
        let inputName:string|null|undefined = (<HTMLInputElement>document.getElementById('name-input')).value;
        let inputAge:number|null|undefined = (<HTMLInputElement>document.getElementById('age-input')).value as unknown as number;
        if (inputName && inputAge) {
            return new User(inputName, inputAge);
        } else {
            return undefined;
        }
    }
    private cartHTMLElement(item:Item):HTMLDivElement {
        const mainCartdiv = document.createElement('div');
        const itemName = document.createElement('h3');
        const itemprice = document.createElement('p');
        const removeOne = document.createElement('button');
        const removeAll = document.createElement('button');
        itemName.innerHTML = item.name
        itemprice.innerHTML = `$${item.price}`
        removeOne.innerHTML = 'Remove one'
        removeAll.innerHTML = 'Remove all'
        removeOne.addEventListener('click', () => this.removeFromCart(item));
        removeAll.addEventListener('click', () => this.removeQuantityfromcart(this,item,1));
        mainCartdiv.append(itemName,itemprice,removeOne,removeAll)
        return mainCartdiv;
    }
}

class Shop {
    private _name:string
    private _items: Item[]

    constructor(name:string){
        this._name = name
        this._items = [
            new Item('Xbox',500,'Xbox one with two controllers'),
            new Item('Iphone',1000,'Iphone X'),
            new Item('Macbook pro',3000,'Macbook pro 14 with m3 chip'),
            new Item('Monitor',200,'Asus monitor')
        ]
    }
    public set items(value: Item[]) {
        this._items = value;
    }

    public get items(): Item[] {
        return this._items;
    }
    showItems()
}