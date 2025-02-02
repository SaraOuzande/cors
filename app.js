async function searchCharacter() {
    const name = document.getElementById('search').value.trim();
    const characterInfoDiv = document.getElementById('character-info');

    if (name === '') {
        characterInfoDiv.innerHTML = 'Por favor, introduce un nombre.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/characters/${name}`);
        if (response.ok) {
            const character = await response.json();
            characterInfoDiv.innerHTML = `
                <h2>${character.name}</h2>
                <p><strong>Estado:</strong> ${character.status}</p>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Género:</strong> ${character.gender}</p>
                <p><strong>Origen:</strong> ${character.origin.name}</p>
                <img src="${character.image}" alt="${character.name}" width="200">
            `;
        } else {
            const error = await response.json();
            characterInfoDiv.innerHTML = `<p>${error.message}</p>`;
        }
    } catch (error) {
        characterInfoDiv.innerHTML = 'Hubo un error al hacer la solicitud.';
    }
}
