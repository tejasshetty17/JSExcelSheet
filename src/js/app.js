let data = JSON.parse(localStorage.getItem('data'));
let rowLength = Number(localStorage.getItem('rows'));
let columnLength = Number(localStorage.getItem('columns'));
let excel = new ExcelSheet('excel-sheet', data, rowLength, columnLength);
excel.render();
excel.initEvent();
function saveData(){
    localStorage.setItem('data',JSON.stringify(excel.data));
    localStorage.setItem('rows',String(excel.rows));
    localStorage.setItem('columns',String(excel.columns));
}