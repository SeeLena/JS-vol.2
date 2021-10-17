const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        basketItems: [],
        filtered: [],
        imgCatalog: 'img/product-img.jpg',
        userSearch: '',
        show: false,
        error: false
    },
    computed: {
        baskettotal() {
            return this.basketItems.reduce((res, item) => res + item.price * item.quantity, 0)
          }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => error = true)
        },
        addBasket(item){
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let find = this.basketItems.find(el => el.id_product === item.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                        const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                        this.basketItems.push(prod)
                    }
                }
            })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        },
        
    },
    mounted(){
        this.getJson(`${API + this.basketUrl}`)
        .then(data => {
            for (let item of data.contents){
                this.$data.basketItems.push(item);
            }
        });
        this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
                for(let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                   this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    }
})


/*class List {
    constructor(url, container, list = list2){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }

    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData(data){
        this.goods = [...data];
        this.render();
    }

    render(){
        const block = document.querySelector(this.container);
            for (let product of this.goods){
                const productObj = new this.list[this.constructor.name](product);
                this.allProducts.push(productObj);
                block.insertAdjacentHTML('beforeend', productObj.render());
            }
    }
    _init(){
        return false
    }
}

class Item { 
    constructor(el, img = "img/product-img.jpg"){
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render(){//генерация товара для каталога товаров
        return `<a href="#" class="products__item data-id="${this.id_product}">
                <img class="products__img" src="${this.img}">
                <h3 class="products__heading">${this.product_name}</h3>
                <p class="products__price">${this.price}</p>
                <button class="products__buy-btn" data-id="${this.id_product}"
                data-name="${this.product_name}"
                data-price="${this.price}">Купить</button>
            </a>`
    }
}

class ProductList extends List{
    constructor(cart, container=".products", url = "/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('products__buy-btn')){
                console.log(e.target);
                this.cart.addBasket(e.target);
            }
        });
    }
}

class ProductItem extends Item{}

class Basket extends List{
    constructor(container = '.basket', url = "/getBasket.json"){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    addBasket(element){
        this.getJson(`${API}/addToBasket.json`)
        .then(data => {
            if(data.result === 1){
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find){
                    find.quantity++;
                    this._updateCart(find);
                } else {
                    let product = {
                        id_product: productId,
                        price: +element.dataset['price'],
                        product_name: element.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('Error');
            }
        })
    };
    removeBasket(element){
        this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
            if(data.result === 1){
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find.quantity > 1){
                    find.quantity--;
                    this._updateCart(find);
                } else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.basket__item[data-id="${productId}"]`).remove();
                }
            } else {
                alert('Error');
            }
        })
    };
    
    _updateCart(product){
        let block = document.querySelector(`.basket__item[data-id="${product.id_product}"]`);
        block.querySelector('.basket__product_quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.basket__product_price').textContent = `$${product.quantity*product.price}`;

    };

    _init(){
        document.querySelector('.header__btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
           if(e.target.classList.contains('del-btn')){
               this.removeBasket(e.target);
           }
        })
    }

}

class BasketItem extends Item{
    constructor(el, img = 'img/product-img.jpg'){
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="basket__item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some image" class="basket__product_img">
                <div class="basket__product_bio">
                <div class="basket__product_desc">
                <p class="basket__product_title">${this.product_name}</p>
                <p class="basket__product_quantity">Количество: ${this.quantity}</p>
                <p class="basket__product_price">$${this.quantity * this.price}</p>
                </div>
                </div>
                <div class="basket__right">
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
            </div>`
    }
}

const list2 = {
    ProductList: ProductItem,
    Basket: BasketItem
};


let cart = new Basket();
let products = new ProductList(cart);*/