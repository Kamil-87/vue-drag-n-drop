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
        @dragenter.prevent
      >
        <Card
          v-for="card in cardsByColumns(column)"
          :key="card.id"
          :card="card"
          :id="card.id"
          :name="card.name"
          :description="card.description"
          :isDraggable="isDraggable"
        />
      </div>
    </div>


  </main>
</template>

<script>
import Card from "../components/Card";

const initCards = [
    {
      id: 1,
      name: 'Name',
      description: 'description',
      columnId: 1
    },
    {
      id: 2,
      name: 'Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium animi assumenda eaque ipsam provident quam quos, reiciendis sequi vel. Dolorum, fugit iusto! Ab assumenda, at blanditiis iure, natus nemo non nulla officia ratione recusandae repellat sit, tempora ut voluptatem.',
      columnId: 2
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
  components: {Card},
  data() {
    return {
      columns: [],
      cards: [],
      isDraggable: true
    }
  },
  mounted() {
    this.columns = [...initColumns]

    let storedData = this.getStorage()
    if (localStorage.getItem('cards') === null) {
      this.cards = [...initCards]
    } else {
      this.cards = [...storedData]
    }
  },
  watch: {
    cards: {
      handler() {
        this.updateStorage()
      },
      deep: true
    }
  },
  methods: {

    cardsByColumns(item) {
      return this.cards.filter(card => card.columnId === item.id)
    },

    createCard() {
      this.$router.push('/create-card')
    },

    onDrop(e, columnsId) {
      const cardId = parseInt(e.dataTransfer.getData('cardId'))
      this.cards = this.cards.map(card => {
        if (card.id === cardId) {
          card.columnId = columnsId
        }
        return card
      })
    },

    getStorage() {
      return JSON.parse(localStorage.getItem('cards'))
    },
    saveStorage() {
      localStorage.setItem('cards', JSON.stringify(this.cards))
    },
    updateStorage() {
      this.getStorage()
      this.saveStorage()
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


</style>
