async function loadData() {
    const reponse = await fetch(`https://hp-api.onrender.com/api/characters`);
    let data = await reponse.json();

    const characterName = new URLSearchParams(window.location.search).get('name');
    data = data.filter(character => character.name === characterName);


    const mainElement = document.querySelector('main');
        mainElement.replaceChildren();

            data.forEach((character) => {
                const article = document.createElement('article');
                article.innerHTML = `
                <section class="perso__info">
                    <h3>${character.name}</h3>
                    <h4>${character.alternate_names}</h4>
                    <div class="perso">
                    <figure class="perso__left">
                        <img
                          class="${character.alive === false ? 'dead' : ''}"
                          src="${character.image || "./images/troll.jpg"}"
                          alt="${character.name}"
                        />
                        <figcaption>${character.actor || "Inconnu"}</figcaption>
                    </figure>
                    <div class="perso__right">
                        
                        <div>
                        <p class="attr">Gender</p>
                        <p>${character.gender || 'Inconnu'}</p>
                        </div>
                        <div>
                        <p class="attr">Eye</p>
                        <p>${character.eyeColour || 'Inconnu'}</p>
                        </div>
                        <div>
                        <p class="attr">Hair</p>
                        <p>${character.hairColour || 'Inconnue'}</p>
                        </div>
                        <div>
                        <p class="attr">Date of birth</p>
                        <p>${character.dateOfBirth || 'Inconnue'}</p>
                        </div>
                        <div>
                        <p class="attr">Patronus</p>
                        <p>${character.patronus || 'Inconnu'}</p>
                        </div>
                    </div>
                </section>
                <section class="house__perso">
                    <img src="${character.house ? './images/' + character.house + '.png' : './images/troll.jpg'}" alt="Maison ${character.house || 'Inconnue'}" />
                </section>
                `;

                mainElement.appendChild(article);

            });
 }

 loadData();