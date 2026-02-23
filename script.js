const URL = "https://teachablemachine.withgoogle.com/models/YJ_i_Ueih/"; 
let model, webcam, labelContainer, maxPredictions;

document.getElementById("start-btn").addEventListener("click", init);

async function init() {
  // Model URL lar
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // Modelni yuklash
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // webcam tayyorlash
  const flip = true;
  webcam = new tmImage.Webcam(320, 320, flip);
  await webcam.setup();
  await webcam.play();

  // video oynani containerga qo‘shamiz
  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  // natija label container
  labelContainer = document.getElementById("label-container");

  // doimiy klasifikatsiya sikli
  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const predictions = await model.predict(webcam.canvas);
  labelContainer.innerHTML = "";

  predictions.forEach((p) => {
    labelContainer.innerHTML += 
      ${p.className}: ${(p.probability.toFixed(2) * 100)}% <br>;
  });
}
