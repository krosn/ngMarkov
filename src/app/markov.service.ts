import { Injectable } from '@angular/core';

import { MarkovGenerator, MarkovDetails } from './markov/markovGenerator.type';
import { BehaviorSubject, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkovService {
  private markovGenerators: MarkovGenerator[];
  private nextId = 1;
  private markovDetailsSubject = new BehaviorSubject<MarkovDetails[]>([]);

  constructor() {
    this.markovGenerators = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  get storageKey(): string { return 'markovGenerators'; }

  createGenerator(title: string): MarkovGenerator {
    const newDetails: MarkovDetails = {
      title: '',
      id: this.nextId++,
      sourceNames: [],
      wordCount: 0,
      sentenceCount: 0,
      generatedSentences: 0
    };

    const generator = new MarkovGenerator(newDetails);
    this.markovGenerators.push(generator);
    this.update();

    return generator;
  }

  deleteGenerator(id: number): void {
    const index = this.getIndex(id);
    this.markovGenerators.splice(index, 1);
    this.update();
  }

  getGenerator(id: number): MarkovGenerator {
    return this.markovGenerators[this.getIndex(id)];
  }

  subsrcibe(observer: Observer<MarkovDetails[]>) {
    this.markovDetailsSubject.subscribe(observer);
  }

  private getIndex(id: number) {
    const index = this.markovGenerators.findIndex(gen => gen.details.id === id);

    if (index < 0) {
      throw new Error(`Can't find a generator with id ${id}`);
    }

    return index;
  }

  private update() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.markovGenerators));

    this.markovDetailsSubject.next(this.markovGenerators.map(
      gen => gen.details
    ));
  }
}
