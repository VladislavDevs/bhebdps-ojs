const clearButton = document.getElementById('clearButton');
const textarea = document.getElementById('editor');


const STORAGE_KEY = 'savedText';

function saveTextToLocalStorage() {
    const currentText = textarea.value;
    localStorage.setItem(STORAGE_KEY, currentText);
}

function loadTextFromLocalStorage() {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText !== null) {
        textarea.value = savedText;
    }
}

function clearText() {
    textarea.value = '';
    saveTextToLocalStorage();
}

loadTextFromLocalStorage();
textarea.addEventListener('input', saveTextToLocalStorage);
clearButton.addEventListener('click', clearText);