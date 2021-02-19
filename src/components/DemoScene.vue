<template>
  <Scene>
    <iframe
      style="width: 100%"
      scrolling="no"
      title="Unsplash-powered weather App"
      src="https://vigilant-davinci-5e1ee8.netlify.app/"
      frameborder="no"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    >
    </iframe>
  </Scene>
</template>

<script>
import Scene from "./Scene";

export default {
  components: { Scene },
  data() {
    return {
      iframeMouseOver: false,
    };
  },
  methods: {
    getMouseOverCallback(over = true) {
      return () => {
        this.iframeMouseOver = over;
      };
    },
    handleBlur(e) {
      // Click into iframe
      if (this.iframeMouseOver) {
        this.$emit("interact", e);
      }
    },
  },
  mounted() {
    this.$el.addEventListener("mouseover", this.getMouseOverCallback(true));
    this.$el.addEventListener("mouseout", this.getMouseOverCallback(false));
    window.addEventListener("blur", this.handleBlur);
  },
  beforeDestroy() {
    this.$el.addEventListener("mouseover", this.getMouseOverCallback(true));
    this.$el.addEventListener("mouseout", this.getMouseOverCallback(false));
    window.removeEventListener("blur", this.handleBlur);
  },
};
</script>
