import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  constructor(private router: Router) { }

  questions = 
  [
    {
      id: 0,
      name: "purpose",
      next: 1,
      title: "Que veux-tu ?",
      type: "radio",
      answers: [
        {ans: "Un ordinateur fixe", value: "fixe"},
        {ans: "Un ordinateur portable", value: "portable"},
      ]
    },
    {
      id: 1,
      name: "os",
      next: 2,
      title: "Tu veux que ton ordinateur tourne sous :",
      type: "radio",
      answers: [
        {ans: "Windows", value: "windows"},
        {ans: "macOs", value: "macOS"},
        {ans: "Chrome OS", value: "chromeOS"},
        {ans: "Tu le mettas après sous Linux", value: "linux"},
      ]
    },
    {
      id: 2,
      name: "storage",
      next: 3,
      title: "Quel serait le stockage parfait pour toi ?",
      type: "radio",
      answers: [
        {ans: "250Gb", value: "250Gb"},
        {ans: "500Gb", value: "500Gb"},
        {ans: "1Tb", value: "1Tb"},
        {ans: "2Tb", value: "2Tb"},
      ]
    },
    {
      id: 3,
      name: "price",
      next: 4,
      title: "Quel serait ton budget ?",
      type: "radio",
      answers: [
        {ans: "Moins de 500€", value: "moins-500"},
        {ans: "Entre 500€ et 700€", value: "500-700"},
        {ans: "Entre 700€ et 1000€", value: "700-1000"},
        {ans: "Plus de 1000€", value: "1000-plus"},
      ]
    },
    {
      id: 4,
      name: "usage",
      title: "Pourquoi as-tu besoin d'un ordinateur ?",
      type: "radio",
      next: {
        autre: 5, 
        gaming: 6,
      },
      answers: [
        {ans: "Pour tes études en informatique/ingénierie", value: "gaming"},
        {ans: "Pour jouer à des jeux vidéos", value: "gaming"},
        {ans: "Pour stocker tes cours et travailler (twitter aussi)", value: "autre"},
        {ans: "Pour faire du montage photo/vidéo", value: "autre"},
      ]
    },
    {
      id: 5,
      name: "softs",
      next: null,
      title: "Quel logiciel comptes-tu utiliser le plus ?",
      type: "radio",
      answers: [
        {ans: "Atom, Terminal et parfois Photoshop", value: "coding"},
        {ans: "La suite Microsoft : Word, Excel, OneNote, PowerPoint…", value: "office"},
        {ans: "La suite Adobe : Photoshop, Illustrator, Indesign, After Effects…", value: "adobe"},
      ]
    },
    {
      id: 6,
      name: "games",
      next: 7,
      title: "A quel genre de jeux joues-tu ?",
      type: "radio",
      answers: [
        {ans: "Des jeux indé/rétro et peu gourmand, 2D isométrique…", value: "low"},
        {ans: "Des jeux exigeants en 3D, FPS ou MMO", value: "mid"},
        {ans: "Des jeux ultra immersifs dernière génération", value: "high"},
      ]
    },
    {
      id: 7,
      name: "stream",
      next: null,
      title: "Comptes-tu streamer ou screencast ton gameplay ?",
      type: "radio",
      answers: [
        {ans: "Oui", value: "streaming"},
        {ans: "Non", value: undefined},
      ]
    },
  ]

  questionsAnswered = 0;
  currentQuestionId: number = 0;
  currentQuestion: any = this.questions[this.currentQuestionId];
  currentAnswer: any | null = null;
  answersHistory: any[] = [];
  questionsHistory: number[] = [];
  questionsRemaining: number = this.questions.length;
  progression: number = 0;
  endingScreen = {title: "Quiz terminé !", message: 'Confirmez vos résultats en appuyant ci-dessous.'}

  ngOnInit(): void {
    this.updateProgression()
  }

  onAnswerChange(index: number){
    this.currentAnswer = this.currentQuestion.answers[index].value;
  }

  prevQuestion(){
    if(this.questionsAnswered > 0){
      this.questionsAnswered--;
      this.updateProgression();
      this.currentQuestion = this.questions[this.questionsHistory[this.questionsHistory.length-1]]
      this.currentAnswer = this.answersHistory[this.answersHistory.length-1]
      this.questionsHistory.pop()
      this.answersHistory.pop()
    }
  }

  nextQuestion(){
    if(this.currentQuestion == this.endingScreen){
      var final: any = {}
      this.answersHistory.forEach((el: any) =>{
        Object.keys(el).forEach((key: string)=>{
          final[key] = el[key] 
        })
      })
      this.router.navigate(['search'], { queryParams: {tags: JSON.stringify(final)}});
    }else if(this.currentAnswer !== null){
      this.questionsAnswered++;
      this.questionsHistory.push(this.currentQuestion.id)
      var tmp: any = {}
      tmp[this.currentQuestion.name] = this.currentAnswer
      this.answersHistory.push(tmp)
      if(this.currentQuestion.next == null){
        this.currentQuestion = this.endingScreen
        this.updateProgression(true);
      }else{
        this.updateProgression();
        if(typeof this.currentQuestion.next == "number"){
          this.currentQuestion = this.questions.filter((question: any) => question.id == this.currentQuestion.next)[0]
        }else{
          this.currentQuestion = this.questions.filter((question: any) => question.id == this.currentQuestion.next[this.currentAnswer])[0]
        }
        this.currentAnswer = null;
      }
    }
  }

  updateProgression(completed?: boolean){
    if(completed) this.progression = 100;
    else this.progression = Math.round(this.questionsAnswered * 100/ this.questions.length)
  }
}
