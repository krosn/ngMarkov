import { sample } from 'lodash';

export class MarkovDetails {
    id: number;
    title: string;
    sourceNames: string[];
    wordCount: number;
    sentenceCount: number;
    generatedSentences: number;
}

export class MarkovGenerator {
    details: MarkovDetails;
    maxSentenceLength = 30;
    rank = 2;
    private rules = new Map<string, string[]>();
    private starters: string[][];

    constructor(details: MarkovDetails) {
        this.details = (details !== null) ? details : new MarkovDetails();
        this.starters = [];
    }

    private get endToken(): string { return '###END###'; }

    addText(sourceName: string, textToAdd: string): void {
        this.details.sourceNames.push(sourceName);

        const sentences: string[] = this.sentencesFromText(textToAdd);

        for (const sentence of sentences) {
            this.processSentence(sentence);
        }

        console.log(this.starters);
        console.log(this.rules);
    }

    generateSentence(): string {
        const window = sample(this.starters);
        let sentence = window.join(' ');

        for (let index = 0; index < this.maxSentenceLength - this.rank; index++) {
            const combinedWords = this.combineWordsForRule(window);

            if (!this.rules.has(combinedWords)) {
                break;
            }

            const newWord = sample(this.rules[combinedWords]);

            if (newWord === this.endToken || newWord === undefined) {
                break;
            }

            // TODO: Spacing logic to deal with punctuation
            sentence += newWord;

            // Cycle in new word
            window.shift();
            window.push(newWord);
        }

        this.details.sentenceCount += 1;

        return sentence;
    }

    private combineWordsForRule(words: string[]): string {
        return words.join('#');
    }

    private processSentence(sentence: string): void {
        const words = this.wordsFromSentence(sentence);

        // If there aren't enough words, just skip this sentence
        if (words.length < this.rank) {
            return;
        }

        const window: string[] = words.slice(0, this.rank);
        this.starters.push(window);

        let index = this.rank;

        do {
            const word = words[index];

            window.shift();
            window.push(word);
            const windowCombined = this.combineWordsForRule(window);

            if (index === words.length - 1) {
                // Add the end token as an option to follow the sequence of words in window
                this.setDefault(this.rules, windowCombined, []).push(this.endToken);
            } else {
                // Add the next word as an option to follow the sequence of words in window
                this.setDefault(this.rules, windowCombined, []).push(words[index + 1]);
            }

            index += 1;
        } while (index < words.length);
    }

    private setDefault<Tkey, Tval>(map: Map<Tkey, Tval>, key: Tkey, defaultVal: Tval): Tval {
        if (!map.has(key)) {
            map.set(key, defaultVal);
        }

        return map.get(key);
    }

    private sentencesFromText(text: string): string[] {
        // TODO: See if there is a natural language tool for JS
        // or redo this to call some back-end
        const sentences = text.match(/[^\.!\?]+([\.!\?]+|$)+/g);
        return sentences;
    }

    private wordsFromSentence(sentence: string): string[] {
        const words: string[] = sentence.split(' ');
        this.details.wordCount += words.length;
        return words;
    }
}
