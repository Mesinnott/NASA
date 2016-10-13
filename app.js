


var baseUrl = 'https://api.nasa.gov'
var epicBase = 'https://api.nasa.gov/EPIC/api/v1.0/images.php?'
var key = 'api_key=dthsx8SJdl0SaEW2DiQvxtTENBW9RDocyzeLYM1F'
var APOD = 'https://api.nasa.gov/planetary/apod?'
var epicPic = 'http://epic.gsfc.nasa.gov/epic-archive/natural/png/'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


$('#getRandomAPOD').on('click', function (e) {
    debugger
    e.preventDefault()
    $('#picturePlace').html(`<img src="">`)

    var month = Math.random() * (12 - 1) + 1
    month = Math.ceil(month)
    var day = Math.random() * (30 - 1) + 1
    day = Math.ceil(day)
    var year = getRandomInt(2013, 2017)

    getAPOD(day, month, year)
        .then(function (data) {
            $('#picturePlace').html(`<img class= "imgClass" src="${data.hdurl}">`)
            return data;
        },
        function (error) {
            alert(error)
        });

})





$('#getNewEarth').on('click', function (e) {
    e.preventDefault()
    $('#picturePlace').html(`<img src="">`)

    dateUrl = 'https://api.nasa.gov/EPIC/api/v1.0/images.php?available_dates&'
    combinedUrl = dateUrl + key
    getDates(combinedUrl)
        .then(function (data) {
            console.log(data)
            var dateList = JSON.parse(data)
            var arrLength = dateList.length
            var picNum = Math.random() * (arrLength - 1) + 1
            picNum = Math.ceil(picNum)
            console.log(picNum)
            var date = dateList[picNum]
            return date
        })
        .then(function (date) {
            console.log(date)
            return getEarth(date)
        })
        .then(function (data) {
            console.log(data)
            var newNum = Math.random() * (12 - 1) + 1
            newNum = Math.ceil(newNum)
            var EPICobject = JSON.parse(data)
            var picAddress = epicPic + EPICobject[newNum].image + '.png'
            $('#picturePlace').html(`<img class= "imgClass" src="${picAddress}">`)
            return data;
        },
        function (error) {
        });
})









$('#getTodayAPOD').on('click', function (e) {
    e.preventDefault()
    $('#picturePlace').html(`<img src="">`)
    console.log('success')

    getTodayAPOD(APOD, key)
        .then(function (data) {
            console.log(data)
            $('#picturePlace').html(`<img class = "imgClass" src="${data.hdurl}">`)
            return data;
        },
        function (error) {
        });
})


// function getEPIC(photo){
//     var url = 

//     src = epicPic+ photo ='.png'
//     return
// }




function getEarth(date) {

    var url = epicBase + 'date=' + date + '&' + key

    return new Promise(function (resolve, reject) {
        $.get(url).then(
            function (data) {
                resolve(data);
            },
            function (error) {
                reject(error);
            }
        );
    });
}

function getAPOD(day, month, year) {

    var url = APOD + "date=" + year + "-" + month + '-' + day + '&&' + key

    return new Promise(function (resolve, reject) {

        $.get(url).then(
            function (data) {
                resolve(data);
            },
            function (error) {
                reject('rendered a bad date, just try again');
            }
        );
    });
}


function getTodayAPOD(APOD, key) {

    var url = APOD + key

    return new Promise(function (resolve, reject) {

        $.get(url).then(
            function (data) {
                resolve(data);
            },
            function (error) {
                reject(error);
            }
        );
    });
}


function getDates(url) {
    var url = url

    return new Promise(function (resolve, reject) {
        $.get(url).then(
            function (data) {
                resolve(data);
            },
            function (error) {
                console.log('error')
                reject(error);
            }
        );
    });
}