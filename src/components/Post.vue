<template>
  <div>
    <div class="post">
      <span class="author"><b>author:</b> {{getOnePost.author}}</span>
      <br>
      <span class="datetime">{{new Date(getOnePost.datetime) }}</span>
      <span class="likes_count">likes: {{getOnePost.likes_count}}</span>
      <br>
      <span class="content">{{getOnePost.content}}</span>
    </div>
    <div class="buttons">
      <button v-if="getOnePost.id != 0" @click.prevent="switchPost(getOnePost.id-1)">previos</button>
      <button v-if="getOnePost.id != (getPosts.items.length-1)" @click.prevent="switchPost(getOnePost.id+1)">next</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'Post',
  computed:{
    getOnePost: function(){
      return this.$store.getters.getOnePost
    },
    getPosts: function(){
      return this.$store.getters.getPosts
    }
  },
  methods:{
    ...mapMutations(['updateOnePost']),
    switchPost(id){
      this.updateOnePost(this.getPosts.items[id])
    },
  },
}
</script>


<style scoped>
   .post{
    width: 60%;
    margin: 1rem auto;
    border: 0.2rem ridge darkgray;
  }
  .author{
    margin-left: 20%;
  }
  .content{
    display: block;
    margin: 0 0.5rem;
    text-align: left;
    border: 0.1rem solid black;
  }
  .datetime{
    margin-left: 20%;
  }
  .likes_count{
    margin-left: 6rem;
    color: darkolivegreen;
  }
  .buttons{
    width: 60%;
    margin: 1rem auto;
    line-height: 2rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-around;
  }
  .buttons button{
    width: 12%;
    height: 2rem;
  }
</style>
