<script setup>
import { ref } from "vue";
const overlay = ref("");
defineProps({
  item_detail: Object,
});
</script>

<template>
  <div class="row" style="margin: 1rem 0 0 1rem ;">

    <div class="column" style="width:60%;max-width: 450px;">
      <img :src="item_detail.src" alt="" class="round showimage" />
      {{ overlay }}
      <div class="row">
        <div class="column" style="width: 20%;height: 100px" v-for="i in 5">
          <img
            :src="item_detail.src"
            alt=""
            class="mini"
            @click="overlay = i"
          />
        </div>
      </div>
    </div>
    <div class="column" style="width: 40%; text-align: start">
      <div style="margin-left: 1rem">
      <h1>{{ item_detail.name }}</h1>

      <span class="mdi mdi-star "></span>
      <span class="mdi mdi-star "></span>
      <span class="mdi mdi-star "></span>
      <span class="mdi mdi-star "></span>
      <span class="mdi mdi-star "></span>
    <h1 style="color:orange">${{ item_detail.price }}</h1>
    <span>quantity</span>
    <button></button>
    <button></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: table;
  clear: both;
  content:"";
}

.column {
  float: left;
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
  width: 7vw;
  object-fit: cover;
}
.column h1 {
  text-transform: capitalize;
}
</style>
