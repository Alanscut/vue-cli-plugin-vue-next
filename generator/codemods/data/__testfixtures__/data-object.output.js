import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',

  components: {
    HelloWorld
  },

  data() {
    return {
      apiKey: 'a1b2c3',
      data: {
        length: 20,
        type: 'string'
      }
    };
  },

  methods: {
    data() {
      this.$axios.get('api/v1/data').then(({ data }) => {
        if (data.code === 200) {
          console.log('success!');
        } else {
          console.log('failed!');
        }
      });
    }
  }
};
