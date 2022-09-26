const provinsi = document.getElementById("provinsi");
const kabupaten = document.getElementById("kabupaten");
const kecamatan = document.getElementById("kecamatan");
const kelurahan = document.getElementById("kelurahan");

const getProvinsi = async () => {
  const response = await fetch("https://ibnux.github.io/data-indonesia/provinsi.json");
  const data = await response.json();
  return data;
};
const getKabupaten = async (id) => {
  const response = await fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${id}.json`);
  const data = await response.json();
  return data;
};
const getKecamatan = async (id) => {
  const response = await fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${id}.json`);
  const data = await response.json();
  return data;
};
const getKelurahan = async (id) => {
  const response = await fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${id}.json`);
  const data = await response.json();
  return data;
};
const getResult = async (key) => {
  const response = await fetch(`https://kodepos.vercel.app/search?q=${key}`);
  const data = await response.json();
  return data;
};

const removeData = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
};

const showProvinsi = async () => {
  const options = await getProvinsi();
  provinsi.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    provinsi.appendChild(newOption);
  });
  showKabupaten();
};
const showKabupaten = async () => {
  removeData(kabupaten);
  const options = await getKabupaten(provinsi.value);
  kabupaten.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kabupaten.appendChild(newOption);
  });
  showKecamatan();
};
const showKecamatan = async () => {
  removeData(kecamatan);
  const options = await getKecamatan(kabupaten.value);
  kecamatan.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kecamatan.appendChild(newOption);
  });
  showKelurahan();
};
const showKelurahan = async () => {
  removeData(kelurahan);
  const options = await getKelurahan(kecamatan.value);
  kelurahan.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kelurahan.appendChild(newOption);
  });
};

const button = document.getElementById("button");
const result = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultKodePos = document.getElementById("result-kode-pos");
const resultKelurahan = document.getElementById("result-kelurahan");
const resultKecamatan = document.getElementById("result-kecamatan");
const resultKabupaten = document.getElementById("result-kabupaten");
const resultProvinsi = document.getElementById("result-provinsi");
const content = document.getElementById("content");
const showKodePos = async () => {
  button.innerHTML = "memuat";

  const kodePos = await getResult(kelurahan.options[kelurahan.selectedIndex].text);

  button.innerHTML = "Berhasil";
  button.classList.add("green");

  resultKodePos.innerHTML = kodePos.data[0].postalcode;
  resultTitle.innerHTML = kelurahan.options[kelurahan.selectedIndex].text;
  resultKelurahan.innerHTML = kelurahan.options[kelurahan.selectedIndex].text;
  resultKecamatan.innerHTML = kecamatan.options[kecamatan.selectedIndex].text;
  resultKabupaten.innerHTML = kabupaten.options[kabupaten.selectedIndex].text;
  resultProvinsi.innerHTML = provinsi.options[provinsi.selectedIndex].text;

  result.classList.remove("hidden");
  content.classList.add("mt-100");
};

showProvinsi();
