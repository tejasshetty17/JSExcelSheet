const TABLE = document.getElementById('excel-sheet');
const ADDROWBUTTON = document.getElementById('add-row');
const ADDCOLUMNBUTTON = document.getElementById('add-column');

function ExcelSheet(data, rows, columns) {
  this.rows = rows || 50;
  this.columns = columns || 10;
  this.data = data || [];
  this.initializeData = () =>{
    if(this.data.length > 0){
        return;  // return if data exists in localStorage
    }
    for(let i = 0; i <=this.rows; i++){
        this.data[i] = [];
        for(let j = 0; j <= this.columns; j++){  // else initialize with empty string
            this.data[i][j] = '';
        }
    }
  };
  this.initializeData();
}


ExcelSheet.prototype.deleteColumn = function (element) {  // adding commom functions to prototype to prevent memory inefficiency
    let column = element.getAttribute('data-column');
    for(let i = 1; i<=excel.rows; i++){
        excel.data[i].splice(column,1);
    }
    excel.columns -= 1;
    excel.render();
}

ExcelSheet.prototype.deleteRow = function(element){
    let row = Number(element.getAttribute("data-row"));
    excel.data.splice(row, 1);
    excel.rows -= 1;
    excel.render();
}

ExcelSheet.prototype.addRow = function(addTo) {
    let rowNumber = excel.rows += 1;
    if(addTo === 'top'){
        rowNumber = Number(CONTEXTMENU.context.getAttribute("data-row"));
    }else if(addTo === 'bottom'){
        rowNumber = Number(CONTEXTMENU.context.getAttribute("data-row")) + 1;
    }
    excel.data.splice(rowNumber,0,[]);
    excel.data[rowNumber].push([]);
    for(let j = 0; j<=this.columns; j++ ){
        excel.data[rowNumber][j] = '';
    }
    excel.render();
}

ExcelSheet.prototype.addColumn = function(addTo){
    let columnNumber = excel.columns += 1;
    if (addTo === 'left') {
         columnNumber = Number(CONTEXTMENU.context.getAttribute("data-column"));
    } else if (addTo === 'right') {
         columnNumber = Number(CONTEXTMENU.context.getAttribute("data-column")) + 1;
    }
    for(let i = 0; i<=excel.rows; i++){
        excel.data[i].splice(columnNumber,0,'');
    }
    excel.render();
}

ExcelSheet.prototype.render = function(){
    TABLE.innerHTML = '';
    for(let i = 0; i <= this.rows; i++){
        let row = TABLE.insertRow(i);
        for(let j = 0; j <= this.columns; j++){
            if(i===0 && (j > 0)){
                row.insertCell(j).innerHTML = `<input class="excel-column-header" type="text" disabled data-row=${i} data-column=${j} value="${String.fromCharCode(j + 64)}"/>`;
            } else if (j === 0 && (i > 0)) {
                row.insertCell(j).innerHTML = `<input class="excel-row-header" type="text" disabled data-row=${i} data-column=${j} value="${i}"/>`;
            }else if(i===0 && j===0){
                 row.insertCell(j).innerHTML = `<input style="background-color: #eee;" type="text" class="excel-header" disabled data-row=${i} data-column=${j} value=""/>`;
            }else{
            row.insertCell(j).innerHTML = `<input class="excel-input" type="text" data-row=${i} data-column=${j} value="${excel.data[i][j]}"/>`;
            }
        }
    }
};

ExcelSheet.prototype.initEvent = function(){
 TABLE.addEventListener('keyup', function(e){  // event handler for saving on every key stroke, could be further improved to save after every 3 or 4 keystrokes.
     e.stopPropagation();
     let element = e.target;
     let row = element.getAttribute("data-row");
     let column = element.getAttribute('data-column');
     excel.data[row][column] = element.value;
     saveData();
 });
 ADDROWBUTTON.addEventListener('click',function(e){
     e.stopPropagation();
    excel.addRow();
    saveData();
 });
 ADDCOLUMNBUTTON.addEventListener('click', function (e) {
     e.stopPropagation();
     excel.addColumn();
     saveData();
 });
}


