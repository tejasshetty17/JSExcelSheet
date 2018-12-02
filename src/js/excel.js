const TABLE = document.getElementById('excel-sheet');
const ADDROWBUTTON = document.getElementById('add-row');
const ADDCOLUMNBUTTON = document.getElementById('add-column');

function ExcelSheet(element, data, rows, columns) {
    console.log(rows,columns);
  this.element = element; // elem should be an ID
  this.rows = rows || 90;
  this.columns = columns || 20;
  this.data = data || [];
  console.log(this.rows,this.columns);
  this.initializeData = () =>{
    if(data){
        return;
    }
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
    let rowNumber = excel.rows += 1;
    let row = TABLE.insertRow(excel.rows);
    excel.data.push([]);
    excel.data[rowNumber].push([]);
    for(let j = 0; j<=this.columns; j++ ){
        excel.data[rowNumber][j] = '';
        if(j === 0){
            row.insertCell(j).innerHTML = `<input style="width:88px;" class="excel-row-header" type="text" disabled data-row=${rowNumber} data-column=${j} value="${rowNumber}"/><input id="${rowNumber}" type="button" class="btn btn-sec delete-row" value="Delete">`;
        }else{
             row.insertCell(j).innerHTML = `<input class="excel-input" type="text" data-row=${rowNumber} data-column=${j} value="${this.data[rowNumber][j]}"/>`;
        }
    }
}

ExcelSheet.prototype.addColumn = function(){
    excel.columns += 1;
    for(let i = 0; i<=excel.rows; i++){
        excel.data[i].push('');
    }
    excel.render();
}

ExcelSheet.prototype.render = function(){
    TABLE.innerHTML = '';
    for(let i = 0; i <= this.rows; i++){
        let row = TABLE.insertRow(i);
        for(let j = 0; j <= this.columns; j++){
            console.log(excel.data[i][j]);
            if(i===0 && (j > 0)){
                row.insertCell(j).innerHTML = `<input style="width:88px;" class="excel-column-header" type="text" disabled data-row=${i} data-column=${j} value="${String.fromCharCode(j + 64)}"/><input id="${j}" type="button" class="btn btn-sec delete-column" value="Delete">`;
            } else if (j === 0 && (i > 0)) {
                row.insertCell(j).innerHTML = `<input style="width:88px;" class="excel-row-header" type="text" disabled data-row=${i} data-column=${j} value="${i}"/><input id="${i}" type="button" class="btn btn-sec delete-row" value="Delete">`;
            }else if(i===0 && j===0){
                 row.insertCell(j).innerHTML = `<input type="text" class="excel-header" disabled data-row=${i} data-column=${j} value=""/>`;
            }else{
            row.insertCell(j).innerHTML = `<input class="excel-input" type="text" data-row=${i} data-column=${j} value="${excel.data[i][j]}"/>`;
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
         saveData();
     } else if (element.classList.contains('delete-column')) {
         e.stopPropagation();
         excel.deleteColumn(element);
         saveData();
     }
 });
 TABLE.addEventListener('keyup', function(e){
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


