export default function shuffle(array) {
    let currentIndex = array.length;
    let newArr = [...array]
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArr[currentIndex], newArr[randomIndex]] = [
            newArr[randomIndex], newArr[currentIndex]];
    }
    return newArr;
}