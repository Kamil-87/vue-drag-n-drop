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
            v-model="isDraggable"
          >
        </div>
      </div>
    </header>

    <hr>

    <div class="dashboard">
      <div
        class="col"
        v-for="column in columns"
        :key="column.id"
        @drop.prevent="onDrop($event, column.id)"
        @dragover.prevent
        @dragenter.prevent>
        <div
          class="card"
          :class="{move: isDraggable}"
          v-for="card in cardsByColumns(column)"
          :key="card.id"
          @dragstart="onDragStart($event, card)"
          :draggable="isDraggable">
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
      name: 'Name',
      description: 'description',
      categoryId: 1
    },
    {
      id: 2,
      name: 'Name',
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
      cards: [],
      isDraggable: true,
    }
  },
  mounted() {
    this.columns = [...initColumns]
    this.cards = [...initCards]
  },
  computed: {

  },
  methods: {
    cardsByColumns(item) {
      return this.cards.filter(card => card.categoryId === item.id)
    },

    createCard() {
      this.$router.push('/create-card')
    },

    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('cardId', item.id.toString())
    },
    onDrop(e, columnsId) {
      const cardId = parseInt(e.dataTransfer.getData('cardId'))
      this.cards = this.cards.map(card => {
        if (card.id === cardId) {
          card.categoryId = columnsId
        }
        return card
      })
    }
  },

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
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  min-height: 130px;
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
  user-select: none;
  cursor: pointer;
}

.card p, .card h3 {
  overflow: hidden;
}

.move {
  cursor: move;
}
</style>
