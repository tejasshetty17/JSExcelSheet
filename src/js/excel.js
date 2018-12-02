const TABLE = document.getElementById('excel-sheet');

function ExcelSheet(element, rows, columns, data) {
  this.element = element; // elem should be an ID
  this.rows = rows || 90;
  this.columns = columns || 20;
  this.data = data || [];
  this.initializeData = () =>{
    for(let i = 0; i <=this.rows; i++){
        this.data[i] = [];
        for(let j = 0; j <= this.columns; j++){
            this.data[i][j] = '';
        }
    }
  };
  this.initializeData();
}


ExcelSheet.prototype.deleteColumn = function (element) {
    let column = Number(element.id);
    for(let i = 1; i<=excel.rows; i++){
        excel.data[i].splice(column,1);
    }
    excel.columns -= 1;
    excel.render();
}

ExcelSheet.prototype.deleteRow = function(element){
    let row = Number(element.id);
    excel.data.splice(row, 1);
    excel.rows -= 1;
    excel.render();
}

ExcelSheet.prototype.addRow = function() {
    excel.rows += 1;
    for(let ){
        
    }
}

ExcelSheet.prototype.render = function(){
    TABLE.innerHTML = '';
    for(let i = 0; i <= this.rows; i++){
        let row = TABLE.insertRow(i);
        for(let j = 0; j <= this.columns; j++){
            if(i===0 && (j > 0)){
                row.insertCell(j).innerHTML = `<input style="width:88px;" class="excel-column-header" type="text" disabled data-row=${i} data-column=${j} value="${String.fromCharCode(j + 64)}"/><input id="${j}" type="button" class="btn btn-sec delete-column" value="Delete">`;
            } else if (j === 0 && (i > 0)) {
                row.insertCell(j).innerHTML = `<input style="width:88px;" class="excel-row-header" type="text" disabled data-row=${i} data-column=${j} value="${i}"/><input id="${i}" type="button" class="btn btn-sec delete-row" value="Delete">`;
            }else if(i===0 && j===0){
                 row.insertCell(j).innerHTML = `<input type="text" class="excel-header" disabled data-row=${i} data-column=${j} value=""/>`;
            }else{
            row.insertCell(j).innerHTML = `<input class="excel-input" type="text" data-row=${i} data-column=${j} value="${this.data[i][j]}"/>`;
            }
        }
    }
};

ExcelSheet.prototype.initEvent = function(){
 TABLE.addEventListener('click', function(e){
     let element = e.target;
     if(element.classList.contains('delete-row')){
         e.stopPropagation();
         excel.deleteRow(element);
     } else if (element.classList.contains('delete-column')) {
         e.stopPropagation();
         excel.deleteColumn(element);
     }
 });
}

let excel = new ExcelSheet('excel-sheet');
excel.render();
excel.initEvent();


