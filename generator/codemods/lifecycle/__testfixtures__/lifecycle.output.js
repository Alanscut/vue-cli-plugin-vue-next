import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    beforeDestroy() {
      console.log('custom method with the same name as the lifecycle');
    },
    handleScroll() {}
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.timer = setInterval(beforeDestroy, 500);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  unmounted: function() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
