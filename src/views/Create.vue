<template>
  <div class="home">
       <create-post />
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from '../components/CreatePost'

export default {
  name: 'Create',
  components: {
    CreatePost
  }
}
</script>
