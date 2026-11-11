import { describe, test } from 'vitest'
import { useMovieStore } from './movieStore'

// Vitest 5 benchmarks: `bench` is provided through the test context.
const initialState = useMovieStore.getState()

const bigWatchlist = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i),
  title: `Movie ${i}`,
  createdAt: new Date(0).toISOString(),
}))

describe('movieStore performance', () => {
  test('watchlist operations', async ({ bench }) => {
    await bench.compare(
      bench('add 100 watchlist items', () => {
        useMovieStore.setState(initialState, true)
        const { addToWatchlist } = useMovieStore.getState()
        for (let i = 0; i < 100; i++) addToWatchlist(`Movie ${i}`)
      }),
      bench('remove an item from a 1000-item watchlist', () => {
        useMovieStore.setState({ ...initialState, watchlist: bigWatchlist }, true)
        useMovieStore.getState().removeFromWatchlist('500')
      }),
    )
  })

  test('pagination', async ({ bench }) => {
    await bench('paginate forward 100 pages', () => {
      useMovieStore.setState(initialState, true)
      const { setIncrementPage } = useMovieStore.getState()
      for (let i = 0; i < 100; i++) setIncrementPage()
    }).run()
  })
})
