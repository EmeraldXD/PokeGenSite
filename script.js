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
        const isShiny = Math.random() <= 3.14 / 25;

        const randomPokemonId = Math.ceil(Math.random() * 1014) + 1;

        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const name = data.name;
                const stats = data.stats;
                const baseStatTotalValue = stats.reduce((total, stat) => total + stat.base_stat, 0);

                const spriteUrl = isShiny ? data.sprites.front_shiny : data.sprites.front_default;

                const modifiedPokemonName = isShiny ? `${capitalizeFirstLetter(name)}⭐` : capitalizeFirstLetter(name);

                pokemonName.textContent = modifiedPokemonName;
                baseStatTotal.textContent = `Base Stat Total: ${baseStatTotalValue}`;
                statList.innerHTML = "";
                stats.forEach((stat) => {
                    const statItem = document.createElement("li");
					const statName = stat.stat.name;
                    const statNum = Number(stat.base_stat);
					if (statName != "hp" && statName[7] != "-"){
						const statNameEnding = stat.stat.name.toString().slice(1);
	                    statItem.textContent = (statName.toString().charAt(0).toUpperCase() + statNameEnding + ": " + `${stat.base_stat}`);
	                    statList.appendChild(statItem);
                        if (statNum <= 60){
                            statItem.style.color = "#c91800";
                        }
                        else if (statNum > 60 && statNum <= 85){
                            statItem.style.color = "#c9a500";
                        }
                        else if (statNum > 85 && statNum <= 125){
                            statItem.style.color = "#57c200";
                        }
                        else{
                            statItem.style.color = "#00c9ab";
                        }
					}
					else if (statName[7] != "-"){
						statItem.textContent = ("HP: " + `${stat.base_stat}`);
						statList.appendChild(statItem);	
                        if (statNum <= 60){
                            statItem.style.color = "#c91800";
                        }
                        else if (statNum > 60 && statNum <= 85){
                            statItem.style.color = "#c9a500";
                        }
                        else if (statNum > 85 && statNum <= 125){
                            statItem.style.color = "#57c200";
                        }
                        else{
                            statItem.style.color = "#00c9ab";
                        }
					}
					else if(statName == "special-attack"){
						statItem.textContent = ("Special Attack: " + `${stat.base_stat}`);
						statList.appendChild(statItem);	
                        if (statNum <= 60){
                            statItem.style.color = "#c91800";
                        }
                        else if (statNum > 60 && statNum <= 85){
                            statItem.style.color = "#c9a500";
                        }
                        else if (statNum > 85 && statNum <= 125){
                            statItem.style.color = "#57c200";
                        }
                        else{
                            statItem.style.color = "#00c9ab";
                        }
					}
					else {
						statItem.textContent = ("Special Defense: " + `${stat.base_stat}`);
						statList.appendChild(statItem);
                        if (statNum <= 60){
                            statItem.style.color = "#c91800";
                        }
                        else if (statNum > 60 && statNum <= 85){
                            statItem.style.color = "#c9a500";
                        }
                        else if (statNum > 85 && statNum <= 125){
                            statItem.style.color = "#57c200";
                        }
                        else{
                            statItem.style.color = "#00c9ab";
                        }
					}
					
                });

                pokemonSprite.src = spriteUrl;
                pokemonInfo.classList.remove("hidden");
            })
            .catch((error) => {
                console.error("Failed to fetch Pokémon data:", error);
            });
    });
});