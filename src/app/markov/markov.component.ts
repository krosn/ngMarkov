import { Component, OnInit } from '@angular/core';

import { MarkovService } from '../markov.service';
import { BehaviorSubject } from 'rxjs';
import { MarkovDetails, MarkovGenerator } from './markovGenerator.type';

@Component({
  selector: 'app-markov',
  templateUrl: './markov.component.html',
  styleUrls: ['./markov.component.css']
})
export class MarkovComponent implements OnInit {
  details = new BehaviorSubject<MarkovDetails[]>([]);
  currentGenerator: MarkovGenerator;
  inputName = '';
  inputText = '';
  outputText = '';

  constructor(private markovService: MarkovService) { }

  ngOnInit() {
    this.markovService.subsrcibe(this.details);
    this.currentGenerator = this.markovService.getGenerator(1); // test
  }

  onAddText(): void {
    this.currentGenerator.addText(this.inputName, this.inputText);
    this.inputName = this.inputText = '';
  }

  onGenerate(): void {
    if (this.currentGenerator.details.wordCount === 0) {
       alert('Generator needs input first');
    }

    const newSentence = this.currentGenerator.generateSentence();

    this.outputText = `${this.outputText} ${newSentence}`;
  }

}
