export default {
  addWord (newWord) {
    // TODO: use async await syntax?
    return fetch('api/word', {
      method: 'put',
      body: newWord
    }).then(response => {
      if (response.status !== 200) {
        const errorMessage = response.errorMessage || 'Unknown Error.'
        return Promise.reject(errorMessage)
      }

      return Promise.resolve(response.data)
    })
  },
  updateWord (updatedWord) {
    // TODO: use async await syntax?
    return fetch('api/word', {
      method: 'post',
      body: updatedWord
    }).then(response => {
      if (response.status !== 200) {
        const errorMessage = response.errorMessage || 'Unknown Error.'
        return Promise.reject(errorMessage)
      }

      return Promise.resolve()
    })
  },
  updateWords (words) {
    return fetch('api/words', {
      method: 'post',
      body: words
    }).then(response => {
      if (response.status !== 200) {
        const errorMessage = response.errorMessage || 'Unknown Error.'
        return Promise.reject(errorMessage)
      }

      return Promise.resolve()
    })
  }
}
