import http from '../http-common'

class DealsService {
  getAll() {
    return http.get('/deals')
  }
}

export default new DealsService()
