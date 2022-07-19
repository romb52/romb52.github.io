

const ships = [],                                     //массив кораблей
    listShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];    //индекс - количество кораблей, число - палубы
let popal = false, turn = 0;
let countAllShips = 0;                                 //посчет подбитых кораблей
const shipsMargin = [];              //массив для записи отступов кораблей в одну клетку



//создание кораблей
const CreateShip = () => {
    for(let i = 0; i < listShips.length; i++){
        randShips(listShips[i])
    }
}

//рандомное расположение кораблей
const randShips = (countPalub) => {
    let randCoord = 0, tempArr = [], randGorVer = 0; 
    let tempArrForMargin = [];
    let tempArrForMarginUn = [];                              //массив для занятых клеток - корабль + отступы
        randCoord = Math.floor(Math.random() * 99);           //первая рандомная координата в диапазоне 0-99
        randGorVer = Math.floor(Math.random() *2);            //гор. или верт. направление постройки корабля
       // console.log(randCoord + ' ' + randGorVer);

        //если горизонтальное расположение
        if(!randGorVer){
            let tempEnd = parseInt(randCoord / 10) * 10 + 9,     //последняя ячейка в строке с выбранной координатой (К1--К10)
            tempStart = randCoord - randCoord % 10 ;              //первая ячейка  в строке с координатой (А1--А10)
           // console.log(tempStart + ' gor ' + tempEnd)

            if((randCoord + (countPalub - 1)) <= tempEnd){
                while(true){
                    if(CheckCoord(randCoord, countPalub, '+')) break;      //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub; j++){
                    tempArr.push(randCoord + j);                      //если прошли проверку - создаем массив для корабля с координатами
                   // console.log(randCoord + ' + ' + countPalub)
                }
            }else if((randCoord - (countPalub - 1)) >= tempStart){
                while(true){                   
                    if(CheckCoord(randCoord, countPalub, '-')) break;    //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub; j++){
                    tempArr.push(randCoord - j);                     //если прошли проверку - создаем массив для корабля с координатами
                   // console.log(randCoord + ' - ' + countPalub)
                }
            }
        }
        //если вертикальное направление
        if(randGorVer){
            let tempEnd,tempStart; 
            tempStart = randCoord % 10; 
            tempEnd = tempStart + 90; 
           // console.log(tempStart + ' ver ' + tempEnd);

            if((randCoord - ((countPalub - 1) * 10)) >= tempStart){
                while(true){
                    if(CheckCoord(randCoord, countPalub, '-')) break;       //проверка не заняты ли уже нужные клетки другими кораблями
                    randCoord = Math.floor(Math.random() * 99);
                }
                for(let j = 0; j < countPalub * 10; j += 10){
                    tempArr.push(randCoord - j);                             //если прошли проверку - создаем массив для корабля с координатами
                    //console.log(randCoord + '-' + countPalub)
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
        
        //console.log('tempArr: ' + tempArr);        

        let j = 0;     //переменная для работы с масивом занятых клеток - корабль и отступы
        for(let i = 0; i < tempArr.length; i++){  
                // console.log(' tempArrForMarginUn:' + tempArrForMarginUn);
                // console.log(' tempArr:' + (tempArr[i]-11) +' '+ (tempArr[i]-10) +' '+ (tempArr[i]-9) +' '+ 
                //                         (tempArr[i]-1) +' '+ (tempArr[i]) +' '+ (tempArr[i]+1) +' '+ 
                //                         (tempArr[i]+9) +' '+ (tempArr[i]+10) +' ' +(tempArr[i]+11)); 

                //погрузись поглубже в чертоги сознания и увидешь логику добавления полей отступа вокруг корабля ))  
                if ((tempArr[i] % 10) && !tempArrForMarginUn.includes(tempArr[i]-11)){tempArrForMarginUn[j++] = tempArr[i]-11;}
                if (!tempArrForMarginUn.includes(tempArr[i]-10)){tempArrForMarginUn[j++] = tempArr[i]-10;}
                if (tempArr[i] % 10 != 9 && !tempArrForMarginUn.includes(tempArr[i]-9)){tempArrForMarginUn[j++] = tempArr[i]-9;}
                if (tempArr[i] % 10  && !tempArrForMarginUn.includes(tempArr[i]-1)){tempArrForMarginUn[j++] = tempArr[i]-1;}
                if (!tempArrForMarginUn.includes(tempArr[i])){tempArrForMarginUn[j++] = tempArr[i];}
                if (tempArr[i] % 10 != 9 && !tempArrForMarginUn.includes(tempArr[i]+1)){tempArrForMarginUn[j++] = tempArr[i]+1;}
                if (tempArr[i] % 10 && !tempArrForMarginUn.includes(tempArr[i]+9)){tempArrForMarginUn[j++] = tempArr[i]+9;}
                if (!tempArrForMarginUn.includes(tempArr[i]+10)){tempArrForMarginUn[j++] = tempArr[i]+10;}
                if (tempArr[i] % 10 != 9 && !tempArrForMarginUn.includes(tempArr[i]+11)){tempArrForMarginUn[j++] = tempArr[i]+11;}
                        
        }
        //отфильтровываем в массиве корабля с отступами все ячейки меньше нуля и больше 99
        tempArrForMarginUn = tempArrForMarginUn.filter(function(x) { return (x > -1 && x < 100); });
       // console.log('uniq sorted ' + tempArrForMarginUn);

        shipsMargin.push(tempArrForMarginUn);   //массив кораблей с отступами
}

//проверка на не занятость нужных клеток. Аргументы - первая клетка, число палуб, направление постройки.
const CheckCoord = (start, count, symbol) => {

    // for(let i = 0; i < shipsMargin.length; i++){        
    //     console.log(shipsMargin[i]);
    //     console.log(shipsMargin[i].includes(start) + ' ' + start);
    // }

    for(let i = 0; i < shipsMargin.length; i++){
        if(symbol == '+'){
           // console.log(start + symbol + count);          //проверка на свободность места; корабль помещается в поле; корабль помещается в строке(столбе)
            for(let c = start; c < start + count; c++){
                if( (start + count) > 99 || shipsMargin[i].includes(c) || ((start + count - 1) > parseInt(start / 10) * 10 + 9) || ((start + ((count - 1) * 10)) > start % 10 + 90)){
                    return false;
                }
            }
        }
        if(symbol == '-'){
            //console.log(start + symbol + count);              //проверка на свободность места; корабль помещается в поле; корабль помещается в строке(столбе)
            for(let c = start; c > start - count; c--){
                if( (start - count) < 0 || shipsMargin[i].includes(c) || ((start - count + 1) < start - start % 10) || ((start - ((count - 1) * 10)) < start % 10)){
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
    console.log('ships:');
    console.log(ships);
    console.log('shipsMargin:');
    console.log(shipsMargin);
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




