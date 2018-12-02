let data = JSON.parse(localStorage.getItem('data'));
let rowLength = Number(localStorage.getItem('rows'));
let columnLength = Number(localStorage.getItem('columns'));
let excel = new ExcelSheet(data, rowLength, columnLength);

excel.render();

document.addEventListener('DOMContentLoaded',excel.initEvent);// attaching eventlisteners on DCL

function saveData(){  // function for saving data into localStorage this function is called on every update on the app;
    localStorage.setItem('data',JSON.stringify(excel.data));
    localStorage.setItem('rows',String(excel.rows));
    localStorage.setItem('columns',String(excel.columns));
}