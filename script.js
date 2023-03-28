const searchButton = document.querySelector(".button");
const inputSearch = document.querySelector(".input");
const mask = document.querySelector(".mask");
const errorMessage = document.querySelector(".error-message");
window.addEventListener("load", async () => {
  mask.classList.add("hide");
  setTimeout(() => {
    mask.remove();
  }, 1000);
});

searchButton.onclick = async (e) => {
  e.preventDefault();
  if (isError) {
    isError = false;
    errorMessage.textContent = " ";
  }
  try {
    const info = await weatherCity(inputSearch.value.trim());
    const normalizedCity = normalize(info);
    render(normalizedCity);
  } catch (error) {
    {
      isError = true;

      errorMessage.textContent = "Not Found";
      errorMessage.classList.add("hide");
    }
  }
};

let isError = false;

window.addEventListener("load", async () => {
  const info1 = await weatherCity();
  const normalizedCity = normalize(info1);
  render(normalizedCity);
});

const weatherCity = (cityName = "Budapest") => {
  let res;

  const getCityWeather = fetch(
    `${apiUrl}data/2.5/weather?q=${cityName}&APPID=${apiKey}`
  );
  res = getCityWeather
    .then((response) => response.json())
    .then((json) => json)
    .then()
    .catch((err) => {
      console.log(err.message);
    });

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
  // console.log(temp);
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

//  error під інпутом
