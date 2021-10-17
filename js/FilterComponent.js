Vue.component("searchnav", {
    template: 
    `   <form action="#" class="search__form" @input.prevent="$root.filter">
            <input type="text" class="search__field" v-model="$root.userSearch" >
            <button class="search__btn" type="">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});
