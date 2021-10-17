Vue.component("products", {
    props: ["products", "img"],
    template: 
    `   <div class="products">
            <product v-for="item of products" :key="item.id_product"
            :img="img" :product="item">
            </product>
        </div>
    `
});

Vue.component("product", {
    props: ["product", "img"],
    template: 
    `   <a href="#" class="products__item">
            <img class="products__img" :src="img" alt="Some img">
            <h3 class="products__heading">{{ product.product_name }}</h3>
            <p class="products__price">{{ product.price }} $</p>
            <button class="products__buy-btn" @click="$parent.$emit('add-basket', product)">Купить</button>
        </a>
    `
});

