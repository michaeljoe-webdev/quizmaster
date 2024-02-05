<template>
    <div class="container"  style="border:1px solid blue">
        <h3>{{ msg }}</h3>
        <div class="toolbar"  style="border:1px solid black">
            Number of questions: 
            <input type="text" name="amount" id="amount">
            Category: 
            <select id="categories" v-model="category" >
                <option v-for="(item,i) in categories" :key="i"  :value="item.id">{{ item.name }}</option>
            </select> 
            Difficulty:
            <select id="difficulties" v-model="difficulty" >
                <option v-for="(item,i) in difficulties" :key="i"  :value="item.value">{{ item.name }}</option>
            </select>
            Type:
            <select id="types" v-model="type" >
                <option v-for="(item,i) in types" :key="i"  :value="item.value">{{ item.name }}</option>
            </select>
            <br>
            <button type="button" @click="allSet()">ALL SET!</button>
        </div>
        <div class="card">
            {{ category }}
            {{ difficulty }}
            {{ type }}
        </div>
    </div>
<!-- https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple -->
<!-- https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=boolean -->
</template>
<script>
import axios from 'axios';
export default {
  name: 'WelcomePage    ',
  props: {
    msg: String
  },
  data() {
    return {
        category: '',
        categories: [],
        difficulty: '',
        difficulties: [
            { name: 'Easy', value: 'easy'},
            { name: 'Medium', value: 'medium'},
            { name: 'Hard', value: 'hard'},
        ],
        type: '',
        types: [
            { name: 'Multiple Choice', value: 'multiple'},
            { name: 'True / False', value: 'boolean'},
        ],
    }
  },
  methods: {
    async allSet(){
        console.log('all set')
        this.categories = await axios.get('https://opentdb.com/api_category.php').then((res) => {
            return res.data.trivia_categories
        })
    },  
    async fetchData(){
        // this.categories = await fetch('https://opentdb.com/api_category.php').then(response => response.json())
        this.categories = await axios.get('https://opentdb.com/api_category.php').then((res) => {
            return res.data.trivia_categories
        })
    },  
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    height: 100%;
}
.toolbar {
    height: 50px;
}
.card {
    height: 500px;
    border:1px solid red;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>