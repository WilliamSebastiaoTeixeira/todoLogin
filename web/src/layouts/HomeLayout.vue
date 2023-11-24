<template>
  <q-layout
    view="hHh lpR fFf"
    class="estoque-menu-height"
  >
    <q-header class="header-shadow">
      <q-toolbar class="bg-white text-primary q-pa-md no-shadow">
        <q-toolbar-title class="row text-white items-center q-gutter-x-md">
          <span class="label-subtitle">Lista de tarefas do usuário {{ auth.usuario?.name }}</span>
        </q-toolbar-title>

        <div class="q-gutter-x-sm">
          <q-avatar class="cursor-pointer" text-color="primary" icon="fas fa-wrench">
            <q-menu fit anchor="bottom left" self="top left">
              <q-item
                clickable
                @click="onLogout"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon color="grey-6" name="las la-sign-out-alt" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <span class="text-grey-6 text-bold"> Sair </span>
                </q-item-section>
              </q-item>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="estoque-bg-color">
      <div class="fit scroll">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from './../stores/authentication'

const router = useRouter()
const auth = useAuthenticationStore()

async function onLogout(){
  auth.logout()
  router.push('/')
}
</script>


<style scoped>
.header-shadow {
  box-shadow: 0 0 5px rgba(31, 30, 47, 0.08);
}

.label-subtitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #75798d;

  margin-left: 16px;
  padding: 4px 0 4px 16px;
  border-left: 1px solid #e6e8eb;
}
</style>
