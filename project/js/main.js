class ProductList{
    constructor(container=".products"){
        this.container = container;
        this.goods = [];
        this.fetchProducts();
        this.render();
    }

    fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, img:'img/product-img.jpg'},
            {id: 2, title: 'Mouse', price: 20, img:'img/product-img.jpg'},
            {id: 3, title: 'Keyboard', price: 200, img:'img/product-img.jpg'},
            {id: 4, title: 'Gamepad', price: 50, img:'img/product-img.jpg'},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }
    
    getSum() {
        let sum = 0;
        this.goods.forEach(item=>{
            sum += item.price
        });
        console.log(sum);
    }
}

class ProductItem {
    constructor(product){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }
    render(){
        return `<a href="#" class="products__item">
                <img class="products__img" src="${this.img}">
                <h3 class="products__heading">${this.title}</h3>
                <p class="products__price">${this.price}</p>
                <button class="products__buy-btn">Купить</button>
            </a>`
    }
}

let list = new ProductList();
list.getSum();

class Basket {
    addBasket(){

    };
    removeBasket(){

    };
    changeBasket(){

    };
    render(){

    };
}

class ElemBasket {
    render(){

    };
}