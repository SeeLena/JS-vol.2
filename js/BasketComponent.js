Vue.component("basket", {
    props: ["basketItems", "img", 'visibility'],
    template: 
    `   <div class="basket" v-show = "visibility">
            <p v-if="!basketItems.length" class="basket__empty">Cart is empty</p>
            <basket-item v-for="item of basketItems" :key="item.id_product" :img="img" :basket-item="item"></basket-item>
            <p class="basket__product_total"><span class="basket__product_total-left">Total:</span>{{ $root.baskettotal }} $</p>
        </div>
    `
});

Vue.component("basket-item", {
    props: [ "img", "basketItem"],
    template: 
    `  
        <div class="basket__item">
            <img :src="img" alt="Some image" class="basket__product_img">
            <div class="basket__product_bio">
                <div class="basket__product_desc">
                    <p class="basket__product_title">{{ basketItem.product_name }}</p>
                    <p class="basket__product_quantity">Количество: {{ basketItem.quantity }}</p>
                    <p class="basket__product_price">{{ basketItem.quantity * basketItem.price }} $</p>
                </div>
            </div>
            <div class="basket__right">
                <button class="del-btn"  @click="$parent.$emit('remove', basketItem)">&times;</button>
            </div>
        </div>
        
    `

});

/*<div class="header__btn-cart" @click="show = !show"><i class="fas fa-shopping-basket"></i></div>
            <div class="basket" v-show = "show">
                <p v-if="!basketItems.length" class="basket__empty">Cart is empty</p>
                <div class="basket__item" v-for="item of basketItems" :key="item.id_product">
                    <img :src="imgCatalog" alt="Some image" class="basket__product_img">
                    <div class="basket__product_bio">
                        <div class="basket__product_desc">
                            <p class="basket__product_title">{{ item.product_name }}</p>
                            <p class="basket__product_quantity">Количество: {{ item.quantity }}</p>
                            <p class="basket__product_price">{{ item.quantity * item.price }} $</p>
                        </div>
                    </div>
                    <div class="basket__right">
                        <button class="del-btn" @click="remove(item)">&times;</button>
                    </div>
                </div>
                <p class="basket__product_total"><span class="basket__product_total-left">Total:</span>{{ baskettotal }} $</p>
            </div>*/