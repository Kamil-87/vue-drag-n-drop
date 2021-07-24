<template>
  <div class="container">
    <h1 class="pt-1">Добавить новую задачу</h1>

    <form class="form mb-2" @submit.prevent="submitHandler" novalidate>
      <div :class="[{invalid: isNameValid}, 'form-control']">
        <input
          type="text"
          id="name"
          required
          v-model="name"
          @input="errorName.validated =true"
        >
        <span class="bar"></span>
        <label for="name" v-text="'Название*'"></label>
        <small v-if="isNameValid">{{ isNameValid }}</small>
      </div>

      <div :class="[{invalid: isDescriptionValid}, 'form-control']">
        <textarea
          name="description"
          id="description"
          required
          v-model="description"
          @input="errorDescription.validated =true"
        ></textarea>
        <span class="bar"></span>
        <label for="description" v-text="'Описание*'"></label>
        <small v-if="isDescriptionValid">{{ isDescriptionValid }}</small>
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
const nameCheckRegexAlpha = /^[a-zа-яё\s]+$/iu

export default {
  data() {
    return {
      name: '',
      description: '',
      isNameTouched: false,
      errors: {
        name: '',
        description: '',
      },

      errorName: {
        minLength: 3,
        required: true,
        validated: null,
        formSubmitted: null,
      },
      errorDescription: {
        maxLength: 248,
        required: true,
        validated: null,
        formSubmitted: null,
      },
    }
  },
  computed: {
    isNameValid() {
      if (!this.errorName.validated) {
        return ''
      }

      if (this.errorName.required && !this.name) {
        return `Это поле является обязательным`
      }

      if (!nameCheckRegexAlpha.test(this.name) && this.name) {
        return `Это поле должно содержать только буквы`
      }

      if (this.errorName.minLength && this.name.length < this.errorName.minLength) {
        return `Это поле должно содержать больше ${this.errorName.minLength} символов`
      }

      return ''
    },
    isDescriptionValid() {
      if (!this.errorDescription.validated) {
        return ''
      }
      if (this.errorDescription.required && !this.description) {
        return `Это поле является обязательным`
      }

      if (this.errorDescription.maxLength && this.description.length > this.errorDescription.maxLength) {
        return `Это поле должно содержать меньше ${this.errorDescription.maxLength} символов`
      }

      return ''
    },

  },
  methods: {
    cancelHandler() {
      this.$router.push('/')
    },

    submitHandler() {
      this.validateForm()

      if(this.isNameValid || this.isDescriptionValid) {
        return
      }

      const formData = {
        id: Date.now(),
        name: this.name,
        description: this.description,
        columnId: 1
      }

      let cardList = this.getStorage()
      cardList.push(formData)

      localStorage.setItem('cards', JSON.stringify(cardList))
      this.$router.push({name: 'Home'})
    },
    getStorage() {
      return JSON.parse(localStorage.getItem('cards'))
    },

    validateForm() {
      this.errorName.validated = true
      this.errorDescription.validated = true
    },


  }
}
</script>
