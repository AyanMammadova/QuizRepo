const quizData = [
    {
      question: "JavaScript hansı il icad olunub?",
      choices: ["1993", "1995", "1996", "2000"],
      correct: "1995",
    },
    {
      question: "HTML nə deməkdir?",
      choices: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperLoop Machine Language",
        "HyperText Main Language",
      ],
      correct: "HyperText Markup Language",
    },
    {
      question: "CSS nə üçün istifadə olunur?",
      choices: [
        "Strukturlaşdırma",
        "Stil vermə",
        "Məntiq qurma",
        "Məlumat saxlama",
      ],
      correct: "Stil vermə",
    },
    {
      question: "JavaScript-də hansı məlumat növü mövcuddur?",
      choices: ["String", "Number", "Boolean", "Hamısı"],
      correct: "Hamısı",
    },
    {
      question: "HTML-də bir düymə necə yaradılır?",
      choices: ["<button>", "<btn>", "<input>", "<düymə>"],
      correct: "<button>",
    },
    {
      question: "CSS-də necə rəng təyin etmək olar?",
      choices: ["color", "background-color", "font-color", "Hamısı"],
      correct: "Hamısı",
    },
    {
      question: "JavaScript-də DOM nə üçün istifadə olunur?",
      choices: ["Strukturlaşdırma", "Dinamik məzmun", "Əlaqə", "Bilmədim"],
      correct: "Dinamik məzmun",
    },
    {
      question: "JavaScript-də necə funksiya elan edilir?",
      choices: [
        "function myFunc()",
        "def myFunc()",
        "function:myFunc()",
        "fun myFunc()",
      ],
      correct: "function myFunc()",
    },
    {
      question: "CSS-də 'flexbox' nə üçün istifadə olunur?",
      choices: [
        "Elementlərin düzülüşünü idarə etmək",
        "Fon şəkli əlavə etmək",
        "Şriftin ölçüsünü dəyişmək",
        "Elementin görünməsini idarə etmək",
      ],
      correct: "Elementlərin düzülüşünü idarə etmək",
    },
    {
      question: "JavaScript-də 'for' dövrü nə üçün istifadə olunur?",
      choices: [
        "Dəyişən elan etmək",
        "Funksiya çağırmaq",
        "Döngü yaratmaq",
        "Array yaratmaq",
      ],
      correct: "Döngü yaratmaq",
    },
    {
      question: "HTML-də hansı başlıq elementi ən böyükdür?",
      choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
      correct: "<h1>",
    },
    {
      question: "JavaScript-də hansı işarə məntiqi 'və' əməliyyatını göstərir?",
      choices: ["&&", "||", "==", "!="],
      correct: "&&",
    },
    {
      question: "CSS-də 'margin' nə üçün istifadə olunur?",
      choices: [
        "Elementin daxilində boşluq yaratmaq",
        "Elementin xaricində boşluq yaratmaq",
        "Fon rəngini dəyişmək",
        "Mətnin rəngini dəyişmək",
      ],
      correct: "Elementin xaricində boşluq yaratmaq",
    },
    {
      question: "JavaScript-də 'NaN' nə deməkdir?",
      choices: ["Number and Null", "Not a Number", "Null and NaN", "Not a Null"],
      correct: "Not a Number",
    },
    {
      question:
        "HTML-də şəkil əlavə etmək üçün hansı elementdən istifadə olunur?",
      choices: ["<img>", "<src>", "<pic>", "<image>"],
      correct: "<img>",
    },
];

let startBtn=document.getElementById('start-btn')
let stopBtn=document.getElementById('stop-btn')
let continueBtn=document.getElementById('continue-btn')
let nextBtn=document.getElementById('next-btn')
let questionelement=document.getElementById('question')
let choiceselement=document.getElementById('choices')
let time=document.getElementById('time')
let result=document.getElementById("result")
let quiz=document.getElementById("quiz")

let timer
let lefttime=11
function countdown(){
  if(lefttime>0){
    lefttime--
    time.textContent=lefttime
  }
  else{
    nextQuestion()
  }

}

let correctanswers=0
let wronganswers=0
function showQuiz(id){
  questionelement.innerHTML=''
    const currentquestion=quizData[id]
    questionelement.innerHTML=currentquestion.question
    let choiceskod=''
    currentquestion.choices.forEach((choice,index)=>{
      const escapedChoice = choice.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      choiceskod += `<button class="buttons"  id="${escapedChoice}" onclick="chosenChoice(${id}, '${escapedChoice}')">${escapedChoice}</button>`
    })
    choiceselement.innerHTML=choiceskod 

}
function chosenChoice(index,chosenc){ 
  let buttons=document.querySelectorAll(".buttons")

  buttons.forEach(button=>{
    if(button.textContent==chosenc){
      if(chosenc==quizData[index].correct){
        button.style.backgroundColor= "blue"
        correctanswers+=1
      }
      else{
        button.style.backgroundColor= "red"
        wronganswers+=1
      }
    }
    else{
      button.style.backgroundColor="gray"}
  }) 
  console.log('sehv ' +wronganswers)
  console.log('duz ' +correctanswers)
  setTimeout(()=>{
    nextQuestion()
  }
  ,1000)
}

function stopQuiz(){
  clearInterval(timer)
  continueBtn.style.display='inline-block'
}
function continueQuiz(){
  continueBtn.style.display='none'
  timer = setInterval(countdown, 1000)
}
let currentid=0
 
function  startQuiz(){
  showQuiz(currentid)
  timer = setInterval(countdown, 1000)
    startBtn.style.display="none"
    stopBtn.style.display='inline-block'
    nextBtn.style.display='inline-block'
    countdown()

}
function nextQuestion(){
  clearInterval(timer)
  lefttime=10
  time.textContent=lefttime
  currentid++

  if(currentid<quizData.length){
    showQuiz(currentid)
    timer=setInterval(countdown,1000)
  }
  else{
    let score=correctanswers*100
    quiz.style.display="none"
    result.style.display="block"
    result.innerHTML=`
      <h2>Nəticəniz:</h2>
      <p id="score"> Siz ${score}/1500 bal topladınız</p>
      <button onclick="restartQuiz()">Quizə Yenidən Başla</button>
    `
  }
}

function restartQuiz(){
  continueBtn.style.display='none'
  result.style.display="none"
  quiz.style.display="block"
  currentid=0
  correctanswers=0
  wronganswers=0
  lefttime=11
  time.textContent=lefttime
  startQuiz(currentid)
  startBtn.style.display="none"
  stopBtn.style.display='inline-block'
  nextBtn.style.display='inline-block'
  countdown()
}