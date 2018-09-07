


//массивs для игры
var arrUsers =  [];
var points = [];
var round = 0;
var listGamers = document.getElementById('listGamers');
var maxPoints = 0;


/*функция добавления пользователя в div listGamers.
1. Проверка, указал ли пользователь какое-либо значение в поле ввода.
2. Проверка на уникальность вводимого значения. 
Если проверки пройдены, то вызывается функция создания пользователя(createGamer). 
Очищается поле ввода*/

function addGamerToList (){
  console.log('add gamer...');
  
  var gamer = document.getElementById('gamer');
  var name = gamer.value;

  if ((name == '')|(name == ' ')) {
    alert('Please write a name of new gamer');
  } 
  else {
    if (arrUsers.includes(name)) {
      alert('Please choose another name');
    } else {createGamer(name)};
  document.getElementById('gamer').value = '';
  };
console.log(`end proccess adding gamer ${name}`);
localStorage.setItem('tempNames', arrUsers);
};

/*функция добавления создания пользователя в формате: <li><b>name</b><span onclick:javascript:deleteGamer>delete</span></li>. 
Вызывается из addGamerToList.
Пользователь так же добавляется в массив arrUsers.
Инициализируется функция удаления строки из списка пользвоателей*/
function createGamer(name) {
  var li=document.createElement('li');
  var newGamer = document.createTextNode(name);
  console.log(name);
  arrUsers.push(name);
  li.setAttribute('id', name);
  li.appendChild(newGamer);
  document.getElementById("listGamers").appendChild(li);
  console.log(arrUsers);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  if (arrUsers.length > 1) {
    var b=document.getElementById('startNewGame');
    b.style.display= 'inline-block';
  };
  //добавление действия "удалить" на кнопке "х" в списке имен игроков
  span.setAttribute('onclick', 'javascript:deleteGamer(\''+name+'\')');
}

/* Функция используется в окне создания новой игры.
функция удаляет элемент li по id. ID=имени игрока. 
Так же проверяется, если пользователи в массиве arrUsers. 
Если нет - то кнопка "startNewGame" становится недоступной*/
function deleteGamer(id) {
  console.log(`delete gamer ${id}`);
  let x = document.getElementById(id);
  console.log(x);
  x.style.display = 'none';
  x.remove();
  var n = arrUsers.indexOf(id);
  arrUsers.splice(n, 1);
  console.info(n);
  console.info(`array of users ${arrUsers}`);
  console.info('gamer deleted');
  if (arrUsers.length === 0) {
    let b=document.getElementById('startNewGame');
    b.style.display= 'none';
    console.log('buttom startNewGame disabled...');
  }
}

var createTable = function () {
  var names = localStorage.getItem('tempNames').split(',');
  console.log(`create table...${names}`);

  //создание шапки таблицы  
  let tr=document.createElement('tr');
  //создание первой ячейки первого столбца с символом номер
  let th=document.createElement('th');
  th.className='fc';
  let sn = document.createTextNode('№');
  let b=document.createElement('b');
  b.appendChild(sn); th.appendChild(b); tr.appendChild(th); //создание строки в ДОМ
  console.log('№ created...');

  for (let user of names) {
    let th=document.createElement('th');
    let name = document.createTextNode(user);
    let b=document.createElement('b');
    b.appendChild(name);  th.appendChild(b); tr.appendChild(th); //создание строки в ДОМ
    console.log(`${user} created`)
  }  
  document.getElementById('TableResult').appendChild(tr);
  console.log('top table created...');

  points.length>0? tablePoints() :   console.log(points);

  //создание ряда с итоговыми очками игроков
  let tdt=document.createElement('td');
  let trt=document.createElement('tr');
  tdt.className='fc';
  let tot = document.createTextNode('Tt');
  let bt=document.createElement('b');
  bt.appendChild(tot);  tdt.appendChild(bt);  trt.appendChild(tdt); //создание строки в ДОМ

  for (let user of names) {
    let td0=document.createElement('td');
    td0.id=user;
    let userPoints;
    userPoints = document.createTextNode(0);
    let b0=document.createElement('b');
    b0.appendChild(userPoints);   td0.appendChild(b0);  trt.appendChild(td0); //создание строки в ДОМ
  };
  document.getElementById('rowTotal').appendChild(trt);
  console.log('Total created...');

};

var tablePoints = function (){
  console.log(`Total created...{$points}`);
};

var savedGameLoad =function(){
  //проверка, еси ли что-то во временных файлах
if (localStorage.getItem('tempPoints')) {points=localStorage.getItem('tempPoints')};
console.info(points);
if (localStorage.getItem('tempRound')) {points=localStorage.getItem('tempRound')};
console.info(round);

}

function PopUpShow(window){
  let names = localStorage.getItem('tempNames').split(',');
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
        div.appendChild(label);
        div.appendChild(input);
        document.getElementById('addingPoints').appendChild(div);
        console.log(`${user} input created`);
    } 
  }
  background.style.display = 'inline';
  windowForShow.style.display = 'inline';
}

//Функция скрытия PopUp
function PopUpHide(window){
  let background = document.getElementById('overlay');
  let windowForResult = document.getElementById(window);
  background.style.display = 'none';
  windowForResult.style.display = 'none';
}

function addResults() {
  let names = localStorage.getItem('tempNames').split(',');
  
  round++;
  let tr=document.createElement('tr');
  let td=document.createElement('td');
  td.className='fc';
  let n = document.createTextNode(round);
  td.appendChild(n);
  tr.appendChild(td);
  console.log(`round № ${round}...`);

  var roundPoints=[];

  for (var name of names) {
    let i = document.getElementById(`input${name}`).value;
    roundPoints.push(i);
    console.log(`round points for ${name} is ${i}`);
    let td=document.createElement('td');
    let p = document.createTextNode(i);
    td.appendChild(p);
    tr.appendChild(td);
    console.log(`${p} created`);
    //сброс значений в полях ввода очков
    document.getElementById(`input${name}`).value ='';
  }

  console.log(`points for round ${roundPoints}`);
  console.log(`${points} предыдущее значение`);

  points.push(roundPoints);
  console.log(points);
  document.getElementById('TableResult').appendChild(tr);
  PopUpHide('popupAddResults');
  localStorage.setItem('tempPoints',points);
  localStorage.setItem('tempRound',round);

  console.log(`количество элементов в строке ${points[0].length}`);
  let tot = +0;
  var totalPoints=[];

  for (let j=0; j <= points.length; j++) {
    for (let i=0; i <= points[0].length; i++) {
      console.log(`количество элементов в столбце ${points.length}`);
      console.log(parseInt(points[i][j]));
      tot = tot + parseInt(points[i][j]);
      console.log(tot);
      totalPoints.push(tot);
    }
    };
  console.log(`количество очков игрока ${name} ${tot}`);
  totalPoints.push(tot);
  console.info(`${totalPoints}`);
  userPoints = document.createTextNode(tot);
  let totRow =document.getElementById(name);
  totRow.nodeValue=tot;
}


function saveGameState() {
  if (!supportsLocalStorage()) { return false; }
  localStorage["nameSavigGame"] = gGameInProgress;
  localStorage["arrUsers"] = gArrUsers;
  localStorage["arrPoints"] = gArrPoints;
  localStorage["lastRound"] = gLastRound;
  return true;
}