import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkovService {
  private markovGenerators: MarkovGenerator[];
  private nextId = 1;

  constructor() {
    this.markovGenerators = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  get storageKey(): string { return 'markovGenerators'; }

  createGenerator(title: string): MarkovGenerator {
    const newDetails: MarkovDetails = {
      sourceFiles: [],
      wordCount: 0,
      sentenceCount: 0,
      generatedSentences: 0
    };

    this.markovGenerators.push({ details: newDetails, id: this.nextId++ })
  }

  deleteGenerator(id: number): void {

  }

  getGenerator(id: number): MarkovGenerator {

  }
}
