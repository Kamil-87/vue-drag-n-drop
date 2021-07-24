<template>
  <div class="container">
    <h1 class="pt-1">Добавить новую задачу</h1>

    <form class="form mb-2" @submit.prevent="submitHandler">
      <div class="form-control">
        <input
          type="text"
          id="name"
          required
          v-model="name"
        >
        <span class="bar"></span>
        <label for="name">Название</label>
        <small>Поле обязательно</small>
      </div>

      <div class="form-control">
        <textarea
          name="description"
          id="description"
          required
          v-model="description"
        ></textarea>
        <span class="bar"></span>
        <label for="description">Описание</label>
      </div>

      <button
        class="btn primary"
        type="submit"
      >
        Добавить
      </button>
      <button
        class="btn"
        @click="cancelHandler"
      >
        Отмена
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    cancelHandler() {
      this.$router.push('/')
    },
    submitHandler() {
      const formData = {
        id: Date.now(),
        name: this.name,
        description: this.description,
        columnId: 1
      }

      let cardList = this.getStorage()
      cardList.push(formData)

      localStorage.setItem('cards', JSON.stringify(cardList))
      this.$router.push({name: 'Home' })
    },
    getStorage() {
      return JSON.parse(localStorage.getItem('cards'))
    },
  }
}
</script>
