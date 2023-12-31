const firebaseConfig = {
    apiKey: "AIzaSyAOX5I_BB9soXF4yHMp9NCPVk2Z-d3DEPE",
    authDomain: "teachingrecord-6b575.firebaseapp.com",
    databaseURL: "https://teachingrecord-6b575-default-rtdb.firebaseio.com",
    projectId: "teachingrecord-6b575",
    storageBucket: "teachingrecord-6b575.appspot.com",
    messagingSenderId: "1097574891233",
    appId: "1:1097574891233:web:d69ed85c4f4b83daad41a0"
};

firebase.initializeApp(firebaseConfig);

var my5aAll = firebase.database().ref('myNotePad');

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
function selectAllData() {
    // document.getElementById('myNewInput').innerHTML = "";
    studentN0 = 0;
    firebase.database().ref('myNotePad').once('value',
        function (AllRecords) {
            AllRecords.forEach(
                function (CurrentRecord) {
                    var id = CurrentRecord.val().id;
                    var date = CurrentRecord.val().date;
                    var times = CurrentRecord.val().times;
                    var weeks = CurrentRecord.val().weeks;
                    var month = CurrentRecord.val().month;
                    var other = CurrentRecord.val().other;
                    var pay = CurrentRecord.val().pay;
                    addItemsToTable(id, date, times, weeks, month, other, pay);
                }
            );
        });

}
window.onload = selectAllData;
var studentN0;

var stdList = [];
function addItemsToTable(id, date, times, weeks, month, other, pay) {
    var tbody = document.getElementById('showDataReport');
    let time = document.getElementById('showTime');
    stdList.push([id, date, times, weeks, month, other, pay]);

    let tr = `
        <th>${++studentN0}</th>
        <th>${id}</th>
        <th>${date}</th>
        <th>${times}</th>
        <th>${month}</th>
        <th>${weeks}</th>
        <th>${pay}</th>
        <th>${other}</th>
                        
            
            `
    if (pay == 'paid') {
        tbody.innerHTML = '';
        
    } else {
        
        tbody.innerHTML += tr;
        let cc = tbody.rows.length.toString();
        time.innerText = cc;
    }
}

var Mid = document.getElementById('myid');
var Mdate = document.getElementById('myDate');
var Mtimes = document.getElementById('myTimes');
var Mweeks = document.getElementById('myWeeks');
var Mmonth = document.getElementById('myMonth');
var Mother = document.getElementById('myother');
var Mmypaid = document.getElementById('mypaid');


var BtnSubmit = document.getElementById('mySubmit');
var BtnUpdate = document.getElementById('myUpdate');
var BtnDele = document.getElementById('myDele');
var BtnClearBox = document.getElementById('myClear');
var BtnClearAll = document.getElementById('myClearAll');


function Fillbox(index) {
    if (index == null) {
        BtnSubmit.style.display = 'inline-block';
        BtnUpdate.style.display = 'none';
        BtnDele.style.display = 'none';
        BtnClearBox.style.display = 'none';

    }
    else {
        Mid.value = stdList[index][0];
        Mdate.value = stdList[index][1];
        Mtimes.value = stdList[index][2];
        Mweeks.value = stdList[index][3];
        Mmonth.value = stdList[index][4];
        Mother.value = stdList[index][5];
        Mmypaid.value = stdList[index][6];
        BtnClearBox.style.display = 'inline-block';

        BtnSubmit.style.display = 'none';
        BtnUpdate.style.display = 'inline-block';
        BtnDele.style.display = 'inline-block';
    }
}
NewBox();

function NewBox() {
    let r = (Math.random() + 1).toString(36).substring(7);
    Mid.value = r;
    Mdate.value = '';
    Mtimes.value = '';
    Mweeks.value = '';
    Mmonth.value = '';
    Mother.value = '';
    // Mmypaid.value = '';
    BtnSubmit.style.display = 'inline-block';
    BtnUpdate.style.display = 'none';
    BtnDele.style.display = 'none';
    BtnClearBox.style.display = 'none';
}

function AddStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).set(
        {
            id: Mid.value,
            date: Mdate.value,
            times: Mtimes.value,
            weeks: Mweeks.value,
            month: Mmonth.value,
            other: Mother.value,
            pay: Mmypaid.value,
        },
    )
    selectAllData();
    window.location.reload();
    e.preventDefault();


}
function UpStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).update(
        {
            id: Mid.value,
            date: Mdate.value,
            times: Mtimes.value,
            weeks: Mweeks.value,
            month: Mmonth.value,
            other: Mother.value,
            pay: Mmypaid.value,
        },
    )
    selectAllData();
    e.preventDefault();
    window.location.reload();

}
function DelStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).remove().then(
        function () {
            selectAllData();
            // window.location.reload();
            e.preventDefault();

        }
    )
}
function DelStdAll() {
    firebase.database().ref("myNotePad").remove();

    // window.location.reload();
}
