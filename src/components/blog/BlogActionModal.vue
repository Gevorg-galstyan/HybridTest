<template>
  <div>
    <div class="modal">
      <div class="modal-inner">
        <div class="modal-header">
          <h3>Create post</h3>

          <button class="close" @click="$emit('close')">x</button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="mb-2 form-label">Title</label>
            <input type="text" id="title" class="form-control" v-model="post.title"/>
          </div>

          <div class="mb-3">
            <label for="short-description" class="mb-2 form-label">Short description</label>
            <textarea id="short-description" class="form-control" v-model="post.shortDescription"/>
          </div>

          <div class="mb-3">
            <label for="description" class="mb-2 form-label">Description</label>
            <textarea id="description" rows="10" class="form-control" v-model="post.description"/>
          </div>

          <div class="mb-3">
            <label for="file" class="mb-2 form-label file-container">
              <span v-if="!post.image">Choose Image</span>

              <img v-else :src="post.image" alt="image" width="150px"/>

              <button v-if="post.image" class="close" @click.prevent="post.image = null">x</button>
            </label>

            <input type="file" id="file" ref="blogImage" accept="image/*" @change="onFileChange"/>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn" @click="$emit('close')">Cancel</button>

          <button class="btn" @click="postAction" :disabled="!validFields">
            {{ !selectedPost ? 'Create' : 'Edit' }}
          </button>
        </div>
      </div>
    </div>

    <loader v-if="loader"/>
  </div>
</template>

<script>
import { BlogStorage } from "@/services/storage.services";

export default {
  name: "BlogActionModal",
  components: {
    Loader: () => import('../Loader.vue')
  },
  props: {
    selectedPost: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      loader: false,
      post: {
        id: this.selectedPost?.id || this.$_uid,
        title: this.selectedPost?.title || '',
        shortDescription: this.selectedPost?.shortDescription || '',
        description: this.selectedPost?.description || '',
        image: this.selectedPost?.image || null,
      }
    }
  },
  computed: {
    validFields() {
      const {title, shortDescription, description, image} = this.post;

      return [title, shortDescription, description, image].every(Boolean);
    }
  },
  methods: {
    toBase64(file) {
      if (!file) {
        return;
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async onFileChange({target}) {
      if (target?.files[0]) {
        try {
          this.post.image = await this.toBase64(target.files[0]) || null;
        } catch (err) {
          console.error(err);
        }

        this.$refs.blogImage.value = '';
      }
    },
    async postAction() {
      this.loader = true

      try {
        let blog = await BlogStorage.get('blog') || [];

        if (!this.selectedPost || !blog.length) {
          blog = [...blog, this.post];
        }
        else {
          blog = blog.map((item, index) => {
            if(item.id === this.post.id) {
              return blog[index] = this.post;
            }

            return item
          })
        }

        if (blog) {
          await BlogStorage.set('blog', blog, 'blog');

          this.$emit('update', blog)
          this.$emit('close')
        } else {
          alert('sorry, something went wrong')
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loader = false;
      }
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}

.modal-inner {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  background: #fff;
  padding: 0 15px;
}

.modal-body {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

#file {
  display: none;
}

.file-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ced4da;
  padding: 15px 5px;
  transition: all .3s ease;
  cursor: pointer;
}

.file-container:hover {
  border: 1px dashed #89b5ff;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ced4da;
  box-shadow: none;
  background: #fff;
  cursor: pointer;
}
</style>
