Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <!-- v-bind enlaza un atributo a una expresión en el archivo Javascript -->
        <img v-bind:src="image">
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- Condicional según el valor encontrado en la expresión pasada desde Javascript -->
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>
        <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
        <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">Add to Cart</button>
        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
    </div>
</div>
`,
data () {
    return {
        brand: 'Vue Mastery',
        product: 'Socks',
        onSale: true,
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.png',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.png',
                variantQuantity: 0
            }
        ],
        cart: 0
    }
},
methods: {
    addToCart() {
        this.cart += 1
    },
    updateProduct(index) {
        this.selectedVariant = index
        console.log(index)
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
        return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
        if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale!'
        }
        return this.brand + ' ' + this.product + ' are not on sale!'
    },
    shipping() {
        if (this.premium) {
            return "Free"
        }
        return "2.99"
    }
}
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false
    }    
})