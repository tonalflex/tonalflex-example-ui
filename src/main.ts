import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MockBackend } from '@tonalflex/template-plugin'
import type { IAudioBackend } from '@tonalflex/template-plugin'

const app = createApp(App)

// Mount the audio backend
const backend: IAudioBackend = new MockBackend()
app.provide('audio-backend', backend)

app.mount('#app')

// createApp(App).mount('#app')
