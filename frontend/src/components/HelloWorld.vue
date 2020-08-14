<template>
  <div class="hello">
    <h1>Mantenimiento de Usuarios</h1>
    <div class="container">
      <div class="users">
        <ol v-for="user in users" :key="user._id">
          <li class="user">
            <p>{{ user._id }}</p>
            <p>{{ user.firstName }}</p>
            <p>{{ user.lastName }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.tipo }}</p>
            <p><button v-on:click="selectUser(user._id)">Actualizar</button></p>
            <p><button v-on:click="deleteUser(user._id)">Eliminar</button></p>
          </li>
        </ol>
      </div>
      <div class="list-users">
        <p><label for="">Ci</label><input type="text" v-model="user.ci" /></p>
        <p>
          <label for="">Nombre</label><input type="text" v-model="user.name" />
        </p>
        <p>
          <label for="">Apellido</label
          ><input type="text" v-model="user.lastname" />
        </p>
        <p>
          <label for="">Email</label><input type="text" v-model="user.email" />
        </p>
        <p>
          <label for="">Tipo</label><input type="text" v-model="user.type" />
        </p>
        <p>
          <label for="">Clave</label><input type="text" v-model="user.clave" />
        </p>
        <button v-on:click="create" v-if="!updateFlag">Crear</button>
        <button v-on:click="update" v-if="updateFlag">Actualizar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service/users'
export default {
  name: 'HelloWorld',
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
  props: {
    msg: String
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
          }
          alert(JSON.stringify(data.data.message.message) || 'Creado')
        })
        .catch(err => alert(err))
        .then(async () => {
          await this.getData()
        })
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
        .then(data => {
          if (data.status === 200) {
            this.clearInput()
          }
          alert(JSON.stringify(data.data.message.message) || 'Actualizado')
        })
        .catch(err => alert(err))
        .then(async () => {
          await this.getData()
        })

      await this.getData()
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
      console.log(this.user)
    },
    async getData () {
      console.log('data')
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
    }
  },
  async mounted () {
    await this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user {
  border: solid 1px black;
}
.container {
  display: flex;
  justify-content: space-between;
}
</style>
