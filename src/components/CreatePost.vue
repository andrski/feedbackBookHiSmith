<template>
  <main>
    <div>
      <input type="text" name="author" v-model="author" placeholder="enter author">
      <input type="text" name="content" v-model="content" placeholder="enter content">
    </div>
    <button v-on:click.prevent="addPost()">add feedback</button>
  </main>
</template>

<script>
export default {
  name: 'CreatePost',
  data(){
    return{
      author: '',
      content: ''
    }
  },
  mounted: function(){

  },
  computed:{
    getPosts: function(){
      return this.$store.getters.getPosts
    }
  },
  methods:{
    addPost(){
      const item = {}
      item.author = this.author
      item.content = this.content

      this.$store.dispatch('putPost', item)
    },
  },
}
</script>


<style scoped>

</style>
