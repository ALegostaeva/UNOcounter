


//массивs для игры
//структура игры game{cols:
//                  [{name:    , score:[], total:  },
//                   {name:    , score:[], total:  },...]}
var arrUsers =  [];
var round = 0;
var listGamers = document.getElementById('listGamers');
var maxPoints = 0;
var game = {};

/* var game = {
  name ="";
  score="";
  total="";
function(name):
  self.name=name} */



/* После нажатия на кнопку "Start new game" в окне создания игроков создается таблица с игроками.
Из локального хранилища достается архив с именами пользователей.
*/

var createTable = function () {

  console.log('createTable');
  var names = sessionStorage.getItem('tempNames').split(',');

  console.log(game);

  //var zto = localStorage.getItem('game');
  //zfrom = JSON.parse(zto);
  //console.log(zfrom);

  //создание шапки таблицы
  createTableHead(names);

  //если игра была загружена из сохраненных, то добавляем очки в таблицу
  if (game.cols[0].score !== undefined) {
    tablePoints();
  };

  /*создание ряда с итоговыми очками игроков*/
  createTableFooter(names);

  //localStorage.removeItem("tempNames");
};

//функция создания шапки таблицы с именами игроков
var createTableHead = function (names) {
  //создание шапки таблицы  
  let tr=document.createElement('tr');

  //создание первой ячейки первого столбца с символом номер
  let th=document.createElement('th');
  th.className='fc';
  let sn = document.createTextNode('№');
  let b=document.createElement('b');
  b.appendChild(sn); th.appendChild(b); tr.appendChild(th); //создание строки в ДОМ

  //создание массива колонок игры
  game.cols=[];

  //создание первой строки таблицы с именами
  for (let user of names) {
    let th=document.createElement('th');
    let name = document.createTextNode(user);
    let b=document.createElement('b');
    b.appendChild(name);  th.appendChild(b); tr.appendChild(th); 
    game.cols.push({name: user}); //добавление имени в объект game
  };

  document.getElementById('headTableResult').appendChild(tr);//создание строки в ДОМ
}

//функция создания строки с итоговыми очками
var createTableFooter = function(names) {

  let tdt=document.createElement('td');
  let trt=document.createElement('tr');
  trt.className='totals';
  tdt.className='fc';
  let tot = document.createTextNode('Tt');
  let bt=document.createElement('b');
  bt.appendChild(tot);  tdt.appendChild(bt);  trt.appendChild(tdt); //создание строки в ДОМ

  for (let user of names) {
    let td0=document.createElement('td');
    td0.id=user+'tot';
    let userPoints;
    userPoints = document.createTextNode(0);
    let b0=document.createElement('b');
    b0.appendChild(userPoints);   td0.appendChild(b0);  trt.appendChild(td0); //создание строки в ДОМ
  };

  document.getElementById('footerTableResult').appendChild(trt);
}


//функция добавления в таблицу очков, если игра была загружена из сохраненных
var tablePoints = function (){
  console.log(`Total created...${points}`);
};

// функция загрузки сохраненной игры
var savedGameLoad =function(){
  //проверка, есlи ли что-то во временных файлах
  if (localStorage.getItem('tempPoints')) {points=localStorage.getItem('tempPoints')};
  console.info(points);
  if (localStorage.getItem('tempRound')) {points=localStorage.getItem('tempRound')};
  console.info(round);

}

//функция открытия всплывающего окна для добавления очков
function PopUpShow(window){
  let names = sessionStorage.getItem('tempNames').split(',');
  //let names = [];

  /*for (let name of game.cols.name) {
    console.log(name);
  };*/

  let background = document.getElementById('overlay');
  let windowForShow = document.getElementById(window);
  console.log(names);
  if (!document.getElementsByClassName('formFild').length) {
      for (let user of names) {
        let div = document.createElement('div');
        div.className='formFild';
        let label=document.createElement('label');
        label.htmlFor=`input${user}`;
        let nameLabel = document.createTextNode(user);
        label.appendChild(nameLabel);
        let input=document.createElement('input');
        input.type='text';
        input.name=user;
        input.id=`input${user}`;
        input.placeholder='0';
        input.required = true;
        div.appendChild(label);
        div.appendChild(input);
        document.getElementById('addingPoints').appendChild(div);
        console.log(`${user} input created`);
    } 
  }
  background.style.display = 'inline';
  windowForShow.style.display = 'inline';
}


//Функция скрытия PopUp "Add results"
function PopUpHide(window){
  let background = document.getElementById('overlay');
  let windowForResult = document.getElementById(window);
  background.style.display = 'none';
  windowForResult.style.display = 'none';
}


//функция добавления результатов из всплывающего окна в таблицу
function addResults() {
  let names = sessionStorage.getItem('tempNames').split(',');
  
  //счетчик текущего раунда

  round++;
  let tr=document.createElement('tr');
  let td=document.createElement('td');
  td.className='fc';
  let n = document.createTextNode(round);
  td.appendChild(n);
  tr.appendChild(td);
  console.log(`round № ${round}...`);


  // счетчик для cols в объекте score
  d = 0;

  for (var name of names) {
    let points = document.getElementById(`input${name}`).value;
    //проверка ввода пользователя. 
    //Если ничего не введено, то автоматически добавляется 0. 
    //Если введено слово, то выдаст ошибки и сбросит ввод.
    points = checkValuePoints(points,name);
    console.log(points);

    //добавление в объект game записи очков для каждого пользователя
    if (game.cols[d].score == undefined) {
      game.cols[d].score = [];
      game.cols[d].total = 0;
    }

    //добавление в объект game очков ДАННОГО РАУНДА  для каждого пользователя
    game.cols[d].score.push(points);
    game.cols[d].total = parseInt(game.cols[d].total) + parseInt(points);

    //переписываение строки тотал с новым значением
    let totString = document.getElementById(`${name}tot`);
    let oldtot = totString.firstElementChild;
    let b = document.createElement('b');
    let tot= document.createTextNode(game.cols[d].total);
    b.appendChild(tot);    totString.replaceChild(b,oldtot);

    console.log(game);

    //увеличение счетчика
    d++;

    //добавление строки с очками в ДОМ
    let td=document.createElement('td');
    let p = document.createTextNode(points);
    td.appendChild(p);    tr.appendChild(td);

    //сброс значений в полях ввода очков
    document.getElementById(`input${name}`).value ='';
  }


  document.getElementById('bodyTableResult').appendChild(tr);
  
  PopUpHide('popupAddResults');


  localStorage.setItem('tempRound',round);
  let gameJSON = JSON.stringify(game);
  localStorage.setItem('game',gameJSON);
}

var checkValuePoints = function(points, name) {
  if ((points == '')|(points == ' ')) {
    console.log('пользователь не ввел количество очков');
    return points=0;
  } else {
    if (isNaN(points)) {
      console.log('пользователь ввел недопустимые символы');
      document.getElementById(`input${name}`).value ='';
      alert('Please write a numbers of points');
      return points = 0;
    } else {return points};
  };
}

//функция сохранения игры
function saveGameState() {
  if (!supportsLocalStorage()) { return false; }
  localStorage["nameSavigGame"] = gGameInProgress;
  localStorage["arrUsers"] = gArrUsers;
  localStorage["lastRound"] = gLastRound;
  return true;
}