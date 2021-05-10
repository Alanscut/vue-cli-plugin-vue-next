import { reactive } from 'vue';

const state = reactive({ count: 0 });

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`);
  }
};