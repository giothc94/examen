<template>
  <div class="users">
    <h1 class="text-center m-5">Mantenimiento de Usuarios</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="">Ci</label>
            <input class="form-control" type="text" v-model="user.ci" />
          </div>
          <div class="form-group">
            <label for="">Nombre</label>
            <input class="form-control" type="text" v-model="user.name" />
          </div>
          <div class="form-group">
            <label for="">Apellido</label>
            <input class="form-control" type="text" v-model="user.lastname" />
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input class="form-control" type="text" v-model="user.email" />
          </div>
          <div class="form-group">
            <label for="">Tipo</label>
            <input class="form-control" type="text" v-model="user.type" />
          </div>
          <div class="form-group">
            <label for="">Clave</label>
            <input class="form-control" type="text" v-model="user.clave" />
          </div>
          <button
            class="btn btn-success"
            v-on:click="create"
            v-if="!updateFlag"
          >
            Crear
          </button>
          <button class="btn btn-warning" v-on:click="update" v-if="updateFlag">
            Actualizar
          </button>
          <button class="btn btn-danger ml-3" v-on:click="cancel" v-if="updateFlag">
            Cancelar
          </button>
        </div>
        <div class="col-md-8">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user._id">
                  <th scope="row">{{ user._id }}</th>
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.tipo }}</td>
                  <td>
                    <button
                      class="btn btn-warning"
                      v-on:click="selectUser(user._id)"
                    >
                      Actualizar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      v-on:click="deleteUser(user._id)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service/users'
export default {
  name: 'Users',
  data () {
    return {
      service: null,
      users: [],
      updateFlag: false,
      user: {
        id: '',
        ci: '',
        name: '',
        lastname: '',
        email: '',
        type: '',
        clave: ''
      }
    }
  },
  methods: {
    async create () {
      Service()
        .create({
          ci: this.user.ci,
          firstName: this.user.name,
          lastName: this.user.lastname,
          email: this.user.email,
          tipo: this.user.type,
          clave: this.user.clave
        })
        .then(async data => {
          if (data.status === 200) {
            this.clearInput()
            await this.getData()
          }
          alert(JSON.stringify(data.data.message.message) || 'Creado')
        })
        .catch(err => alert(err))
    },
    async update () {
      Service()
        .upate(this.user.id, {
          ci: this.user.ci,
          firstName: this.user.name,
          lastName: this.user.lastname,
          email: this.user.email,
          tipo: this.user.type,
          clave: this.user.clave
        })
        .then(async data => {
          if (data.status === 200) {
            this.clearInput()
            await this.getData()
          }
          alert(JSON.stringify(data.data.message.message) || 'Actualizado')
        })
        .catch(err => alert(err))
    },
    selectUser (id) {
      const user = this.users.filter(user => user._id === id)[0]
      this.user.id = user._id
      this.user.ci = user.ci
      this.user.name = user.firstName
      this.user.lastname = user.lastName
      this.user.email = user.email
      this.user.type = user.tipo
      this.user.clave = user.clave
      this.updateFlag = true
    },
    async getData () {
      const { data } = await Service().getAll()
      this.users = data.data
      this.updateFlag = false
    },
    async deleteUser (id) {
      await Service().delete(id)
      alert('Eliminado')
      await this.getData()
    },
    clearInput () {
      this.user.id = ''
      this.user.ci = ''
      this.user.name = ''
      this.user.lastname = ''
      this.user.email = ''
      this.user.type = ''
      this.user.clave = ''
    },
    async cancel () {
      this.clearInput()
      await this.getData()
    }
  },
  async mounted () {
    await this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
