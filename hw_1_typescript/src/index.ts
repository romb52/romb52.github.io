const word: string = 'hello world';
const arr: string[] = [];

console.log(word);

function getWord(word: string): string {
    return word;

}
console.log(getWord('1'));

function noth(): void {
    const a: number = 1;
    const b: number = 2;
    console.log(a + b);
}

noth();

interface IBook {
    title: string;
    count: number;
    isExist: boolean;
}

const obj:IBook = { title: 'Book', count: 1, isExist: true }
const booksArray: IBook[]=[obj ];