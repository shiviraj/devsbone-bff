const ClientService = {
  clients: [],
  
  addClient(client) {
    this.clients.push(client)
  },
  
  removeClient(id) {
    this.clients = this.clients.filter((client) => client.id !== id)
  },
  
  getClient(id) {
    return this.clients.find((client) => client.dustbinId === id)
  }
}

module.exports = ClientService
