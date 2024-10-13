// src/components/ratingsStore.js
import { reactive } from 'vue'

const state = reactive({
  ratings: []
})

export const useRatingsStore = () => {
  const addRating = (rating) => {
    state.ratings.push(rating)
  }

  const getAverageRating = () => {
    if (state.ratings.length === 0) return 0
    const sum = state.ratings.reduce((a, b) => a + b, 0)
    return (sum / state.ratings.length).toFixed(2) // Returns average rounded to 2 decimal places
  }

  const getTotalRatings = () => {
    return state.ratings.length
  }

  return {
    addRating,
    getAverageRating,
    getTotalRatings
  }
}
