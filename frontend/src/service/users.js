'use strict'

const axios = require('axios')

const URL = 'http://172.28.1.2:3000/api/users/list'
const URL_CREATE = 'http://172.28.1.2:3000/api/users/create'
const URL_UPDATE = 'http://172.28.1.2:3000/api/users/update/?'
const URL_DELETE = 'http://172.28.1.2:3000/api/users/delete/?'

function replaceInURL (url, array) {
  let count = 0
  return url
    .split('?')
    .map((e) => {
      if (e !== '' && count < array.length) {
        e += array[count]
        count++
        return e
      } else return e
    })
    .toString()
    .replace(/,/g, '')
}
function UsersService () {
  return {
    getAll: async () => {
      return await axios.get(URL)
    },
    create: async data => {
      return await axios.post(URL_CREATE, data)
    },
    upate: async (id, data) => {
      return await axios.put(replaceInURL(URL_UPDATE, [id]), data)
    },
    delete: async (id) => {
      return await axios.delete(replaceInURL(URL_DELETE, [id]))
    }
  }
}

export default UsersService
