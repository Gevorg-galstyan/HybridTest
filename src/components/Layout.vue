<template>
  <main>
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/blog" class="nav-link">Blogs</router-link>
          </li>
          <li>
            <router-link to="/create" class="nav-link">Create</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <slot name="body"></slot>

    <footer>Footer</footer>
  </main>
</template>

<script>
export default {
  name: 'Layout',
}
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

header {
  display: flex;
  align-items: center;
  align-self: flex-start;
  height: 60px;
  width: 100%;
  background: #fff;
}

nav{
  width: 100%;
  padding: 5px 15px;
}

ul {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-link {
  padding: 5px 15px;
  text-transform: uppercase;
  color: #000;
  font-weight: bold;
  text-decoration: none;
}

footer {
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  width: 100%;
  padding: 15px;
  background: #fff;
}
</style>
