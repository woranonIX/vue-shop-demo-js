<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import shopdata from "../storedata.json";

let showdetail = ref(false);
let put = ref([]);
let cart = reactive([]);

const cartfilter = computed({
  get: () => {
    let x = shopdata.filter((item) => item.count > 0);
    return x;
  },
});
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
                  cart.push(put);
                  put.count = 0;
                  alert(cart);
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
      <button style="border: none; position: relative">
        <span class="mdi mdi-cart mdi-36px"></span>
        <span
          style="
            position: absolute;
            width: 2vw;
            height: 2vh;
            background-color: red;
            right: 8%;
            color: white;
            border-radius: 1rem;
          "
          >{{ cartfilter.lenght }}</span
        >
      </button>
      <button style="border: none">
        <span class="mdi mdi-github mdi-36px"></span>
      </button>
    </div>
  </nav>
  <!-- Shop Section -->
  <div>
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
  left: 5%;
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
  right: 15%;
  font-size: 30px;
  width: 50%;
  max-width: 400px;
  border-radius: 9px;
  text-align: start;
  border: none;
  background-color: orange;
}
.searchbutton {
  position: absolute;
  right: 16%;
  top: 13px;
  height: 30px;
  font-size: 20px;
  vertical-align: middle;
  width: 50px;
  border-radius: 3px;
  border: none;
  background-color: orange;
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
.column h1 {
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
</style>
