<template>
  <main class="container">
    <header class="header pt-1">
      <h1 class="mb-2">Drag And Drop</h1>

      <div class="action-block">
        <button
          class="btn primary"
          @click="createCard"
        >Добавить
        </button>

        <div class="form-checkbox">
          <label for="checkbox">click&drag</label>
          <input
            type="checkbox"
            id="checkbox"
            class="checkbox"
          >
        </div>
      </div>
    </header>

    <hr>

    <div class="dashboard">
      <div
        class="col"
        v-for="col in columns"
        :key="col.id"
      >
        <div
          class="card"
          v-for="card in cards"
          :key="card.id"
        >
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>


  </main>
</template>

<script>
const initCards = [
    {
      id: 1,
      title: 'Name',
      description: 'description',
      categoryId: 1
    },
    {
      id: 2,
      title: 'Name',
      description: 'description',
      categoryId: 2
    },
  ],
  initColumns = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ]


export default {
  name: 'Home',
  components: {},
  data() {
    return {
      columns: [],
      cards: []
    }
  },
  methods: {
    createCard() {
      this.$router.push('/create-card')
    }
  },
  mounted() {
    this.columns = [...initColumns]
    this.cards = [...initCards]
  }
}
</script>

<style scoped>
.action-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
}

.col {
  display: flex;
  flex-direction: column;
  flex: 0 0 24%;

  border-radius: 5px;
  padding: .5rem 1rem;
  overflow: hidden;
  border: 1px dotted #2c3e50;
}

.card {
  overflow: hidden;
  height: 90px;
  padding: 1rem;
  margin-bottom: .5rem;
  border-radius: 5px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  cursor: move;
  user-select: none;
}
.card p, .card h3 {
  overflow: hidden;
}

</style>
