<template>
  <section class="inner-section">
    <div class="text-center mt-3">
      <button class="add-button" @click="doAction = true">+</button>
    </div>

    <template v-if="allPosts">
      <div class="d-flex mt-3">
        <post
            v-for="post in allPosts"
            :key="post.id"
            :post="post"
            @edit-post="edit"
            @remove-post="deletePost"
            edit-action
        />
      </div>
    </template>

    <blog-action-modal
        v-if="doAction"
        @close="doAction = false"
        @update="updateData"
        :selected-post="selectedPost"
    />

    <loader v-if="loader"/>
  </section>
</template>

<script>
import {BlogStorage} from '@/services/storage.services';

import BlogActionModal from '@/components/blog/BlogActionModal.vue';
import Post from "@/components/blog/Post";

export default {
  name: "CreateBlog",
  components: {
    Post,
    BlogActionModal,
    Loader: () => import('@/components/Loader.vue'),
  },
  data: () => ({
    loader: false,
    doAction: false,
    selectedPost: null,
    allPosts: null,
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loader = true;

      try {
        this.allPosts = await BlogStorage.get('blog') || null;
      } catch (err) {
        console.error(err);
      } finally {
        this.loader = false;
      }
    },
    updateData(data) {
      this.allPosts = data;
    },
    edit(id) {
      this.selectedPost = this.allPosts.find(post => post.id === id) || null

      this.doAction = true
    },
    async deletePost(id) {
      this.loader = true;

      try {
        let blog = await BlogStorage.get('blog') || [];

        if (blog.length) {
          blog = blog.filter(post => post.id !== id)
        }

        if (blog) {
          await BlogStorage.set('blog', blog, 'blog');

         this.allPosts = blog
        } else {
          alert('sorry, something went wrong')
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loader = false;
      }
    }
  }
}
</script>

<style scoped>
.add-button {
  width: 50px;
  height: 50px;
  box-shadow: 0 0 20px #9b9b9b;
  background: #fff;
  border: 1px solid #ced4da;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all .5s ease;
}

.add-button:hover {
  box-shadow: 0 0 40px #9b9b9b;
}
</style>
