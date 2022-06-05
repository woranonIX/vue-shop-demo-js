<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import shopdata from '../storedata.json'
</script>

<template>
  <nav class="navbar">
    <img src="../assets/logo.png" alt="" class="logo" />
    <span class="brand hide">Shop Demo</span>
    <div style="position:relative;">
        <input type="text" class="searchinput" placeholder="type to search">
        <button class="searchbutton">
            <span class="mdi mdi-magnify"></span>
        </button>
    </div>
    <button class="contact">
        <span class="mdi mdi-github"></span>
    </button>
  </nav>
  <div>
  <div class="shop row">
      
  
    <div v-for="i in shopdata" class="column item">
        <img :src="i.src" alt="" class="itemimage">
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
.searchinput{
    height: 36px;
    position: absolute;
    top: 7px;
    right: 15%;
    font-size: 36px;
    width: 50%;
    max-width: 400px;
    border-radius: 9px;
    text-align: center;
}
.searchbutton{
    position: absolute;
    right: 16%;
    top: 13px;
    height: 30px;
    font-size: 20px;
    vertical-align: middle;
    width: 50px;
    border-radius: 9px;
    background-color: orange;
}
.contact{
    position: absolute;
    top: 5px;
    right: 2%;
    font-size: 36px;
    background-color: transparent;
    border: 2px;
}


*{
    background-color: transparent;
}
.column {
  float: left;
  width: 19%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.item{
    height: 300px;
    margin: 5px;
}
.item img{
    max-width: 400px;
    max-height: 300px;
    height: 100%;
    width: 100%;
    object-fit:cover ;
    vertical-align: middle;
}

@media screen and (max-width: 800px) {
  .hide {
    visibility: hidden;
  }
  .searchinput{
      font-size: 15px;
  }
    .column {
    width: 47.5%;
    background-color: red;
  }
}
</style>
