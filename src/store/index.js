import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token:'',
    error: false,
    allPosts:{}
  },
  actions: {
    fetchPosts: async function(context){
      axios.get(process.env.VUE_APP_CONFURL + '/token/create')
      .then((response)=>{
        if(response.status === 200){
          const token =  response.data["token"]
          axios.defaults.headers.common = {"X-AUTH-TOKEN": token}
          context.commit('updateToken', token)
        }else{
          context.commit('failed')
        }
      }).then(()=>{

        axios.get(process.env.VUE_APP_CONFURL + '/api/reviews')
        .then(resp =>{
           console.log(resp.data)
        context.commit('updatePosts', resp.data)
        })
      })
  },
},
  mutations: {
    updateToken: function(state, data){
      state.token = data
    },
    failed: function(state){
      state.error = true
      state.token = null
    },
    updatePosts: function(state, respData){
      state.allPosts = respData
      state.error = false
    }
  },
  getters:{
    getToken: state => state.token,
    getError: state => state.error,
    getPosts: state => state.allPosts
  },
})
