<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import shopdata from "../storedata.json";

let showdetail = ref(false);
let put = ref([]);
let cart = reactive([]);
let showcart = ref(false);

const cartsum = computed({
  get: () => {
    let checked = cart.filter((item) => item.checked == true);
    let sumcart = checked.reduce(
      (sum, item) => item.count * item.price + sum,
      0
    );
    //console.log(x);
    return sumcart;
  },
});

function addtocart(input) {
  let dupcheck = cart.filter((item) => item.id == input.id);
  if (dupcheck == "") {
    cart.push({ ...input, checked: true });
  } else {
    dupcheck[0].count += input.count;
  }
}
</script>

<template>
  <!-- item detail -->
  <div class="itemdetailoverlay" v-if="showdetail">
    <div class="itemdetail">
      <button class="overlay" @click="showdetail = !showdetail">X</button>
      <div class="row" style="margin: 1rem 0 0 1rem">
        <div class="columndetail" style="width: 60%; max-width: 450px">
          <img :src="put.src" alt="" class="round showimage" />
          <div class="row">
            <div
              class="columndetail"
              style="width: 20%; height: 100px"
              v-for="i in 5"
            >
              <img :src="put.src" alt="" class="mini" @click="overlay = i" />
            </div>
          </div>
        </div>
        <div class="columndetail" style="width: 40%; text-align: start">
          <div style="margin-left: 1rem">
            <h1>{{ put.name }}</h1>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <h1 style="color: orange">${{ put.price }}</h1>
            <span>quantity</span>
            <div>
              <button
                class="itemcountbutton"
                @click="put.count--"
                :disabled="put.count < 1"
              >
                -
              </button>
              <input
                type="number"
                name=""
                id=""
                class="itemcount round"
                v-model="put.count"
              />
              <button class="itemcountbutton" @click="put.count++">+</button>
            </div>
            <div class="addtocartbutton">
              <button
                @click="
                  addtocart(put);
                  put.count = 0;
                "
                :disabled="put.count == 0"
              >
                Add to cart <span class="mdi mdi-cart"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Nav section-->
  <nav class="navbar">
    <img src="../assets/logo.png" alt="" class="logo" />
    <span class="brand hide">Shop Demo</span>
    <div style="position: relative">
      <input type="text" class="searchinput" placeholder="type to search" />
      <button class="searchbutton">
        <span class="mdi mdi-magnify"></span>
      </button>
    </div>

    <div class="contact">
      <button
        style="border: none; position: relative"
        @click="
          showcart = !showcart;
          showdetail = false;
        "
      >
        <span
          class="mdi mdi-cart mdi-36px"
          style="color: orange"
          v-if="showcart"
        ></span>
        <span class="mdi mdi-cart mdi-36px" v-else></span>
        <span class="cartcount" v-if="cart.length > 0">{{ cart.length }}</span>
      </button>
      <button style="border: none">
        <span class="mdi mdi-github mdi-36px"></span>
      </button>
    </div>
  </nav>
  <!-- Shop Section -->
  <div v-if="!showcart">
    <div class="shop row">
      <div v-for="(i, index) in shopdata" class="column">
        <img :src="i.src" alt="" class="itemimage" />
        <div class="item">
          <p class="itemname">{{ i.name }}</p>
          <div class="itembuttom">
            <span class="itemprice">${{ i.price }}</span>
            <button
              class="itembutton"
              @click="(showdetail = !showdetail), (put = shopdata[index])"
            >
              see more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cart section -->
  <div v-if="showcart" class="cartpanel">
    CART
    <div
      class="row cartitem"
      v-for="i in cart"
      :class="{ highlight: i.checked }"
    >
      <div class="columndetail" style="width: 5%">
        <input
          type="checkbox"
          name=""
          id=""
          v-model="i.checked"
          class="cartcheckbox"
        />
        <div
          class="mdi mdi-trash-can mdi-24px"
          style="text-align: center; margin-top: 25vh; color: red;"
        ></div>
      </div>
      <div class="columndetail" style="width: 45%">
        <img :src="i.src" class="cartimage round" />
      </div>
      <div class="columndetail" style="width: 50%">
        <h2 class="cartname">
          {{ i.name }}
        </h2>
        <h2 class="cartname">${{ i.price }}</h2>
        <div style="text-align: start; margin-left: 4vw">
          <button
            class="itemcountbutton"
            style="
              font-size: 1.5rem;
              width: 30px;
              box-shadow: 1px 1px 4px 1px inset;
            "
            @click="i.count--"
            :disabled="i.count < 1"
          >
            -
          </button>
          <input
            type="number"
            class="itemcount round"
            style="width: 50px; font-size: 1.5rem"
            v-model="i.count"
          />
          <button
            class="itemcountbutton"
            style="
              font-size: 1.5rem;
              width: 30px;
              box-shadow: 1px 1px 4px 1px inset;
            "
            @click="i.count++"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <h2 v-if="cart.length > 0" style="text-align: end">
      subtotal
      <span> ${{ cartsum }} </span>
    </h2>
    <span v-else>cart it's empty add some wonderful product to cart</span>
  </div>
</template>

<style scoped>
.brand {
  position: fixed;
  top: 6px;
  left: 10%;
  font-size: 36px;
}
nav {
  top: -20%;
  left: 0;
  width: 100%;
  vertical-align: middle;
}
.logo {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 6px;
  left: 4%;
}
.navbar {
  height: 60px;
  background-color: grey;
  width: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1;
}
.searchinput {
  height: 36px;
  position: absolute;
  top: 7px;
  right: 25%;
  font-size: 30px;
  width: 50%;
  max-width: 300px;
  border-radius: 4px;
  text-align: start;
  border: none;
  background-color: orange;
}
.searchbutton {
  position: absolute;
  right: 26%;
  top: 11px;
  height: 30px;
  font-size: 20px;
  vertical-align: middle;
  width: 50px;
  border-radius: 3px;
  border: none;
  background-color: rgb(248, 172, 109);
}
.contact {
  position: absolute;
  top: 5px;
  right: 2%;
  font-size: 36px;
  background-color: transparent;
  border: 2px;
}

* {
  background-color: transparent;
}
.column {
  float: left;
  margin: 0.1rem;
  width: 24%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.itemimage {
  max-width: 900px;
  height: 300px;
  width: 100%;
  object-fit: cover;
  vertical-align: middle;
  margin-top: 8px;
}
.item {
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
}
.item p {
  text-align: start;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.itemname {
  font-size: 1.25rem;
}
.itemprice {
  color: orange;
  font-size: 1.5rem;
  text-align: start;
}
.itembutton {
  margin-left: auto;
  margin-right: 5px;
  text-align: center;
  width: 80px;
  border: solid 1px;
  height: 2rem;
  border-color: orange;
  border-radius: 4px;
  cursor: pointer;
}
.itembuttom {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 100%;
  vertical-align: middle;
  padding-bottom: 4px;
}
.itemdetail {
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: grey;
  border-radius: 4px 0 0 0;
  max-width: 600px;
}
.itemdetailoverlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #20202080;
}
button.overlay {
  position: absolute;
  top: -2%;
  right: 0;
  color: black;
  border-radius: 2rem;
  font-size: 1.5rem;
  background-color: gray;
  box-shadow: 0 1px 5px 0;
  border: none;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .hide {
    visibility: hidden;
  }
  .searchinput {
    font-size: 15px;
  }
  .column {
    width: 49%;
  }
}
.column img {
}
.showimage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

img.mini {
  height: 100%;
  max-height: 64px;
  width: 100%;
  max-width: 7vw;
  object-fit: cover;
}
.columndetail h1 {
  text-transform: capitalize;
}
.columndetail {
  float: left;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.itemcount {
  width: 60px;
  height: 40px;
  font-size: 36px;
  text-align: center;
  border: none;
  box-shadow: 0 1px 4px 0 inset;
}
.itemcountbutton {
  height: 60px;
  border: none;
  font-size: 48px;
  margin: 0 2% 0 2%;
  cursor: pointer;
  color: #363636;
}
.cartpanel {
  width: 90%;
  margin: 10vh auto 0 auto;
  max-width: 800px;
}
.cartcount {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: red;
  right: 8%;
  top: 0%;
  color: white;
  border-radius: 1rem;
}
.cartimage {
  width: 100%;
  height: 200px;
  max-width: 200px;
  display: flex;
  flex-wrap: wrap;
  object-fit: cover;
  object-position: center;
  margin: 0.5rem;
}
.cartname {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  margin-left: 3vw;
  text-transform: capitalize;
}
.cartitem {
  margin-top: 0.5rem;
}
.highlight {
  background-color: #ffc8b7;
}
.cartcheckbox {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background-color: orange;
}
</style>
