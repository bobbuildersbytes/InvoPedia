


        window.addEventListener("load",function(){



document.getElementById('capture').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('PredictedPicture').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
}


        
        
        button.addEventListener("click", function(){
     
         const file = document.getElementById('capture').files[0];
         console.log(file);
       
        //HTTP Post Request
        var URL = "https://dandyv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/d9a2801b-7386-4594-8135-a673bf4235d2/classify/iterations/Iteration2/image";
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', URL, true);
        xhr.setRequestHeader('Prediction-Key','9074a1adf94c425ca10b2235d2c5dd68');
        xhr.setRequestHeader('Content-Type','application/octet-stream')
   
        
        xhr.send(file); 
        
        
        xhr.onreadystatechange = processRequest;
        
        function help(state){
            if(state != "Negative"){
            const data = JSON.stringify({
  max_tokens: 200,
  temperature: 0.5,
  return_likelihoods: 'NONE',
  truncate: 'END',
  prompt: 'How do I exterminate ' + state + 'in my garden using sustainable methods? Only provide information about extermination, and why it is hard to remove.'
});

const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
    var json = JSON.parse(this.responseText);
    console.log(json["generations"]["0"]["text"])
    var table = document.getElementById("myTable");
    var rowtwo = table.insertRow(3);
    var cell3 = rowtwo.insertCell(0);
    cell3.innerHTML = json["generations"]["0"]["text"];
    link();
  }
});

xhr.open('POST', 'https://api.cohere.ai/v1/generate');
xhr.setRequestHeader('accept', 'application/json');
xhr.setRequestHeader('content-type', 'application/json');
xhr.setRequestHeader('authorization', 'Bearer NXQ9LagDjsfNovq94TVzysTIr52BAiMmqhuIgyy4');

xhr.send(data);

document.getElementById('report').innerHTML = '<a href="https://trca.ca/" class="waves-effect waves-light btn-large" style="font-family:Palatino" >Report to Toronto and Region Conservation Authority</a>';
            }
            else{
                var table = document.getElementById("myTable");
    var rowtwo = table.insertRow(3)
    var cell3 = rowtwo.insertCell(0);
    cell3.innerHTML = "this is not an invasive species";
            }
        }
        
        function processRequest(e){
            var state = "";
            if(xhr.readyState == 4 && xhr.status == 200){
                //alert(xhr.responseText);
                console.log(typeof(xhr.responseText));
                var json = JSON.parse(xhr.responseText);
                console.log(json);
                console.log(json.predictions[0]['probability']);
                console.log(typeof(json));  
                  
                var table = document.getElementById("myTable");
                
                var row = table.insertRow(1);
                
                var rowthree = table.insertRow(2);

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = rowthree.insertCell(0);

                // Add some text to the new cells:
                cell1.innerHTML = json.predictions[0]['tagName'];
                cell2.innerHTML = json.predictions[0]['probability'] * 100 + '%';
                state = json.predictions[0]['tagName'];
                help(state);
            }
        }
        },false);

        },false);
        
