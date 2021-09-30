const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList{
    constructor(container=".products"){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts(){
      return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {console.log(error);});
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
    constructor(product, img = "img/product-img.jpg"){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
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

class Basket {
    constructor(container = '.basket'){
        this.container = container;
        this.goods = [];
        this._clickBasket();
        this._getBasket()
            .then(data => {
                this.goods = [...data.contents];
                this.render()          
        });
    }

    _getBasket(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
        })
    }

    addBasket(){

    };
    removeBasket(){

    };
    changeBasket(){

    };
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ElemBasket();
            block.insertAdjacentHTML("beforeend", productObj.render(product));
        }
    };

    _clickBasket(){
        document.querySelector(".header__btn-cart").addEventListener("click", () => {
            document.querySelector(".basket").classList.toggle("invisible");
        })
    }
}

class ElemBasket {
    render(product, img = "img/product-img.jpg") {
        return `<div class="basket__item" data-id="${product.id_product}">
                <img src="${img}" alt="Some image" class="basket__product_img">
                <div class="basket__product_bio">
                <div class="basket__product_desc">
                <p class="basket__product_title">${product.product_name}</p>
                <p class="basket__product_quantity">Количество: ${product.quantity}</p>
                <p class="basket__product_price">$${product.quantity * product.price}</p>
                </div>
                </div>
                <div class="basket__right">
                    <button class="del-btn" data-id="${product.id_product}">&times;</button>
                </div>
            </div>`
    }
}

let bask = new Basket();