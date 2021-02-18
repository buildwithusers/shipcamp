<template>
  <Scene class="scene">
    <img src="https://pbs.twimg.com/profile_images/1336428996398092290/iJrXAF2j_400x400.jpg" alt="Creator">
    <main>
      <h1>Thanks for watching! 🥳</h1>
      <p v-if="!submitted">Want to get notified about my next tutorial video?</p>
      <h2 v-if="submitted">I'll keep you posted 👍!</h2>
      <form v-else v-on:submit.prevent>
        <input @keyup.enter="trySubmit" :class="{ invalid: !isValid}" type="email" placeholder="Your email" v-model="email">
        <a @click="trySubmit" class="btn">Submit</a>
      </form>
    </main>
  </Scene>
</template>

<script>
import Scene from './Scene';
import { ChevronDownIcon } from 'vue-feather-icons';
import axios from 'axios';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  components: { Scene, ChevronDownIcon },
  data() {
    return {
      email: '',
      submitted: false,
    };
  },
  computed: {
    isValid() {
      return emailRegex.test(this.email);
    }
  },
  methods: {
    async trySubmit() {
      if (this.isValid) {
        this.submitted = true;
      } 
    }
  },
};
</script>
<style scoped>
  .scene { 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 175px;
    height: 175px;
    border-radius: 50%;
    margin-right: 2em;
  }
  main {
    color: white;
    text-align: left !important;
  }
  main > form {
    display: flex;
  }
  main > h1 {
    color: white;
  }
  main > h2 {
    color: white;
    font-weight: 500;
  }
  form {
    margin: 1em 0;
    display: flex;
    align-items: center;
  }
  form > a.btn {
    background: #2D6AE1;
    border: 1px solid #2D6AE1;
    border-radius: 3px;
    padding: 0.5em 1em;
    margin-left: 1em;
    font-weight: 500;
  }
  form a:hover {
    background: #3d70d8;
  }
  form > input {
    border: none;
    border-radius: 3px;
    padding: 0.5em;
    color: #140C1C;
    border: none; 
    border-width: 0; 
    box-shadow: none;
    outline: 0;
  }
  form > input.invalid {
    border: 1px solid #DD2E44;;
  }
</style>
