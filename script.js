document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generateButton");
    const pokemonInfo = document.getElementById("pokemonInfo");
    const pokemonName = document.getElementById("pokemonName");
    const baseStatTotal = document.getElementById("baseStatTotal");
    const statList = document.getElementById("statList");
    const pokemonSprite = document.getElementById("pokemonSprite");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    generateButton.addEventListener("click", () => {
        // Generate a random number between 1 and 25 to determine if it's shiny
        const isShiny = Math.random() <= 1 / 25;

        // Generate a random Pokémon ID between 1 and 1015
        const randomPokemonId = Math.floor(Math.random() * 1014) + 1;

        // URL of the PokeAPI for the random Pokémon
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Extract the Pokémon's name, base stats, and calculate the total base stat
                const name = data.name;
                const stats = data.stats;
                const baseStatTotalValue = stats.reduce((total, stat) => total + stat.base_stat, 0);

                // URL to the sprite of the Pokémon (shiny or regular)
                const spriteUrl = isShiny ? data.sprites.front_shiny : data.sprites.front_default;

                // Add "Shiny" to the name if it's a shiny Pokémon
                const modifiedPokemonName = isShiny ? `Shiny ${capitalizeFirstLetter(name)}` : capitalizeFirstLetter(name);

                // Update the HTML elements with Pokémon data
                pokemonName.textContent = modifiedPokemonName;
                baseStatTotal.textContent = `Base Stat Total: ${baseStatTotalValue}`;
                statList.innerHTML = "";
                stats.forEach((stat) => {
                    const statItem = document.createElement("li");
                    statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                    statList.appendChild(statItem);
                });

                pokemonSprite.src = spriteUrl;
                pokemonInfo.classList.remove("hidden");
            })
            .catch((error) => {
                console.error("Failed to fetch Pokémon data:", error);
            });
    });
});
