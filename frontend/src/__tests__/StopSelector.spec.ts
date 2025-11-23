import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StopSelector from '../components/StopSelector.vue'

describe('StopSelector', () => {
  it('emituje zdarzenie add po kliknięciu przycisku', async () => {
    const wrapper = mount(StopSelector, {
      props: {
        stops: [{ stopId: 1, stopName: 'Test Stop' }]
      }
    })

    await wrapper.find('select').setValue(1)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('add')
    expect(wrapper.emitted().add[0]).toEqual([1])
  })
})