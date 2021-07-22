<template>
  <section class="inner-section">

    <template v-if="allPosts">
      <div class="d-flex mt-3">
        <post
            v-for="post in allPosts"
            :post="post"
            :key="post.id"
            :edit-action="false"
        />
      </div>
    </template>

    <p v-else class="text-center">No Post Found</p>

    <loader v-if="loader"/>
  </section>
</template>

<script>
import { BlogStorage } from "@/services/storage.services";

import Loader from "@/components/Loader";
import Post from "@/components/blog/Post.vue";

export default {
  name: "Blog",
  components: {
    Loader,
    Post,
  },
  data: () => ({
    allPosts: null,
    loader: false,
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loader = true;

      try {
        this.allPosts = await BlogStorage.get('blog') || null
      } catch (err) {
        console.error(err);
      } finally {
        this.loader = false;
      }
    },
  }
}
</script>

<style scoped>

</style>
