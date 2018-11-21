import App from 'app';
import { shallowMount, createLocalVue }  from '@vue/test-utils';
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('App', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      actions: {
        fetchSensors(context) {}
      },
      getters: {
        allSensors(){}
      },
    })
  })

  test('is a Vue instance', () => {
    const wrapper = shallowMount(App, { store, localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
