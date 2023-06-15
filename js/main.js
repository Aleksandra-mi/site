let tableAll = document.getElementsByTagName("table")[0];
let head = tableAll.rows[0];
//alert(head.outerHTML);
let button_sort = document.getElementById("sortButton");
let button_filter = document.getElementById("filterButton");

let sort1 = document.getElementsByTagName('select')[0];
let sort2 = document.getElementsByTagName('select')[1];
let sort3 = document.getElementsByTagName('select')[2];

let tableArr = {}
for (let i = 1; i < tableAll.rows.length; i++) {
	let row = tableAll.rows[i];
	let a = [row.cells[1].innerHTML, row.cells[2].innerHTML, row.cells[3].innerHTML, Number(row.cells[4].innerHTML), Number(row.cells[5].innerHTML), parseFloat(row.cells[6].innerHTML)];
	tableArr[i] = a;
}

//----------------------------------------------------------------------

sort1.onchange = function() {
	let s1 = document.forms[0].s1.value;
	let s2 = document.forms[0].s2.value;
	let s3 = document.forms[0].s3.value;
	for (let i = 0; i < document.forms[0].s1.children.length; i++) {
		document.forms[0].s2.children[i].hidden = false;
		document.forms[0].s3.children[i].hidden = false;
	}
	document.forms[0].s1.children[s2].hidden = true;
	document.forms[0].s1.children[s3].hidden = true;
	document.forms[0].s2.children[s1].hidden = true;
	document.forms[0].s2.children[s3].hidden = true;
	document.forms[0].s3.children[s1].hidden = true;
	document.forms[0].s3.children[s2].hidden = true;

	document.forms[0].s2.children[0].hidden = false;
	document.forms[0].s3.children[0].hidden = false;
}
sort2.onchange = function() {
	let s1 = document.forms[0].s1.value;
	let s2 = document.forms[0].s2.value;
	let s3 = document.forms[0].s3.value;
	for (let i = 0; i < document.forms[0].s1.children.length; i++) {
		document.forms[0].s1.children[i].hidden = false;
		document.forms[0].s3.children[i].hidden = false;
	}
	document.forms[0].s1.children[s2].hidden = true;
	document.forms[0].s1.children[s3].hidden = true;
	document.forms[0].s2.children[s1].hidden = true;
	document.forms[0].s2.children[s3].hidden = true;
	document.forms[0].s3.children[s1].hidden = true;
	document.forms[0].s3.children[s2].hidden = true;

	document.forms[0].s1.children[0].hidden = false;
	document.forms[0].s3.children[0].hidden = false;
}
sort3.onchange = function() {
	let s1 = document.forms[0].s1.value;
	let s2 = document.forms[0].s2.value;
	let s3 = document.forms[0].s3.value;
	for (let i = 0; i < document.forms[0].s1.children.length; i++) {
		document.forms[0].s1.children[i].hidden = false;
		document.forms[0].s2.children[i].hidden = false;
	}
	document.forms[0].s1.children[s2].hidden = true;
	document.forms[0].s1.children[s3].hidden = true;
	document.forms[0].s2.children[s1].hidden = true;
	document.forms[0].s2.children[s3].hidden = true;
	document.forms[0].s3.children[s1].hidden = true;
	document.forms[0].s3.children[s2].hidden = true;

	document.forms[0].s1.children[0].hidden = false;
	document.forms[0].s2.children[0].hidden = false;
}

button_sort.onclick = function() {
	//alert('Сортировка кнопка');
	lev1 = +document.forms[0].s1.value;
	lev2 = +document.forms[0].s2.value;
	lev3 = +document.forms[0].s3.value;
	ord1 = +document.forms[0].s11.checked;
	ord2 = +document.forms[0].s22.checked;
	ord3 = +document.forms[0].s33.checked;
	if (((lev1==0 || lev2==0) && lev3!=0) || (lev1==0 && lev2!=0)) {
		alert('Уровни нужно выбирать последовательно!');
	}
	else if (lev1 != 0) {
		let keys = Object.keys(tableArr);
		//alert(lev1-1);

		function compare(a, b) {
			let aa = tableArr[keys[a-1]][lev1-1];
			let bb = tableArr[keys[b-1]][lev1-1];
			if ((ord1 == false && aa>bb) || (ord1 == true && aa<bb)) return 1;
			else if ((ord1 == false && aa<bb) || (ord1 == true && aa>bb)) return -1;
			else {
				if (lev2 > 0) {
					aa = tableArr[keys[a-1]][lev2-1];
					bb = tableArr[keys[b-1]][lev2-1];
					if ((ord2 == false && aa>bb) || (ord2 == true && aa<bb)) return 1;
					else if ((ord2 == false && aa<bb) || (ord2 == true && aa>bb)) return -1;
					else {
						if (lev3 > 0) {
							aa = tableArr[keys[a-1]][lev3-1];
							bb = tableArr[keys[b-1]][lev3-1];
							if ((ord3 == false && aa>bb) || (ord3 == true && aa<bb)) return 1;
							else if ((ord3 == false && aa<bb) || (ord3 == true && aa>bb)) return -1;
							else return 0;
						}
						else return 0;
					}
				}
				else return 0;
			}	
		}	

		keys.sort(compare);
		let res = {};
		let n = 0;
		for (let i in keys) {
			res[n] = tableArr[keys[i]];
			n++;
			//console.log(res[keys[i]]);
		}
		//console.log(res);
		tableNew(res);
	}

	document.forms[0].s1.value = 0;
	document.forms[0].s2.value = 0;
	document.forms[0].s3.value = 0;
	document.forms[0].s11.checked = false;
	document.forms[0].s22.checked = false;
	document.forms[0].s33.checked = false;
	for (let i = 0; i < document.forms[0].s1.children.length; i++) {
		document.forms[0].s1.children[i].hidden = false;
		document.forms[0].s2.children[i].hidden = false;
		document.forms[0].s3.children[i].hidden = false;
	}
}

button_filter.onclick = function() {
	//alert('Фильтр кнопка');
	let name = document.forms[1].name.value;
	let country = document.forms[1].country.value;
	let person = document.forms[1].person.value;
	let year1 = document.forms[1].year1.value;
	let year2 = document.forms[1].year2.value;
	let count1 = document.forms[1].count1.value;
	let count2 = document.forms[1].count2.value;
	let summ = document.forms[1].summ.value;

	let res = {};
	let k = 0;
	for (let i in tableArr) {
		let f = true;
		if ((name != '') && (name != tableArr[i][0])) {
			f = false;
		}
		if ((country != '') && (country != tableArr[i][1])) {
			f = false;
		}
		if ((person != '') && (person != tableArr[i][2])) {
			f = false;
		}
		if ((year1 != '') && (parseInt(year1) > tableArr[i][3])) {
			f = false;
		}
		if ((year2 != '') && (parseInt(year2) < tableArr[i][3])) {
			f = false;
		}
		if ((count1 != '') && (parseInt(count1) > tableArr[i][4])) {
			f = false;
		}
		if ((count2 != '') && (parseInt(count2) < tableArr[i][4])) {
			f = false;
		}
		if ((summ != '') && (parseFloat(summ) != tableArr[i][5])) {
			f = false;
		}
		if (f == true) {
			res[k] = [tableArr[i][0], tableArr[i][1], tableArr[i][2], tableArr[i][3], tableArr[i][4], tableArr[i][5]];
			k++;
			//alert(tableArr[i]);
		}
	}
	tableNew(res);

	document.forms[1].name.value = '';
	document.forms[1].country.value = '';
	document.forms[1].person.value = '';
	document.forms[1].year1.value = '';
	document.forms[1].year2.value = '';
	document.forms[1].count1.value = '';
	document.forms[1].count2.value = '';
	document.forms[1].summ.value = '';
}

function tableNew(arr) {
	let k = 0;
	while (document.getElementsByTagName("table")[k] != null) {
		document.getElementsByTagName("table")[k].hidden = true;
		k++;
	}
	let n = 1;
	let tableN = document.createElement("table");
	tableN.setAttribute('border', '1');
	tableN.setAttribute('align', 'justify');
	tableN.setAttribute('cellspacing', '0');
	tableN.setAttribute('cellpadding', '5');
	tableN.appendChild(head);

	for (let key in arr) {
		let rowN = document.createElement("tr");
		let num = document.createElement("td");
		num.innerHTML = n;
		rowN.appendChild(num);
		for (let i = 0; i < arr[key].length; i++) {
			let cell = document.createElement("td");
			cell.innerHTML = arr[key][i];
			rowN.appendChild(cell);
			console.log(cell.innerHTML);
		}
		n++;
		tableN.appendChild(rowN);
	}
	document.getElementsByClassName("table")[0].appendChild(tableN);
}

//--------------------------------------------------------------------------------------------------------------------------------

let table = [];
let param = [];

function getArrGraph(arrObject, fieldX, fieldY) {
    // сформируем список меток по оси OX (различные элементы поля fieldX)
    let i = param.indexOf(fieldX);
    let groupObj = d3.group(arrObject, d => d[param[i]]);

    arrGroup = []; 
    for(let entry of groupObj) {
        //выделяем минимальное и максимальное значения поля fieldY 
        //для очередной метки по оси ОХ
        let j = param.indexOf(fieldY);
        let minMax = d3.extent(entry[1].map(d => parseFloat((d[param[j]]))));

        let elementGroup = {};
        elementGroup.labelX = entry[0];
        elementGroup.valueMin = minMax[0];
        elementGroup.valueMax = minMax[1];
        
        arrGroup.push(elementGroup);
    }
    return arrGroup;
}
function graph(form) {
	if (table.length == 0) {
        let element = document.getElementsByTagName('tbody');
        element = element[0].children;
        for (let i = 0; i < element.length; i++){
            let ch = element[i].children;
            if (i == 0)
                for (let j = 0; j < ch.length; j++)
				param.push(ch[j].textContent);
            else {       
                let el = {};
                for (let j = 0; j < ch.length; j++)
                el[param[j]] = ch[j].textContent ;
                table.push(el); 
            }
        }
    }

	let v = (form[0].checked == true) ? form[0].value : form[1].value;
    let arrGraph = getArrGraph(table, v, "Мировые кассовые сборы (млрд $)")
    let marginX = 50;
    let marginY = 50;
    let height = 400;
    let width = 800;
   
    let svg = d3.select("svg")
    .attr("height", height)
    .attr("width", width);
   
    // очищаем svg перед построением
    svg.selectAll("*").remove();

    // определяем минимальное и максимальное значение по оси OY
    let min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
    let max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05;
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;
   
    // определяем шкалы для осей
    let scaleX = d3.scaleBand()
    .domain(arrGraph.map(function(d) {
        return d.labelX;
    })
    )
    .range([0, xAxisLen],1);
   
    let scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([yAxisLen, 0]);
    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY);// вертикальная
   
    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
        return "rotate(-45)";
    });
   
    // отображаем ось OY
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .attr("class", "y-axis")
    .call(axisY);
   
    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick")
    .append("line") // добавляем линию
    .classed("grid-line", true) // добавляем класс
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", - (yAxisLen));
   
    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLen)
    .attr("y2", 0);
   
    let f = true;
    // отображаем данные в виде диаграммы
    if(form[2].checked == true){
            svg.selectAll(".dot")
            .data(arrGraph)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMax); })
            .attr("transform",
            `translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`)
            .style("fill", "red");
        f = false;
    }
    if (form[3].checked == true){
            svg.selectAll(".dot")
            .data(arrGraph)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMin); })
            .attr("transform",
            `translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`)
            .style("fill", "blue");
        f = false;
    }
    if (f) {
        alert('Выберите значение по оси OY!');
        svg.selectAll("*").remove();
    }
}