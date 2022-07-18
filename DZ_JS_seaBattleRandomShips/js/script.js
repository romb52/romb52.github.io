

const ships = [],                                     //массив кораблей
        listShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]    //индекс - количество кораблей, число - палубы
let popal = false, turn = 0;
let countAllShips = 0;                                 //посчет подбитых кораблей

//создание кораблей
const CreateShip = () => {
    for(let i = 0; i < listShips.length; i++){
        randShips(listShips[i])
    }
}

//рандомное расположение кораблей
const randShips = (countPalub) => {
    let randCoord = 0, tempArr = [], randGorVer = 0; 
        randCoord = Math.floor(Math.random() * 99);           //первая рандомная координата в диапазоне 0-99
        randGorVer = Math.floor(Math.random() *2);            //гор. или верт. направление постройки корабля
        //console.log(randCoord + ' ' + randGorVer);

        //если вертикальное расположение
        if(!randGorVer){
            let tempEnd = parseInt(randCoord / 10) * 10 + 9,     //последняя ячейка в строке с выбранной координатой (К1--К10)
            tempStart = randCoord - randCoord % 10 ;              //первая ячейка  в строке с координатой (А1--А10)
            //console.log(tempStart+ ' gor ' +tempEnd)

            if((randCoord + (countPalub - 1)) <= tempEnd){
                while(true){
                    if(CheckCoord(randCoord, countPalub, '+')) break;      //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub; j++){
                    tempArr.push(randCoord + j);                      //если прошли проверку - создаем массив для корабля с координатами
                    //console.log(randCoord + '+' + countPalub)
                }
            }else if((randCoord - (countPalub - 1)) >= tempStart){
                while(true){                   
                    if(CheckCoord(randCoord, countPalub, '-')) break;    //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub; j++){
                    tempArr.push(randCoord - j);                     //если прошли проверку - создаем массив для корабля с координатами
                    //console.log(randCoord + '-' + countPalub)
                }
            }
        }
        //если вертикальное направление
        if(randGorVer){
            let tempEnd,tempStart; 
            tempStart = randCoord % 10; 
            tempEnd = tempStart + 90; 
           // console.log(tempStart + ' ver ' + tempEnd)

            if((randCoord - ((countPalub - 1) * 10)) >= tempStart){
                while(true){
                    if(CheckCoord(randCoord, countPalub, '-')) break;       //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub * 10; j += 10){
                    tempArr.push(randCoord - j);                             //если прошли проверку - создаем массив для корабля с координатами
                   // console.log(randCoord + '-' + countPalub)
                }
            }else if((randCoord + ((countPalub - 1) * 10)) <= tempEnd){
                while(true){
                    if(CheckCoord(randCoord, countPalub, '+')) break;         //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub*10; j+=10){
                    tempArr.push(randCoord + j);                        //если прошли проверку - создаем массив для корабля с координатами
                    //console.log(randCoord + '+' + countPalub)
                }
            }
        }
        ships.push(tempArr)      //добавляем массив корабля в массив кораблей        
}

//проверка на не занятость нужных клеток. Аргументы - первая клетка, число палуб, направление постройки.
const CheckCoord = (start, count, symbol) => {
    for(let i = 0; i < ships.length; i++){
        if(symbol == '+'){
            //console.log(start + symbol + count);
            for(let c = start; c < start + count; c++){
                if(ships[i].includes(c) || (start + count) > 99){
                    return false;
                }
            }
        }
        if(symbol == '-'){
           // console.log(start + symbol + count);
            for(let c = start; c > start - count; c--){
                if(ships[i].includes(c) || (start - count) < 0){
                    return false;
                }
            }
        }
    }
    return true;
}

!turn && CreateShip();

//обработка клика на ячейки
const game = (event) => {
    turn++;
    popal = false;
    for (let i = 0; i < ships.length; i++) {
        lenghtArr(ships[i], event);
    }
    
    if (!popal){
        event.innerHTML = '*';
    }
    console.log(ships)
};

//проверка на попадание в корабль
const lenghtArr = (arr, event) => {
    let temp = (parseInt(event.id.replace('td', ''))), count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === temp) {
            popal = true;
            event.innerHTML = arr[i] = 'X';
            
            for (let j = 0; j < arr.length; j++){
                if(arr[j] == 'X') {
                    count++;
                }
            }
            if(count == arr.length){                                       //подбили все палубы
                countAllShips++;
                document.getElementById('general-status').innerHTML = 
                `Coord: ${temp} KILL! <br /> ` ;
                break;
            }else {
                document.getElementById('general-status').innerHTML =          //подбили не все палубы
                `Coord: ${temp} Shoot! <br />` ;
            }
        }
    }
    if(countAllShips == 10 ){
                document.getElementById('general-status').innerHTML =           //уничтожили все корабли
                `Coord: ${temp} KILL! You win!!! <br /> `;                
            }
};




