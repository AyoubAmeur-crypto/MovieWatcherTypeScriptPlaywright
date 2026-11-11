import { beforeEach, describe, expect, it } from 'vitest'
import { useMovieStore } from './movieStore'

const initialState = useMovieStore.getState()

describe('movieStore', () => {
  beforeEach(() => {
    useMovieStore.setState(initialState, true)
  })

  it('starts on page 1 with an empty query and watchlist', () => {
    const { page, querry, watchlist } = useMovieStore.getState()
    expect(page).toBe(1)
    expect(querry).toBe('')
    expect(watchlist).toEqual([])
  })

  it('increments and decrements the page', () => {
    const store = useMovieStore.getState()
    store.setIncrementPage()
    store.setIncrementPage()
    expect(useMovieStore.getState().page).toBe(3)
    store.setDecremnetPage()
    expect(useMovieStore.getState().page).toBe(2)
  })

  it('never decrements below page 1', () => {
    useMovieStore.getState().setDecremnetPage()
    expect(useMovieStore.getState().page).toBe(1)
  })

  it('resets the page to 1 when the query changes', () => {
    useMovieStore.getState().setPage(5)
    useMovieStore.getState().setQuerry('batman')
    expect(useMovieStore.getState()).toMatchObject({ querry: 'batman', page: 1 })
  })

  it('adds and removes watchlist items', () => {
    useMovieStore.getState().addToWatchlist('Inception')
    const [item] = useMovieStore.getState().watchlist
    expect(item.title).toBe('Inception')
    expect(item.id).toBeTruthy()
    expect(() => new Date(item.createdAt).toISOString()).not.toThrow()

    useMovieStore.getState().removeFromWatchlist(item.id)
    expect(useMovieStore.getState().watchlist).toEqual([])
  })

  it('updates login state', () => {
    useMovieStore.getState().setLogin(true)
    expect(useMovieStore.getState().isLogin).toBe(true)
  })
})

