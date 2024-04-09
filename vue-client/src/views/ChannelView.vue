<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/main";
import Sidebar from "@/components/ChannelView/Sidebar.vue";
import ChatPanel from "@/components/ChannelView/ChatPanel.vue";

const store = useMainStore();
const route = useRoute();

function updateSelectChannel() {
  return store.selectChannel(route.params.channelId);
}

onMounted(updateSelectChannel);
watch(() => route.params.channelId, updateSelectChannel);
</script>

<template>
  <Sidebar />

  <ChatPanel />
  <pre class="nav nav-pills d-block overflow-auto mh-40">
    {{ Object.keys(store) }}
    {{ store.users }}
  </pre>
</template>

<style scoped></style>
