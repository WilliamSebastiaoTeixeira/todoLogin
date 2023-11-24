<template>
  <q-page class="row col justify-center items-center">

    <div 
      class="column"
      style="width: 700px"
    >
      <div class="row justify-center q-mb-sm ">
        <span class="text-bold text-primary text-h3">
          Lista de tarefas
        </span>
      </div>

      <div
        v-if="loading"
        class="q-mt-lg column items-center justify-center q-pa-lg"
      >
        <q-spinner
          color="primary"
          size="40"
        />
      </div>

      <q-card
        v-else
        class="q-mt-lg bg-white column"
      >
        <div class="q-pa-md">
          <item-tarefa
            v-for="(item, index) in todos"
            :key="index"
            :item="item"
            :class="index !== todos.length - 1 ? 'q-mb-sm' : ''"
            @deletar="onDelete"
            @saveEdit="onUpdate"
          />

          <div
            v-if="!todos.length"
            class="column items-center justify-center q-mb-md"
          >
            <q-icon
              name="las la-list"
              size="60px"
              color="grey-9"
            />
            <span class="text-grey-8">
              Nenhuma tarefa registrada
            </span>
          </div>
        </div>
        <div>
          <q-separator />
        </div>
        <div>
          <div
            v-if="!adding"
            class="row items-center cursor-pointer q-my-md q-ml-sm"
            @click="adding = true"
          >
            <q-icon
              name="las la-plus-circle"
              color="blue-8"
              class="q-mr-sm"
            />
            <span class="text-blue-8">Adicionar tarefa</span>
          </div>

          <div
            v-else
            class="row items-center justify-between q-my-sm q-mx-sm"
          >
            <q-input
              v-model="todo.title"
              class="col q-mr-md"
              outlined
              placeholder="Título"
              dense
            />
            
            <q-input
              v-model="todo.description"
              class="col q-mr-md"
              outlined
              placeholder="Descrição"
              dense
            />

            <div class="row">
              <q-btn
                flat
                round
                color="positive"
                icon="las la-check"
                class="q-mr-sm"
                @click="onCreate()"
                :disable="!todo.title.trim() || !todo.description.trim"
              />
              <q-btn
                flat
                round
                color="negative"
                icon="las la-times"
                @click="adding = false"
              />
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useServices } from '../composables/useServices'
import type { Todo } from '../services/TodoService'

import ItemTarefa from '../components/ItemTarefa.vue'

const services = useServices()

const todos = ref<Todo[]>([])
const todo = ref<Omit<Todo, 'id'>>({title: '', description: ''})
const adding  =  ref(false)
const loading = ref(false)

async function listTodo(){
  const data = await services.todoService.getAll()
  todos.value = data.todos
}

async function onCreate(){
  console.log(todo.value)
}

async function onDelete(id: string){
  console.log(id)
}

async function onUpdate(todo: Todo){
  console.log(todo)
}

onMounted(() => {
  loading.value = true
  listTodo()
  loading.value = false
})
</script>
