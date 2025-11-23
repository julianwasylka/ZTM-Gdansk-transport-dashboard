import { describe, it, expect } from 'vitest'
import { useStops } from '../composables/useStops'

describe('useStops Composable', () => {
  it('ma poprawny stan początkowy', () => {
    const { stops, dashboardData, loading } = useStops()

    expect(stops.value).toEqual([])
    expect(dashboardData.value).toEqual([])
    expect(loading.value).toBe(false)
  })
})