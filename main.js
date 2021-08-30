var predict1 = ""
var predict2 = ""

Webcam.set({
  width: 360,
  height: 250,
  image_format: "png",
  png_quality: 90
});
var camera = document.getElementById("gorp");

Webcam.attach('#camera')

function takePic(){
    Webcam.snap(function(data_uri){
        document.getElementById("thepic").innerHTML = "<img id='ugglebugglepoo' style='height: 300; width: 350' src='"+data_uri+"'>";
    });
}

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZHwjZsUDN/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
    speak()
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1= "The first prediction is."+predict1;
    speakData2= "The second prediction is."+predict2;
    var utterThis = new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis)
}

function idpic(){
    img = document.getElementById("ugglebugglepoo");
    classifier.classify(img, gotresult);
}

function gotresult(error, results){
    if (error){
        console.log("error: ",error );
        alert("Sorry, there was a teeny weensy error. Wait for a few minutes, then try again!");
    }
    else{
        console.log(results);
        document.getElementById("name1").innerHTML = results[0].label;
        document.getElementById("name2").innerHTML = results[1].label;
        predict1=results[0].label;
        predict2=results[1].label;
        speak();

        if(results[0].label == "Okay")
    {
      document.getElementById("pre1").innerHTML = "Okay!";
    }
    if(results[0].label == "All good")
    {
      document.getElementById("pre1").innerHTML = "All good!";
    }
    if(results[0].label == "Peace")
    {
      document.getElementById("pre1").innerHTML = "Peace!";
    }

    if(results[1].label == "Okay")
    {
      document.getElementById("pre2").innerHTML = "Okay!";
    }
    if(results[1].label == "All good")
    {
      document.getElementById("pre2").innerHTML = "All good!";
    }
    if(results[1].label == "Peace")
    {
      document.getElementById("pre2").innerHTML = "Peace!";
    }

    }
}