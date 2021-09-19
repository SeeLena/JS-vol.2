const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

function arg () {};
arg.apply(this, products);

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (arg) => {
    return `<a href="#" class="products__item">
                <img class="products__img" src="img/product-img.jpg" alt="product image">
                <h3 class="products__heading">${arg.title}</h3>
                <p class="products__price">${arg.price}</p>
                <button class="products__buy-btn">Купить</button>
            </a>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);