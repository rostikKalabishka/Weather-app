const searchButton = document.querySelector(".button");
const inputSearch = document.querySelector(".input");

searchButton.onclick = async (e) => {
  e.preventDefault();
  try {
    const info = await weatherCity(inputSearch.value);
  } catch (error) {
    alert("Error request");
  }

  const normalizedCity = normalize(info);
  render(normalizedCity);
};

const weatherCity = (cityName = "Budapest") => {
  let res;
  const getCityWeather = fetch(
    `${apiUrl}data/2.5/weather?q=${cityName}&APPID=${apiKey}`
  );

  try {
    res = getCityWeather
      .then((response) => response.json())
      .then((json) => json);
  } catch (error) {
    console.error("Error request");
  }
  return res;
};
normalize = (info) => {
  const { name } = info;
  let {
    main: { temp },
  } = info;
  const {
    weather: [{ main }],
  } = info;

  temp -= 273.15;
  return { name, temp: temp.toFixed(0) + "°С", main, img: randomImg() };
};
render = (normalizedCity) => {
  const cityDiv = document.querySelector(".card-city");
  const tempDiv = document.querySelector(".card-value");
  const img = document.querySelector(".card-image");
  const description = document.querySelector(".card-description");

  cityDiv.innerText = normalizedCity.name;
  tempDiv.innerText = normalizedCity.temp;
  description.innerText = normalizedCity.main;
  img.setAttribute("src", normalizedCity.img);
};

randomImg = () => {
  img = [
    "/img/gachi1.gif",
    "/img/gachi2.gif",
    "/img/gachi3.gif",
    "/img/gachi4.gif",
    "/img/gachi5.gif",
    "/img/gachi6.gif",
  ];
  let rand = Math.floor(Math.random() * img.length);

  return img[rand];
};

//loader + error
