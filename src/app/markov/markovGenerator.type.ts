export class MarkovDetails {
    sourceNames: string[];
    wordCount: number;
    sentenceCount: number;
    generatedSentences: number;
}

export class MarkovGenerator {
    details: MarkovDetails;
    id: number;
    rules: Map<string[], string>; // Might need to use single string as key and just concat them
    title: string;

    constructor(title: string, id: number) {
        this.details = new MarkovDetails();
        this.id = id;
        this.title = title;
    }

    addText(sourceName: string, textToAdd: string): void {
        this.details.sourceNames.push(sourceName);

        
    }

    generateSentence(): string {

    }

    private generatePairs(tokens: string[]): string[][] {

    }

    private processSentence(sentence: string): void {

    }
}
