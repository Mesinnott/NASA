


    var baseUrl = 'https://api.nasa.gov'
    var epicBase= 'https://api.nasa.gov/EPIC/api/v1.0/images.php?'
    var key = 'api_key=dthsx8SJdl0SaEW2DiQvxtTENBW9RDocyzeLYM1F'
    var APOD = 'https://api.nasa.gov/planetary/apod?'
    var epicPic = 'http://epic.gsfc.nasa.gov/epic-archive/natural/png/'
    


$('#getNewEarth').on('click', function (e) {
    e.preventDefault()
    $('#picturePlace').html(`<img src="">`)
    
    dateUrl= 'https://api.nasa.gov/EPIC/api/v1.0/images.php?available_dates&' 
    combinedUrl =dateUrl+key
    debugger
    getDates(combinedUrl)
        .then(function(data){
            console.log(data)
            var dateList =JSON.parse(data)
            var arrLength = dateList.length
            var picNum =Math.random()*(arrLength-1)+1
            picNum=Math.ceil(picNum)
            console.log(picNum)
            var date=dateList[picNum]
            return date
        })
        .then(function(date){
            debugger
            console.log(date)
            return getEarth(date)
        })
        .then(function(data){
            console.log(data)
            var newNum = Math.random()*(12-1)+1
            newNum = Math.ceil(newNum)
            var EPICobject=JSON.parse(data)
            var picAddress= epicPic + EPICobject[newNum].image + '.png'
            $('#picturePlace').html(`<img src="${picAddress}">`)
            return data;
        },
        function(error){
        });
})









$('#getAPOD').on('click', function (e) {
    e.preventDefault()
    $('#picturePlace').html(`<img src="">`)
    console.log('success')

    getTodayAPOD(APOD, key)
        .then(function(data){
            console.log(data)
            $('#picturePlace').html(`<img src="${data.hdurl}">`)
            return data;
        },
        function(error){
        });
})


// function getEPIC(photo){
//     var url = 
    
//     src = epicPic+ photo ='.png'
//     return
// }




function getEarth(date) {

    var url = epicBase + 'date='+ date + '&' + key

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

    return new Promise(function(resolve, reject) {
        $.get(url).then(
            function(data){
                resolve(data);
            },
            function(error){
                console.log('error')
                reject(error);
            }
        );
    });
}