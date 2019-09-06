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
  inputText: '';
  outputText: '';

  constructor(private markovService: MarkovService) { }

  ngOnInit() {
    this.markovService.subsrcibe(this.details);
    this.currentGenerator = this.markovService.getGenerator(1); // test
  }

  onAddText(): void {
    this.currentGenerator.addText('Unnamed', this.inputText);
    this.inputText = '';
  }

  onGenerate(): void {
    if (this.currentGenerator.details.wordCount === 0) {
       alert('Generator needs input first');
    }

    this.outputText += this.currentGenerator.generateSentence() + ' ';
  }

}
