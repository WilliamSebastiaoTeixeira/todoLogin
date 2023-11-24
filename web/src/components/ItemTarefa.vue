<template>
  <div class="row items-center">
    <div class="text-grey-7 col q-mr-sm">
      <q-input
        v-if="editing"
        v-model="todo.title"
        class="flex"
        outlined
        placeholder="Título"
        dense
      />
      <div
        v-else
        class="row items-center text-grey-9"
      >
        <span>
          {{ todo.title}}
        </span>
      </div>
    </div>

    <div class="text-grey-7 col q-mr-sm">
      <q-input
        v-if="editing"
        v-model="todo.description"
        class="flex"
        outlined
        placeholder="Descrição"
        dense
      />
      <div
        v-else
        class="row items-center text-grey-9"
      >
        <span>
          {{ todo.description}}
        </span>
      </div>
    </div>

    <div>
      <q-btn
        v-if="editing"
        flat
        round
        color="positive"
        icon="las la-check"
        @click="save"
      />
      <q-btn
        v-else
        flat
        round
        color="blue-7"
        icon="las la-edit"
        @click="editing = true"
      />
    </div>
    <div>
      <q-btn
        round
        flat
        color="red"
        icon="las la-trash-alt"
      >
        <q-popup-proxy
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-card class="column">
            <span class="q-grey-8 text-weight-light q-pa-md">Excluir tarefa?</span>
            <div class="row items-center justify-between">
              <q-btn
                flat
                color="primary"
                style="width: 50%"
                label="Sim"
                @click="() => emit('deletar', todo?.id)"
              />
              <q-btn
                v-close-popup
                flat
                style="width: 50%"
                color="negative"
                label="Não"
              />
            </div>
          </q-card>
        </q-popup-proxy>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts"> 

import { ref } from 'vue'

import type { Todo } from '../services/TodoService'

const props = defineProps<{
  item: Todo
}>()

const emit = defineEmits(['deletar', 'atualizar'])
  
const editing = ref(false)
const todo = ref<Todo>(props.item)

function save() {
  editing.value = false
  emit('atualizar', todo.value )
}

</script>

<style scoped></style>
