import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  constructor(private router: Router) { }

  questions = {
    title: "Pourquoi voulez-vous un PC ?",
    answers: [
      {
        ans: "Pour le travail (booriiiing)",
        subquestion: {
          title: "Pour quel type de travail ?",
          answers: [
            {
              ans: "Pour du montage vidéo",
            },
            {
              ans: "Pour la suite LibreOffice",
            }
          ]
        }
      },
      {
        ans: "Pour jouer (nerddd)",
        subquestion: {
          title: "A quels jeux de GAMERS voudras-tu jouer ?",
          answers: [
            {
              ans: "Des gros Triple A",
            },
            {
              ans: "Jeux indés pas trop gourmands",
            },
            {
              ans: "N'importe, je vais surtout STREAMER",
            }
          ]
        }
      },
      {
        ans: "Pour de la bureautique (old people)",
      }
    ]
  }

  currentQuestion: any = this.questions;
  currentAnswer: number = -1;
  answersHistory: number[] = [];
  questionsRemaining: number = -1;
  progression: number = 1 / this.questionsRemaining;
  endingScreen = {title: "Quiz terminé !", message: 'Confirmez vos résultats en appuyant ci-dessous.'}

  ngOnInit(): void {
    this.updateProgression()
  }

  onAnswerChange(answer: number){
    this.currentAnswer = answer;
  }

  prevQuestion(){
    if(this.answersHistory.length != 0){
      this.answersHistory.pop();
      var tmp: any = this.questions;
      this.answersHistory.forEach(el=>{
        tmp = tmp.answers[el].subquestion;
      })
      this.currentAnswer = -1;
      this.currentQuestion = tmp;
      this.updateProgression()
    }
  }

  nextQuestion(){
    if(this.currentQuestion.message){
      this.router.navigate(['/']);
    }else if(this.currentAnswer != -1){
      this.answersHistory.push(this.currentAnswer);
      var tmp: any = this.currentQuestion.answers[this.currentAnswer].subquestion;
      if(tmp){
        this.currentQuestion = tmp 
        this.currentAnswer = -1
        this.updateProgression()
      }else if(this.progression != 100){
        this.progression = 100
        this.currentQuestion = this.endingScreen;
      }
    }
  }

  getMaximumRemaining(question: any){
    if(question === undefined) return 0;
    var heights: number[] = [];
    question.answers.forEach((el: any)=>{
      heights.push(this.getMaximumRemaining(el.subquestion));
    })
    return Math.max.apply(null, heights) + 1;
  }

  updateProgression(){
    this.questionsRemaining = this.getMaximumRemaining(this.currentQuestion);
    this.progression = parseInt((100 / (this.questionsRemaining+1))+'')
  }
}
