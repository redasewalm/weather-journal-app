/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey =  ',us&appid=db619c1376df7e1301265ede4f844916';

const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
const month =d.getMonth()+1;
let newDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API weather Data*/
const  getweather = async (baseUrl,zipCode , apiKey) => {
    //fetch data from weathermap
    const apiResponse = await fetch(baseUrl+zipCode+apiKey);
    try{
        const data = await apiResponse.json();
        //console.log(data);
        return data;
    }
    catch(error){
        console.log('error',error);
    }
    
}

//post data to the server
const postData = async (url='', data={}) =>{
    const response = await fetch(url ,{ 
    method:'POST',
    credentials:'same-origin',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data)
 } );
 try{
     const newData= await response.json();
     return newData;
 }
 catch(error){
     console.log('error',error);
 }
}
 //async function to get data from the server
const getData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    const allData = await request.json();
    return allData;
    }
    catch(error) {
      console.log("error", error);
    }
  }
//update ui 
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      
      tempDiv.innerHTML ="temperature : "+ allData[0].temperature + '&deg;';
     dateDiv.innerHTML = "date : "+ allData[0].date;
     contentDiv.innerHTML = "feeling : "+ allData[0].userResponse;
     
  
    }catch(error){
      console.log("error", error);
    }
  }

//event-listenner on generate buttin
document.getElementById('generate').addEventListener('click',actionPerformed);

//actionPerformed function
function actionPerformed (e) {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getweather(baseUrl,zipCode, apiKey).then(function(data){
      var celcius = Math.round(parseFloat(data.main.temp)-273.15);
         postData('/addData',{temperature:celcius , date:newDate , userResponse:feeling} )})
         .then(function(){
             updateUI()});
}

