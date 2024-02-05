<template>
    <div class="container" >
      <div class="greeting">
        <h3>{{ msg }}</h3>
      </div>
      <div class="toolbar" >
        <span>
          Number of questions: 
          <input type="number" v-model="amount" min="1" max="50">
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
      <div class="loader" v-if="loading"></div>
      <div v-if="questions" class="card">
        <div v-html="content" class="table"></div>
        <!-- <table id="questions" v-if="questions" > 
          <div class="questionBox" v-if="questions[editedIndex].choices.length == 2">
            <tr>
              <th colspan="12">QUESTION {{ editedIndex + 1 }} : {{ formattedQuestion(questions[editedIndex].question) }}</th>
            </tr>
            <tr>
              <td colspan="6"> 
                <input type="radio" id="answerA" v-model="answer" :value="questions[editedIndex].choices[0]">
                <label for="answerA">A. {{ formattedQuestion(questions[editedIndex].choices[0]) }}</label>
              </td>
              <td colspan="6">
                <input type="radio" id="answerB" v-model="answer" :value="questions[editedIndex].choices[1]">
                <label for="answerB">B. {{ formattedQuestion(questions[editedIndex].choices[1]) }}</label>
              </td>
            </tr>
          </div>
          <div class="questionBox" v-if="questions[editedIndex].choices.length > 2">
            <tr>
              <th colspan="12">QUESTION {{ editedIndex + 1 }} : {{ formattedQuestion(questions[editedIndex].question) }}</th>
            </tr>
            <tr>
              <td colspan="6"> 
                <input type="radio" id="answerA" v-model="answer" :value="questions[editedIndex].choices[0]">
                <label for="answerA">A. {{ formattedQuestion(questions[editedIndex].choices[0]) }}</label>
              </td>
              <td colspan="6">
                <input type="radio" id="answerB" v-model="answer" :value="questions[editedIndex].choices[1]">
                <label for="answerB">B. {{ formattedQuestion(questions[editedIndex].choices[1]) }}</label>
              </td>
            </tr>
            <tr>
              <td colspan="6"> 
                <input type="radio" id="answerC" v-model="answer" :value="questions[editedIndex].choices[2]">
                <label for="answerC">C. {{formattedQuestion(questions[editedIndex].choices[2]) }}</label>
              </td>
              <td colspan="6">
                <input type="radio" id="answerD" v-model="answer" :value="questions[editedIndex].choices[3]">
                <label for="answerD">D. {{ formattedQuestion(questions[editedIndex].choices[3]) }}</label>
              </td>
            </tr>
          </div>
        </table> -->
      </div>
      <div class="nextbtn" v-if="questions">
        <button @click="nextQuestion()" :disabled="(questions.length - 1) == editedIndex">NEXT >></button>
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
        editedIndex: 0,
        content: ``,
        loading: false,
    }
  },
  methods: {
    nextQuestion(){
      this.editedIndex = this.editedIndex + 1
      console.log('array',this.questions,'index',this.editedIndex)
      this.createContent()     
      console.log('this.content',this.content) 
    },

    test(){
      var form = document.getElementById('form');
      form.addEventListener('submit');
      // console.log('test',document.getElementsByName("answer")[0].value)
      console.log('form',form)
    },  

    async allSet(){
      this.loading = true
        if(this.amount >= 51){
          alert('Number of questions exceed the limit 50')
        }else if(!this.amount || !this.category || !this.difficulty || !this.type){
          alert('Please complete all fields!')
        }else{
          this.questions = ''
          await axios.get(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`)
          .then(async (res) => {
            let newArray = await res.data.results.filter((item)=>{
              let tempArray = [item.correct_answer]
              item.incorrect_answers.filter((item2)=>{
                // tempArray.push(item2.replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&quot;/g, '"'))
                tempArray.push(item2)
              })

              item.choices = item.incorrect_answers.length > 2 ? this.shuffle(tempArray) : ['True', 'False']
              return item
            })

            this.questions = newArray
            this.createContent()

          })
          .catch((err)=>{
            console.log('Too many request',err.code)
            alert('SERVER ERROR: Too many request, please try again')

          })
        }
        // console.log(this.questions)
        this.loading = false

    },  

    createContent(){
      if(this.questions[this.editedIndex].choices.length == 2){
        this.content = `
          <center>
          <table> 
              <tr>
                <th colspan="12" style="border: 1px solid black; height: 20%;">QUESTION ${this.editedIndex + 1} : ${this.formattedQuestion(this.questions[this.editedIndex].question)}</th>
              </tr>
              <tr>
                <td colspan="6" style=" border: 1px solid black"> 
                  <input type="radio" id="answerA" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[0]}">
                  <label for="answerA"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[0]) } </label>
                </td>
                <td colspan="6" style=" border: 1px solid black">
                  <input type="radio" id="answerB" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[1]}">
                  <label for="answerB"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[1]) } </label>
                </td>
              </tr>
          </table>
        </center>
          `
      }else if(this.questions[this.editedIndex].choices.length > 2){
        this.content = `
          <center>
          <table> 
              <tr>
                <th colspan="12" style="border: 1px solid black; height: 20%;">QUESTION ${this.editedIndex + 1} : ${this.formattedQuestion(this.questions[this.editedIndex].question)}</th>
              </tr>
              <tr>
                <td colspan="6" style=" border: 1px solid black"> 
                  <input type="radio" id="answerA" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[0]}">
                  <label for="answerA"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[0]) } </label>
                </td>
                <td colspan="6" style=" border: 1px solid black">
                  <input type="radio" id="answerB" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[1]}">
                  <label for="answerB"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[1]) } </label>
                </td>
              </tr>
              <tr>
                <td colspan="6" style=" border: 1px solid black"> 
                  <input type="radio" id="answerC" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[2]}">
                  <label for="answerC"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[2]) } </label>
                </td>
                <td colspan="6" style=" border: 1px solid black">
                  <input type="radio" id="answerD" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[3]}">
                  <label for="answerD"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[3]) } </label>
                </td>
              </tr>
          </table>
        </center>
          `
      }
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
    formattedQuestion(string) {
      return string.replaceAll('&ldquo;', '"').replaceAll('&rdquo;', '"').replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&lsquo;', "'").replaceAll('&shy;', '').replaceAll('&hellip;', '…');
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
    height: 250px;
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
/* TABLE */
.table {
  height: 220px;
  text-align: center;
  align-items: center;
  align-content: center;
  border: 1px solid yellowgreen;
  margin: 10px;
}
.questionBox {
  margin: 5px 10%;
  width: 80%;
  border: 1px solid red;

}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  margin: auto;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>