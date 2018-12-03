let data = JSON.parse(localStorage.getItem('data'));
let rowLength = Number(localStorage.getItem('rows'));
let columnLength = Number(localStorage.getItem('columns'));
let excel = new ExcelSheet(data, rowLength, columnLength);
const CONTEXTMENU = {
    context: null,
    contextOption: null
};
const MENU = document.querySelector(".menu");
let menuVisible = false;


excel.render();

document.addEventListener('DOMContentLoaded',excel.initEvent);// attaching eventlisteners on DCL

function saveData(){  // function for saving data into localStorage this function is called on every update on the app;
    localStorage.setItem('data',JSON.stringify(excel.data));
    localStorage.setItem('rows',String(excel.rows));
    localStorage.setItem('columns',String(excel.columns));
}

function contextMenuHandler(){
    if(CONTEXTMENU.contextOption === 'Insert Column Left'){
        excel.addColumn('left');
    }else if(CONTEXTMENU.contextOption === 'Insert Column Right'){
        excel.addColumn('right');
    }else if(CONTEXTMENU.contextOption === 'Insert Row Top'){
        excel.addRow('top');
    }else if(CONTEXTMENU.contextOption === 'Insert Row Bottom'){
        excel.addRow('bottom');
    }else if(CONTEXTMENU.contextOption === 'Delete Row'){
        excel.deleteRow(CONTEXTMENU.context);
    }else if(CONTEXTMENU.contextOption === 'Delete Column'){
        excel.deleteColumn(CONTEXTMENU.context);
    }
    saveData();
}

const toggleMenu = command => {
  MENU.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  if((window.innerHeight - top) < 100){
      MENU.style.height = `70px`;
  }
  MENU.style.left = `${left}px`;
  MENU.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if(menuVisible)toggleMenu("hide");
  let element = e.target;
  if(element.classList.contains('menu-option')){
      CONTEXTMENU.contextOption = element.innerText;
      contextMenuHandler();
  }
});

window.addEventListener("contextmenu", e => {
  e.preventDefault();
  const origin = {
    left: e.pageX,
    top: e.pageY
  };
  if (e.target.tagName.toUpperCase() !== 'INPUT') return;
  setPosition(origin);
  CONTEXTMENU.context = e.target;
});