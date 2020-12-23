<template>
  <main class="main_wrapper">
    <div class="div_inputs">
      <input type="text" name="author" v-model="author" placeholder="enter author">
      <textarea class="text_area" name="content" v-model="content" placeholder="enter content"></textarea>
    </div>
    <div class="error" v-if="visiobleError">Error: {{visiobleError}}</div>
    <button v-on:click.prevent="addPost()">add feedback</button>
  </main>
</template>

<script>
export default {
  name: 'CreatePost',
  data(){
    return{
      author: '',
      content: '',
      visiobleError:''
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
        const regexp = /</
        if(!this.author || !this.content){
          this.visiobleError = "you not entered a value"
          setTimeout(()=>{this.visiobleError = ''}, 3000)
        }
        if(this.content.match(regexp)){
          this.visiobleError = "you try to send HTML teg"
          setTimeout(()=>{this.visiobleError = ''}, 3000)
        }
        if(this.author && this.content && !(this.content.match(regexp))){
          const item = {}
          item.author = this.author
          item.content = this.content
            console.log('else')
          this.$store.dispatch('putPost', item)
          // this.$router.push('/')
        }
    },
  }
}
</script>

<style scoped>
  .main_wrapper{
    width: 60%;
    margin: 2rem auto;
    background: grey;
    opacity: 0.7;
    display: flex;
    flex-direction: column;
  }
  .main_wrapper button{
    display: block;
    width: 15%;
    margin: 1rem auto;
    border: 0.3rem groove black;
    border-radius: 14%;
  }
  .div_inputs{
    display: flex;
    flex-direction: column;
  }
  .div_inputs input{
    text-align: center;
    line-height: 1.5rem;
    font-size: 1.2rem;
    display: block;
    width: 40%;
    margin: 0.8rem auto;
  }
  .text_area{
    width: 70%;
    margin: 0 auto;
    font-size: 1rem;
  }
  .error{
    color: red;
    margin: 1rem auto;
    font-size: 1.5rem;
  }
</style>