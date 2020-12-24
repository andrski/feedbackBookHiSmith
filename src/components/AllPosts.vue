<template>
  <div>
    <div v-if="getError">no token</div>
    <div class="handle_error" v-if="handleError" style="color:red;">{{handleError}}</div>
   
    <div @click.prevent.self="showPost(post)" class="post" v-for="(post, index) in getPosts.items" :key="index">
      <span class="author"><b>author:</b> {{post.author}}</span>
      <br>
      <span class="datetime">{{new Date(post.datetime) }}</span>
      <span v-on:click.prevent="liked(post)" class="likes_count">likes: {{post.likes_count}}</span>
      <br>
      <span class="content">{{post.content}}</span>
    </div>
    <div class="sort_checkbox">
      <span>sort by likes</span>
      <input type="checkbox" id="checkbox" @change="sortBylikes()" v-model="checked">
      <label for="checkbox">{{ label }}</label>
    </div>

    
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'AllPosts',
  data(){
    return{
      checked: true,
      label: '',
      handleError:''
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
    },
    getIpArr: function(){
      return this.$store.getters.getIpArr
    }
  },
  methods:{
    ...mapMutations(['updateOnePost','updatePostsItems', 'updateIpArr']),
    
      showPost(item){
          this.$router.push('/user')
          this.updateOnePost(item) //send item to store and then show it in post page
      },
      sortBylikes: function(){
        const items =  this.getPosts.items.sort( (a, b) => a.likes_count-b.likes_count)
        if(this.checked){
          this.label = 'asc'
          this.updatePostsItems(items)
        }
        else{
          this.label = 'desc'
          this.updatePostsItems(items.reverse())
        }
      },
      liked: function(item){
        // in obj via id change likes_count, id get from item
        // this method has three arguments : item in arra, index of item, and array, we use only first
        // const ipArr = []
          this.getPosts.items.forEach((obj)=>{
           if(obj.id === item.id){
            //  console.log(this.getIpArr)
             if(this.getIpArr.includes(item.ip)){
               this.handleError = 'one user can put like once only'
               setTimeout(()=>{this.handleError = ''}, 3000)
               
             }else{
               obj.likes_count ++
                this.getIpArr.push(item.ip) //add ip liked post in array
                //console.log(this.getIpArr)
                this.updateIpArr(this.getIpArr) // update it array in state, and have to update it in server
             }
             
             //this.updatePostsItems(obj)
           }
          })
      }
  },
}
</script>

<style scoped>
  .handle_error{
    position: absolute;
    top: 15%;
    left: 25%;
    width: 50%;
    text-align: center;
    line-height: 1.5rem;
    font-size: 1.2rem;
  }
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
  .sort_checkbox{
    width: 35%;
    margin: 1rem auto;
    background: whitesmoke;
  }
</style>
