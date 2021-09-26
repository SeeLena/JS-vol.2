class Elem{
    constructor(element){
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger{
    constructor(size, fill, topping){
        this.size = new Elem(this._select(size));
        this.fill = new Elem(this._select(fill));
        this.topping = this._getTopping(topping);
    }

    _getTopping(name){
        let result = [];
        this._selectAll(name).forEach(el => result.push(new Elem(el)))
        return result;
    }

    _select(name){
        return document.querySelector(`input[name=${name}]:checked`);
    }

    _selectAll(name){
       return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }

    _sumPrice(){
        let result = this.size.price + this.fill.price;
        this.topping.forEach(el => result + el.price);
        return result;
    }

    _sumCalories(){
        let result = this.size.calories + this.fill.calories;
        this.topping.forEach(el => result + el.calories);
        return result;
    }

    showSum(price, calories){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}