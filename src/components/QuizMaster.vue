<template>
    <div class="container" >
      <div class="greeting">
        <h3>{{ msg }}</h3>
      </div>
      <h6>MichaelJoe4Yuren&Yumi</h6>

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
        <button @click="allSet()" v-if="results == false && questions == ''">ALL SET!</button>
        <button @click="allSet()" v-if="results == false && questions != ''">REFRESH</button>
        <button @click="allSet()" v-if="results == true">TRY AGAIN!</button>
      </div>
      <div class="loader" v-if="loading"></div>
      <div v-if="questions" class="card">
        <center>
          <table v-if="questions && questions.length > editedIndex && results == false"> 
              <tr>
                <th colspan="12" style="background-color: beige; border: 1px dashed black;text-align: center; height: 95px;">QUESTION {{editedIndex + 1}} : {{ formattedQuestion(questions[editedIndex].question) }}</th>
              </tr>
              <tr>
                <td colspan="6" style="background-color: rgb(255, 255, 243); border: 1px dashed black; height: 30px; flex-wrap: wrap;"> 
                  <input type="radio" id="answerA" v-model="answer" name="answer" :value="questions[editedIndex].choices[0]">
                  <label for="answerA"> <a v-if="questions[editedIndex].choices.length > 2">A.</a> {{ formattedQuestion(questions[editedIndex].choices[0]) }} </label>
                </td>
              </tr>
              <tr>
                <td colspan="6" style="background-color: rgb(255, 255, 243); border: 1px dashed black; height: 30px; flex-wrap: wrap;">
                  <input type="radio" id="answerB" v-model="answer" name="answer" :value="questions[editedIndex].choices[1]">
                  <label for="answerB"> <a v-if="questions[editedIndex].choices.length > 2">B.</a> {{ formattedQuestion(questions[editedIndex].choices[1]) }} </label>
                </td>
              </tr>
              <tr v-if="questions[editedIndex].choices.length > 2">
                <td colspan="6" style="background-color: rgb(255, 255, 243); border: 1px dashed black; height: 30px; flex-wrap: wrap;"> 
                  <input type="radio" id="answerC" v-model="answer" name="answer" :value="questions[editedIndex].choices[2]">
                  <label for="answerC"> <a>C.</a> {{ formattedQuestion(questions[editedIndex].choices[2]) }} </label>
                </td>
              </tr>
              <tr v-if="questions[editedIndex].choices.length > 2">
                <td colspan="6" style="background-color: rgb(255, 255, 243); border: 1px dashed black; height: 30px; flex-wrap: wrap;">
                  <input type="radio" id="answerD" v-model="answer" name="answer" :value="questions[editedIndex].choices[3]">
                  <label for="answerD"> <a>D.</a> {{ formattedQuestion(questions[editedIndex].choices[3]) }} </label>
                </td>
              </tr>
          </table>
          <table v-if="results == true"> 
              <tr>
                <th colspan="12" style="background-color: beige; border: 1px dashed black;text-align: center; height: 20px;">Questions</th>
                <th colspan="6" style="background-color: beige; border: 1px dashed black;text-align: center; height: 20px;">Correct Answer</th>
                <th colspan="6" style="background-color: beige; border: 1px dashed black;text-align: center; height: 20px;">Your Answer</th>
              </tr>
              <tr v-for="(item,i) in questions" :key="i">
                <th colspan="12" style="background-color: rgb(255, 255, 243); border: 1px dashed black;text-align: center; height: 95px;">{{i + 1}}. {{ formattedQuestion(item.question) }}</th>
                <td colspan="6" style="background-color: rgb(143, 253, 107); border: 1px dashed black;text-align: center; height: 30px; flex-wrap: wrap;">{{ formattedQuestion(item.correct_answer) }}</td>
                <td colspan="6" :style="item.correct_answer == item.user_answer ? 'background-color: rgb(143, 253, 107); border: 1px dashed black;text-align: center; height: 30px; flex-wrap: wrap;' : 'background-color: rgb(253, 107, 107); border: 1px dashed black;text-align: center; height: 30px; flex-wrap: wrap;'">{{ formattedQuestion(item.user_answer) }}</td>
              </tr>
          </table>
          <div v-if="questions.length == editedIndex && results == false" class="score">
            <h3>Your Score:</h3>
            <h1>{{ score }} / {{ questions.length }}</h1>
          </div>
        </center>
      </div>
      <div class="nextbtn" v-if="questions">
        <button @click="nextQuestion()" v-if="questions.length > editedIndex">NEXT >></button>
        <button @click="checkResult()" v-if="questions.length == editedIndex && results == false">CHECK RESULT</button>
      </div>
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
        score: '',
        particlesInit: '',
        particlesLoaded: '',
        results: false,
    }
  },
  methods: {
    checkResult(){
      this.results = true;
    },

    nextQuestion(){
      if(this.questions.length >= this.editedIndex){
        this.questions[this.editedIndex].user_answer = this.answer
        this.editedIndex = this.editedIndex + 1
        if(this.questions.length == this.editedIndex){
          //exclude
          this.content = ''
          this.answer = ''
          let results = this.questions.filter(res=> res.correct_answer == res.user_answer)
          this.score = results.length
          return false
        }else{
          // this.createContent()     
          this.answer = ''
        }
      }else if(this.questions.length == this.editedIndex){
        //exclude
        this.editedIndex = this.editedIndex + 1
        this.answer = ''
        return false
      }
    },

    test(){
      var form = document.getElementById('form');
      form.addEventListener('submit');
      // console.log('test',document.getElementsByName("answer")[0].value)
      // console.log('form',form)
    },  

    async allSet(){
      this.results = false
      this.loading = true
      this.questions = ''
      this.score = ''
      this.editedIndex = 0
      this.answer = ''
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

              item.choices = item.incorrect_answers.length > 2 ? this.shuffle(tempArray) : ['True', 'False']
              return item
            })

            this.questions = newArray
            // this.createContent()

          })
          .catch((err)=>{
            console.log('Too many request',err.code)
            alert('SERVER ERROR: Too many request, refesh the page and please try again')

          })
        }
        // console.log(this.questions)
        this.loading = false

    },  
    handleRadioChange(event) {
      // console.log('event',event,'answer',this.answer)
      this.answer = event;
    },
    // createContent(){
    //   if(this.questions[this.editedIndex].choices.length == 2){
    //     this.content = `
    //       <center>
    //       <table> 
    //           <tr>
    //             <th colspan="12" style="border: 1px solid black; height: 20%;">QUESTION ${this.editedIndex + 1} : ${this.formattedQuestion(this.questions[this.editedIndex].question)}</th>
    //           </tr>
    //           <tr>
    //             <td colspan="6" style=" border: 1px solid black"> 
    //               <input type="radio" id="answerA" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[0]}">
    //               <label for="answerA"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[0]) } </label>
    //             </td>
    //             <td colspan="6" style=" border: 1px solid black">
    //               <input type="radio" id="answerB" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[1]}">
    //               <label for="answerB"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[1]) } </label>
    //             </td>
    //           </tr>
    //       </table>
    //     </center>
    //       `
    //   }else if(this.questions[this.editedIndex].choices.length > 2){
    //     this.content = `
    //       <center>
    //       <table> 
    //           <tr>
    //             <th colspan="12" style="border: 1px solid black; height: auto;">QUESTION ${this.editedIndex + 1} : ${this.formattedQuestion(this.questions[this.editedIndex].question)}</th>
    //           </tr>
    //           <tr>
    //             <td colspan="6" style=" border: 1px solid black"> 
    //               <input type="radio" id="answerA" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[0]}">
    //               <label for="answerA"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[0]) } </label>
    //             </td>
    //             <td colspan="6" style=" border: 1px solid black">
    //               <input type="radio" id="answerB" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[1]}">
    //               <label for="answerB"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[1]) } </label>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td colspan="6" style=" border: 1px solid black"> 
    //               <input type="radio" id="answerC" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[2]}">
    //               <label for="answerC"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[2]) } </label>
    //             </td>
    //             <td colspan="6" style=" border: 1px solid black">
    //               <input type="radio" id="answerD" v-model="answer" name="answer" :value="${this.questions[this.editedIndex].choices[3]}">
    //               <label for="answerD"> ${ this.formattedQuestion(this.questions[this.editedIndex].choices[3]) } </label>
    //             </td>
    //           </tr>
    //       </table>
    //     </center>
    //       `
    //   }
    // },
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
      // console.log('Successfully Set')
    },
    getLsData(name){
      return JSON.parse(localStorage.getItem(name));
    },
    formattedQuestion(string) {
      return string.replaceAll('&ldquo;', '"').replaceAll('&rdquo;', '"').replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&lsquo;', "'").replaceAll('&shy;', '').replaceAll('&hellip;', '…').replaceAll('&Eacute;', 'É').replaceAll('&eacute;', 'é');
    },
  },
  
  mounted() {
    // this.forMount();
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
  border-radius: 15px;
  text-shadow:  0px 0px 10px aqua,
                0px 0px 20px aqua,
                0px 0px 40px aqua,
                0px 0px 80px aqua;
  /* border: 1px solid blue; */
  height: 25px;
  margin-top: 15px;
  margin-bottom: -15px;

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
    border: 1px dashed grey;
    background-color: beige;

}
span {
  margin: 5px;
}
.card {
    height: 250px;
    /* border:1px solid red; */
}
.setbtn {
  margin: 5px 5% 5px;
  /* border: 1px solid blue; */

  
}
.nextbtn {
  margin: 5px 5% 5px;
  /* border: 1px solid blue; */
}
/* TABLE */
.table {
  height: 220px;
  text-align: center;
  align-items: center;
  align-content: center;
  /* border: 1px solid yellowgreen; */
  margin: 10px;
}
.questionBox {
  margin: 5px 10%;
  width: 80%;
  /* border: 1px solid red; */

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