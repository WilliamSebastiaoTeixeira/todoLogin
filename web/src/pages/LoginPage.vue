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
            v-model="form.senha"
            outlined
            placeholder="Senha"
            :type="mostrarSenha ? 'text' : 'password'"
            dense
            autocorrect="off"
            autocapitalize="off"
            autocomplete="current-password"
            bg-color="white"
            :rules="[
              () => !v$.senha.required.$invalid || 'A senha é obrigatória.',
              () =>
                !v$.senha.minLength.$invalid ||
                'A senha deve ter no mínimo 8 caracteres.',
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

          <q-input
            v-if="registrar"
            v-model="form.confirmarSenha"
            outlined
            placeholder="Confirmar senha"
            :type="mostrarConfirmarSenha ? 'text' : 'password'"
            dense
            autocorrect="off"
            autocapitalize="off"
            autocomplete="current-password"
            bg-color="white"
            :rules="[
              () => !v$.confirmarSenha.required.$invalid || 'A confirmação de senha é obrigatória.',
              () =>
                !v$.confirmarSenha.sameAs.$invalid ||
                'A senhas devem ser iguais.',
            ]"
            @keydown.enter.prevent="onClick"
          >
            <template #append>
              <q-icon
                :name="mostrarConfirmarSenha ? 'las la-eye-slash' : 'las la-eye'"
                class="cursor-pointer"
                @click="mostrarConfirmarSenha = !mostrarConfirmarSenha"
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
const mostrarConfirmarSenha = ref(false)
const registrar = ref(false)

const form = reactive({
  email: '',
  senha: '',
  confirmarSenha: ''
})

const rules = computed(() => ({
  email: {
    required,
    email
  },

  senha: {
    required,
    minLength: minLength(8),
  },

  confirmarSenha: {
    required: requiredIf(registrar.value),
    sameAs: sameAs(form.senha),
  },
}))

const v$ = useVuelidate(rules, form)

async function onClick() {

  if(registrar.value) {
    try{
      await services.loginService.register(form)
    }catch(e){
      console.error(e)
    }
    return
  }
  
  try{
    const data = await services.loginService.login({ 
      email: form.email, 
      senha: form.senha
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
