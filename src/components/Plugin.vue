<template>
  <div>
    <select v-model="selectedPlugin">
      <option
        v-for="plugin in availablePlugins"
        :key="plugin.id"
        :value="plugin.id"
      >
        {{ plugin.name }}
      </option>
    </select>

    <div class="plugin">
      <h2>{{ pluginName }}</h2>
      <component :is="PluginComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watchEffect } from "vue";
import { loadPlugin, availablePlugins } from "./loadPluginUI";

const selectedPlugin = ref("template");
const PluginComponent = shallowRef();
const pluginName = ref("");

/**
 * Load the selected plugin when the selectedPlugin value changes.
 * The plugins are specified in the `loadPluginUI.ts` module.
 */

watchEffect(async () => {
  const pluginMeta = availablePlugins.find(
    (p) => p.id === selectedPlugin.value
  );
  pluginName.value = pluginMeta?.name ?? "";
  PluginComponent.value = loadPlugin(selectedPlugin.value);
});
</script>

<style scoped>
.plugin {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.plugin h2 {
  margin-top: 0;
}
</style>
