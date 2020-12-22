<template>
  <div>
    <div v-if="getError">no token</div>
    <div v-for="(post, index) in getPosts.items" :key="index">
      <span>{{post.author}}</span>
      <br>
      <span>{{post.content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllPosts',
  data(){
    return{
      posts:[1,2,3,4,5]
    }
  },
  mounted: function(){
    this.$store.dispatch('fetchPosts')
  },
  computed:{
    getError(){
      return this.$store.getters.getError
    },
    getPosts: function(){
      return this.$store.getters.getPosts
    }
  },
  methods:{

  },
}
</script>


<style scoped>

</style>
