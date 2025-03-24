// pluginLoader.ts
import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue';

type PluginId = 'template' | 'delay' | 'nam';

export type PluginMeta = {
  id: PluginId;
  name: string;
  loader?: () => Promise<{ Plugin: Component }>;
};

const pluginMap: Record<PluginId, PluginMeta> = {
  template: {
    id: 'template',
    name: 'Template',
    loader: () => import('@tonalflex/template-plugin'),
  },
  delay: {
    id: 'delay',
    name: 'Delay',
    // loader: () => import('@tonalflex/plugin-delay'),
  },
  nam: {
    id: 'nam',
    name: 'Neural Amp Modeler',
    // loader: () => import('@tonalflex/plugin-nam'),
  },
};

// Get list of available plugins
export const availablePlugins = Object.values(pluginMap);

// Load a plugin by name
export function loadPlugin(name: string) {
  const plugin = pluginMap[name as PluginId];

  if (!plugin?.loader) {
    // TODO: Return a default component
    return ''; 
  }

  return defineAsyncComponent(async () => {
    const mod = await plugin.loader!();
    return mod.Plugin;
  });
}
