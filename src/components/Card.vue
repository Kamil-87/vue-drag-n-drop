<template>
  <div>
    <Modal
      v-if="isShowModal"
      @close="closeModal"
    >
      <template v-slot:header>
        <h3 v-text="card.name"></h3>
      </template>
      <template v-slot:body>
        <p v-text="card.description"></p>
      </template>
    </Modal>
    <div
      class="card"
      :class="{move: isDraggable}"
      :key="card.id"
      @dragstart="onDragStart($event, card)"
      :draggable="isDraggable"
      @click="showModal"
    >
      <h3 v-text="card.name"></h3>
      <p>{{ card.description | formattedText(30) }}</p>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  components: {Modal},
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      default: 'Name'
    },
    description: {
      type: String,
      default: 'Description'
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    card: {
      type: Object,
    }
  },
  data: () => ({
    isShowModal: false,
  }),
  methods: {
    showModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    },
    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('cardId', item.id.toString())
    },
  }
}
</script>

<style scoped>
.card {
  overflow: hidden;
  height: 100px;
  padding: .5rem 1rem;
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
