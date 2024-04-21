let url = "https://digi-api.com/api/v1/digimon/";
const dataContainer = document.getElementById("Digidex-container");
const dataContainer2 = document.getElementById("Digivolution-container");

function displayDataFromURL(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dataContainer.innerHTML = "";

      const nameElement = document.createElement("h3");
      nameElement.innerText = data.name;
      dataContainer.appendChild(nameElement);

      const imageElement = document.createElement("img");
      const digimonName = data.name.replace(/\s/g, "_");
      imageElement.src = "https://digi-api.com/images/digimon/w/" + digimonName + ".png";
      dataContainer.appendChild(imageElement);

      const levelsElement = document.createElement("p");
      levelsElement.innerText = "Niveaux: " + data.levels.map(level => level.level).join(", ");
      dataContainer.appendChild(levelsElement);

      const attributesElement = document.createElement("p");
      attributesElement.innerText = "Attributs: " + data.attributes.map(attribute => attribute.attribute).join(", ");
      dataContainer.appendChild(attributesElement);

      const descriptionsElement = document.createElement("p");
      const englishDescription = data.descriptions.find(description => description.language === 'en_us');
      if (englishDescription) {
        descriptionsElement.innerText = "Description (en anglais): " + englishDescription.description;
      } else {
        descriptionsElement.innerText = "Aucune description en anglais trouvée.";
      }
      dataContainer.appendChild(descriptionsElement);

      const fieldsElement = document.createElement("p");
      fieldsElement.innerText = "Champs: " + data.fields.map(field => field.field).join(", ");
      dataContainer.appendChild(fieldsElement);

      const skillsElement = document.createElement("p");
      skillsElement.innerText = "Compétences: " + data.skills.map(skill => skill.skill).join(", ");
      dataContainer.appendChild(skillsElement);

      const typesElement = document.createElement("p");
      typesElement.innerText = "Types: " + data.types.map(type => type.type).join(", ");
      dataContainer.appendChild(typesElement);

      const releaseDateElement = document.createElement("p");
      releaseDateElement.innerText = "Date d'apparition: " + data.releaseDate;
      dataContainer.appendChild(releaseDateElement);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}

function displayDigivolutionDataFromURL(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dataContainer2.innerHTML = "";

      const nameElement = document.createElement("h3");
      nameElement.innerText = data.name;
      dataContainer2.appendChild(nameElement);

      const imageElement = document.createElement("img");
      const digimonName = data.name.replace(/\s/g, "_");
      imageElement.src = "https://digi-api.com/images/digimon/w/" + digimonName + ".png";
      dataContainer2.appendChild(imageElement);

      const priorEvolutionsElement = document.createElement("h3");
      priorEvolutionsElement.innerText = "Précédentes évolutions: ";
      dataContainer2.appendChild(priorEvolutionsElement);

    data.priorEvolutions.forEach(priorEvolution => {
      const priorEvolutionImageElement = document.createElement("img");
      priorEvolutionImageElement.src = priorEvolution.image;
      dataContainer2.appendChild(priorEvolutionImageElement);
    
      const priorEvolutionNameElement = document.createElement("span");
      priorEvolutionNameElement.innerText = priorEvolution.digimon + " ";
      dataContainer2.appendChild(priorEvolutionNameElement);

      const priorEvolutionConditionElement = document.createElement("span");
      priorEvolutionConditionElement.innerText = "condition: " + priorEvolution.condition + "\n";
      dataContainer2.appendChild(priorEvolutionConditionElement);
    });
        
    const nextEvolutionsElement = document.createElement("h3");
    nextEvolutionsElement.innerText = "Futures évolutions: ";
    dataContainer2.appendChild(nextEvolutionsElement);

    data.nextEvolutions.forEach(nextEvolution => {
      const nextEvolutionImageElement = document.createElement("img");
      nextEvolutionImageElement.src = nextEvolution.image;
      dataContainer2.appendChild(nextEvolutionImageElement);
    
      const nextEvolutionNameElement = document.createElement("span");
      nextEvolutionNameElement.innerText = nextEvolution.digimon + " ";
      dataContainer2.appendChild(nextEvolutionNameElement);

      const nextEvolutionConditionElement = document.createElement("span");
      nextEvolutionConditionElement.innerText = "condition: " + nextEvolution.condition + "\n";
      dataContainer2.appendChild(nextEvolutionConditionElement);

    });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;
console.log(searchTerm);
  if (searchTerm.trim() === "") {
    alert("Veuillez entrer un terme de recherche");
    return;
  }

  const url = `https://digi-api.com/api/v1/digimon/${searchTerm}`;
  displayDataFromURL(url);
}

function handlezEvolutionFormSubmit(event) {
  event.preventDefault();
  let searchEvolutionInput = document.getElementById("evolution-search-input");
  const searchTerm = searchEvolutionInput.value;

  if (searchTerm.trim() === "") {
    alert("Veuillez entrer un terme de recherche");
    return;
  }

  const url = `https://digi-api.com/api/v1/digimon/${searchTerm}`;
  displayDigivolutionDataFromURL(url);
}

let digimonsShown = false;

function displayDigimons() {
    const apiUrl = "https://digi-api.com/api/v1/digimon?pageSize=1422";
    const digimonListContainer = document.getElementById("digimonList");
    const showDigimonsButton = document.getElementById("showDigimonsButton");

    if (digimonsShown) {
        digimonListContainer.innerHTML = "";
        showDigimonsButton.innerText = "Afficher les Digimons";
        showDigimonsButton.classList.remove("delete");
        digimonsShown = false;
    } else {
        fetch(apiUrl)
            .then(response => response.json())
            .then(dataToShow => {
                if (Array.isArray(dataToShow.content)) {
                    dataToShow.content.forEach(digimon => {
                        const listItem = document.createElement("li");
                        const digimonName = document.createElement("h3");
                        digimonName.innerText = digimon.name;
                        listItem.appendChild(digimonName);

                        const digimonImage = document.createElement("img");
                        const digimonNameImage = digimon.name.replace(/\s/g, "_");
                        digimonImage.src = digimon.image;
                        listItem.appendChild(digimonImage);

                        digimonListContainer.appendChild(listItem);
                    });
                } else {
                    console.error("Erreur lors de la récupération des données : La réponse de l'API n'est pas un tableau");
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });

        showDigimonsButton.innerText = "Retirer les Digimons";
        showDigimonsButton.classList.add("delete");
        digimonsShown = true;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const showDigimonsButton = document.getElementById("showDigimonsButton");
    if (showDigimonsButton) {
        showDigimonsButton.addEventListener("click", displayDigimons);
    } else {
        console.error("Erreur : L'élément avec l'ID 'showDigimonsButton' n'a pas été trouvé");
    }
});

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleFormSubmit);