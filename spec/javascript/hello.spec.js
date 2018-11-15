import Hello from 'hello';
import { mount }  from '@vue/test-utils';

describe('Hello', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Hello)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
