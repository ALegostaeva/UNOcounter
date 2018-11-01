
//массивs для игры

var listGamers = document.getElementById('listGamers');
var game = {};

/* добавление пользователя по клику мыши на кнопку "add gamer to the list" 
или по нажатию на кнопку enter */

window.addEventListener('DOMContentLoaded', function(event) {
    
    let add = document.getElementById('addNewUser');
    add.addEventListener('click', function (event) {
        console.log('mouse clicked');
        addGamerToList();
    });

    let input = document.getElementById('gamer');
    input.addEventListener('keydown', function(event){
        if(event.which == 13) {
            console.log('enter pressed');
            addGamerToList();
        }
    });

});

/*функция добавления пользователя в div listGamers.
1. Проверка, указал ли пользователь какое-либо значение в поле ввода.
2. Проверка на уникальность вводимого значения. 
Если проверки пройдены, то вызывается функция создания пользователя(createGamer). 
Очищается поле ввода*/

console.time("addGamerToList");


function addGamerToList () {

    console.log('function addGamerToList has started');

    let name = document.getElementById('gamer').value;
  
    if ((name == '')|(name == ' ')) {
      alert('Please write a name of new gamer');
    } else {
      if (arrUsers.includes(name)) {
        alert('Please choose another name');
      } else {createGamer(name)};
    document.getElementById('gamer').value = '';
    };
  
    console.log(`add to list ${arrUsers}`);

    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('tempNames', arrUsers);
        console.log(`${Date.now().toString()} saved ${arrUsers}`);
      } else {
        alert('Sorry, there were technical problems. Your browser does not support local storage. Please, try to open the game in another browser.')
        console.log(`No Web Storage support`);
      }
  };

  console.timeEnd("addGamerToList");


  
  
  /*функция добавления создания пользователя в формате: <li><b>name</b><span onclick:javascript:deleteGamer>delete</span></li>. 
  Вызывается из addGamerToList.
  Пользователь так же добавляется в массив arrUsers.
  Инициализируется функция удаления строки из списка пользователей*/
  
function createGamer(name) {
    let li=document.createElement('li');
    let newGamer = document.createTextNode(name);
    arrUsers.push(name);
    li.setAttribute('id', name);
    li.appendChild(newGamer);
    document.getElementById("listGamers").appendChild(li);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    if (arrUsers.length > 1) {
      let b=document.getElementById('startNewGame');
      b.style.display= 'inline-block';
    };
  
    //добавление действия "удалить" на кнопке "х" в списке имен игроков
    span.setAttribute('onclick', 'javascript:deleteGamer(\''+name+'\')');
    console.log(`after creating ${arrUsers}`);
};
  
  
  
  /* Функция используется в окне создания новой игры.
  функция удаляет элемент li по id. ID=имени игрока. 
  Так же проверяется, если пользователи в массиве arrUsers. 
  Если нет - то кнопка "startNewGame" становится недоступной*/
  
function deleteGamer(id) {
    console.log(`delete gamer ${id}`);
    let x = document.getElementById(id);
    x.style.display = 'none';
    x.remove();
    let n = arrUsers.indexOf(id);
    arrUsers.splice(n, 1);
  
    if (arrUsers.length === 0) {
      let b=document.getElementById('startNewGame');
      b.style.display= 'none';
    };
  
    saveToStorage(arrUsers);
    console.log(`after delete ${arrUsers}`);
};
