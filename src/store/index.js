import { createStore } from 'vuex'
import axios from 'axios'
import postsManually from '../assets/posts.js'

export default createStore({
  state: {
    token:'',
    error: false,
    allPosts:postsManually,
    onePost:[],
    ipArr:[]
  },
  actions: {
    fetchPosts: async function({commit, state}){
          // token is
          if(state.token){
            axios.defaults.headers.common = {"X-AUTH-TOKEN": state.token}
            axios.get(process.env.VUE_APP_CONFURL + '/api/reviews')
            .then(resp => {
              console.log(resp)
              commit('updatePosts', resp.data)
            })
          }
          // no token
          else{
            
            axios.get(process.env.VUE_APP_CONFURL + '/token/create')
            .then((response)=>{
              if(response.status === 200){
                const token =  response.data["token"]
               axios.defaults.headers.common = {"X-AUTH-TOKEN": token}
                commit('updateToken', token)
            }else{
          commit('failed')
              }
            }).then(()=>{
              axios.get(process.env.VUE_APP_CONFURL + '/api/reviews')
              .then(resp =>{
                console.log(resp.data)
                commit('updatePosts', resp.data)
            })
          })
          }
  },
  putPost: async function({state}, item){
    console.log(state.token)   
    axios.defaults.headers.common = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-AUTH-TOKEN": state.token
    }

    let parametrs = new URLSearchParams()
      parametrs.append('author', item.author)
      parametrs.append('content', item.content)

   await axios.put(process.env.VUE_APP_CONFURL + '/api/review/create', parametrs)
  
  }
},
  mutations: {
    updateToken: function(state, data){
      state.token = data
    },
    failed: function(state){
      state.error = true
    },
    updatePosts: function(state, respData){
      console.log(respData)
      //state.allPosts = respData
      state.error = false
    },
    updatePostsItems: function(state, items){
      state.allPosts.items = items // update items only
    },
    updateOnePost: function(state, item){
      state.onePost = item
    },
    updateIpArr:function(state, ipArr){
      state.ipArr = ipArr
    }
  },
  getters:{
    getToken: state => state.token,
    getError: state => state.error,
    getPosts: state => state.allPosts,
    getOnePost: state => state.onePost,
    getIpArr: state => state.ipArr
  },
})
