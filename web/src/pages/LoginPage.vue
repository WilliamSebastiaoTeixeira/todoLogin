<template>
  <q-page class="q-pa-md">

    <q-card
      flat
      bordered
      style="min-width: 200px; max-width: 400px; width: 100%;"
      class="bg-white q-pa-lg column"
    >
        <div class="row justify-around items-center q-mb-md">
          <span class="text-h5 text-primary text-bold">
            Entrar
          </span>

          <q-toggle
            v-model="registrar"
          />

          <span class="text-h5  text-secondary text-bold">
            Registrar
          </span>
        </div>

        <q-form class="q-gutter-y-sm">
          <q-input
            v-model="form.email"
            outlined
            placeholder="Email"
            dense
            autocorrect="off"
            autocapitalize="off"
            autocomplete="username"
            bg-color="white"
            :rules="[
              () => !v$.email.required.$invalid || 'O email é obrigatório.',
              () => !v$.email.email.$invalid || 'O email é inválido.'
            ]"
            @keydown.enter.prevent="onClick"
          />
          <q-input
            v-if="registrar"
            v-model="form.name"
            outlined
            placeholder="Nome"
            dense
            autocorrect="off"
            autocapitalize="off"
            autocomplete="username"
            bg-color="white"
            :rules="[
              () => !v$.name.required.$invalid || 'O nome é obrigatório.',
            ]"
            @keydown.enter.prevent="onClick"
          />

          <q-input
            v-model="form.password"
            outlined
            placeholder="Senha"
            :type="mostrarSenha ? 'text' : 'password'"
            dense
            autocorrect="off"
            autocapitalize="off"
            autocomplete="current-password"
            bg-color="white"
            :rules="[
              () => !v$.password.required.$invalid || 'A senha é obrigatória.',
              () =>
                !v$.password.minLength.$invalid ||
                'A senha deve ter no mínimo 6 caracteres.',
            ]"
            @keydown.enter.prevent="onClick()"
          >
            <template #append>
              <q-icon
                :name="mostrarSenha ? 'las la-eye-slash' : 'las la-eye'"
                class="cursor-pointer"
                @click="mostrarSenha = !mostrarSenha"
              />
            </template>
          </q-input>

          <q-btn
            :color="!registrar ? 'primary' : 'secondary'"
            :label="!registrar ? 'Entrar' : 'Registrar'"
            unelevated
            no-caps
            class="full-width"
            :disable="v$.$invalid"
            @click="onClick"
          />
        </q-form>
  </q-card>
  </q-page>

</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, sameAs, requiredIf } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useServices } from '../composables/useServices'
import { useAuthenticationStore } from '../stores/authentication'

const router = useRouter()
const services = useServices()
const auth = useAuthenticationStore()

const mostrarSenha = ref(false)
const registrar = ref(false)

const form = reactive({
  email: '',
  name: '',
  password: '',
})

const rules = computed(() => ({
  email: {
    required,
    email
  },

  name: {
    required: requiredIf(registrar.value)
  },

  password: {
    required,
    minLength: minLength(6),
  },
}))

const v$ = useVuelidate(rules, form)

async function onClick() {

  if(registrar.value) {
    try{
      await services.authService.register(form)
    }catch(e){
      console.error(e)
    }
    return
  }
  
  try{
    const data = await services.authService.login({ 
      email: form.email, 
      password: form.password
    })
    auth.setUsuario(data.usuario)
    auth.setToken(data.token)
  } catch(e) {
    console.error(e)
  } finally {
    router.push('/home')
  }
}

</script>

<style scoped>
.estoque-background {
  background: grey;
  background-size: cover;
}
</style>
