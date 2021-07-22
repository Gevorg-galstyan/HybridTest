<template>
  <div v-if="post" class="col-3 mb-3">
    <div class="post">
      <div class="post-img-block w-100">
        <img :src="post.image" :alt="post.title" width="100%"/>
      </div>

      <h2 class="post-title text-center">{{ post.title }}</h2>

      <p class="post-short-description">
        {{ shortDescription }}
      </p>

      <div v-if="post.comments" class="comments">
        5
      </div>

      <template v-if="editAction">
        <div class="edit-block d-flex">
          <div class="btn btn-danger" @click="$emit('remove-post', post.id)">Delete</div>
          <div class="btn" @click="$emit('edit-post', post.id)">Edit</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {textEllipsis} from "@/services/helper.services";

export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      default: null,
    },
    editAction: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    shortDescription() {
      return textEllipsis(this.post.shortDescription) || '';
    },
  }
}
</script>

<style scoped>
.post {
  position: relative;
  background: #fff;
  padding: 15px;
}

.post:hover .edit-block {
  display: flex;
}

.edit-block {
  position: absolute;
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 999;
}

.post-short-description, .post-title {
  word-break: break-all
}
</style>
