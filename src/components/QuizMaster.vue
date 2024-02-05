<template>
    <div class="container" >
      <div class="greeting">
        <h3>{{ msg }}</h3>
      </div>
      <div class="toolbar" >
        <span>
          Number of questions: 
          <input type="number" v-model="amount" maxlength="2" min="1" max="50">
        </span>
        <span>
          Category: 
          <select id="categories" v-model="category" >
              <option v-for="(item,i) in categories" :key="i"  :value="item.id">{{ item.name }}</option>
          </select>
        </span>
        <span>
          Difficulty:
          <select id="difficulties" v-model="difficulty" >
            <option v-for="(item,i) in difficulties" :key="i"  :value="item.value">{{ item.name }}</option>
          </select>
        </span>
        <span>
          Type:
          <select id="types" v-model="type" >
              <option v-for="(item,i) in types" :key="i"  :value="item.value">{{ item.name }}</option>
          </select>
        </span>
      </div>
      <div class="setbtn">
        <button @click="allSet()">ALL SET!</button>
      </div>
      <div class="card">
          <!-- {{ questions }} -->
          <!-- <div class="question-box" v-for="(item,i) in questions" :key="i" > -->
          <!-- <div class="question-box"> -->
            <!-- <table v-for="(item,i) in questions" :key="i" >
              <tr>
                <th colspan="12">QUESTION {{ i + 1 }} : {{ formattedQuestion(item.question) }}</th>
              </tr>
              <tr>
                <td colspan="6"> 
                  <input type="radio" id="answerA" v-model="answer" :value="item.choices[0]">
                  <label for="answerA">A. {{ formattedQuestion(item.choices[0]) }}</label>
                </td>
                <td colspan="6">
                  <input type="radio" id="answerB" v-model="answer" :value="item.choices[1]">
                  <label for="answerB">B. {{ formattedQuestion(item.choices[1]) }}</label>
                </td>
              </tr>
              <tr>
                <td colspan="6"> 
                  <input type="radio" id="answerC" v-model="answer" :value="item.choices[2]">
                  <label for="answerC">C. {{formattedQuestion(item.choices[2]) }}</label>
                </td>
                <td colspan="6">
                  <input type="radio" id="answerD" v-model="answer" :value="item.choices[3]">
                  <label for="answerD">D. {{ formattedQuestion(item.choices[3]) }}</label>
                </td>
              </tr>
            </table> -->
            <table >
              <tr>
                <th colspan="12">QUESTION {{ index + 1 }} : {{ formattedQuestion(questions[index + 1].question) }}</th>
              </tr>
              <tr>
                <td colspan="6"> 
                  <input type="radio" id="answerA" v-model="answer" :value="questions[index + 1].choices[0]">
                  <label for="answerA">A. {{ formattedQuestion(questions[index + 1].choices[0]) }}</label>
                </td>
                <td colspan="6">
                  <input type="radio" id="answerB" v-model="answer" :value="questions[index + 1].choices[1]">
                  <label for="answerB">B. {{ formattedQuestion(questions[index + 1].choices[1]) }}</label>
                </td>
              </tr>
              <tr>
                <td colspan="6"> 
                  <input type="radio" id="answerC" v-model="answer" :value="questions[index + 1].choices[2]">
                  <label for="answerC">C. {{formattedQuestion(questions[index + 1].choices[2]) }}</label>
                </td>
                <td colspan="6">
                  <input type="radio" id="answerD" v-model="answer" :value="questions[index + 1].choices[3]">
                  <label for="answerD">D. {{ formattedQuestion(questions[index + 1].choices[3]) }}</label>
                </td>
              </tr>
            </table>
          </div>
          <div class="nextbtn">
            <button @click="allSet()">NEXT >></button>
          </div>
          {{ questions.category }}
          {{ questions.difficulty }}

      <!-- </div> -->
    </div>
<!-- https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple -->
<!-- https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=boolean -->
</template>
<script>
import axios from 'axios';
export default {
  name: 'QuizMaster',
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
        questions: '',
        answer: '',
        index: '-1',
    }
  },
  methods: {
    formattedQuestion(string) {
      return string.replaceAll('&ldquo;', '"').replaceAll('&rdquo;', '"').replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&lsquo;', "'").replaceAll('&shy;', '').replaceAll('&hellip;', '…');
    },
    test(){
      var form = document.getElementById('form');
      form.addEventListener('submit');
      // console.log('test',document.getElementsByName("answer")[0].value)
      console.log('form',form)
    },  
    async allSet(){
        if(this.amount >= 51){
          alert('Number of questions exceed the limit 50')
        }else if(!this.amount || !this.category || !this.difficulty || !this.type){
          alert('Please complete all fields!')
        }else{
          await axios.get(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`)
          .then(async (res) => {
            let newArray = await res.data.results.filter((item)=>{
              let tempArray = [item.correct_answer]
              item.incorrect_answers.filter((item2)=>{
                // tempArray.push(item2.replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&quot;/g, '"'))
                tempArray.push(item2)
              })

              item.choices = this.shuffle(tempArray)
              return item
            })

            this.questions = newArray
          })
        }
        // console.log(this.questions)
    },  
    shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },
    async fetchData(){
        let data = await axios.get('https://opentdb.com/api_category.php').then((res) => {
            return res.data.trivia_categories
        })
        this.setLsData('categories',data)
        this.categories = this.getLsData('categories')
    },  
    setLsData(name,value){
      localStorage.setItem(name, JSON.stringify(value));
      console.log('Successfully Set')
    },
    getLsData(name){
      return JSON.parse(localStorage.getItem(name));
    },
  },
  mounted() {
    this.fetchData();
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      return event.returnValue = "Are you sure you want to exit?"
    };
    window.addEventListener("beforeunload",beforeUnloadListener, {capture: true})
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    height: 100%;
}
.greeting {
  text-align: center;
  /* margin-bottom: 15px; */
  border: 1px solid red;
  text-shadow:  0px 0px 10px aqua,
                0px 0px 20px aqua,
                0px 0px 40px aqua,
                0px 0px 80px aqua;

}
.toolbar {
    height: auto;
    width: auto;
    margin: 5px 5px 5px;
    text-align: center;
    align-items: center;
    /* align-content: center; */
    display: flex;
    flex-wrap: wrap;
    border: 1px solid red;

}
span {
  margin: 5px;
}
.card {
    height: 500px;
    border:1px solid red;
}
.setbtn {
  margin: 5px 5% 5px;
  border: 1px solid blue;

  
}
.nextbtn {
  margin: 5px 5% 5px;
  border: 1px solid blue;

  
}
table {
  height: 100%;
  width: 100%;
}
th {
  border: 1px solid black;
  height: 20%;
  width: 100%;
}
td {
  border: 1px solid black;
}
</style>