
async function loadData(selectedHouse) {
    const reponse = await fetch(`https://hp-api.onrender.com/api/characters`);
    let data = await reponse.json();
    //data = data.slice(0, 20); // j'ai trouvé sur google

    //buttons houses
    if (selectedHouse) {
        data = data.filter(character =>
            character.house?.toLowerCase() === selectedHouse.toLowerCase()
        );
        data.sort((a, b) => a.name.localeCompare(b.name));
    }

    const mainElement = document.querySelector('.characters');
        mainElement.replaceChildren();

            data.forEach((character) => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <a class="character-link" href="./details.html?name=${character.name}">
                        <div class="${character.house ? character.house.toLowerCase() : ''}">
                            <img 
                            src="${character.image || "./images/troll.jpg"}" 
                            alt="${character.name}"
                            />
                            <p>${character.name}</p>
                        </div>
                    </a>
                `;

                mainElement.appendChild(article);

            });
 }

 document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll('.houses div');
    let selectedHouse = null;
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedHouse = button.querySelector('img').alt;
            loadData(selectedHouse);
        });
    });

});


 loadData(null);
