<template>
  <layout>
    <template #body>
      <component :is="page" />
    </template>
  </layout>
</template>

<script>
import '@/assets/main.css';

import Layout from './components/Layout.vue';

export default {
  name: 'App',
  components: {
    Layout,
    blog: () => import('./views/Blog.vue'),
    create: () => import('./views/CreateBlog.vue'),
    single: () => import('./views/Single.vue'),
  },
  computed: {
    page() {
      return this.$route.name;
    },
  }
}
</script>
