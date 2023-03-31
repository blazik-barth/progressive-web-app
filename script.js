document.querySelector("#div1").style.display = "block";

function open_div(screen) {
	document.querySelectorAll("div.screen").forEach(div => {div.style.display = "none";});
	document.querySelector("#" + screen).style.display = "block";
}

document.querySelectorAll("#div-button").forEach(button => {
	button.addEventListener("click", (e) => {
		let screen = e.target.getAttribute("data-screen");
		open_div(screen);
	});
});

document.querySelector("#search-button").addEventListener("click", (e) => {
	let type = document.querySelector("select").value;
	fetch("https://pokeapi.co/api/v2/type/" + type)
	.then(request => {
		return request.json();
	}).then(data => {
		let pokemon = data.pokemon;
		pokemon.forEach(poke => {
			let url = poke.pokemon.url;
			make_card(url);
		});
	})
	open_div("div2");
});

function make_card(url) {
	fetch(url)
	.then(response => {
		return response.json();
	})
	.then(data => {
		name = data.name;
		sprite = data.sprites.front_default;

		let card = document.querySelector("div.mdc-card").cloneNode(true);
		card.querySelector("h6.pokemon-name").innerText = name.toUpperCase();
		if (sprite != null)
			card.querySelector("img.pokemon-sprite").src = sprite;
		card.style.display = "block";
		document.querySelector("#div2").append(card);

		card.addEventListener("click", (e) => {
			displayStats(data);
		});
	})
}

function displayStats(data) {
	open_div("div3");
	let stats = data.stats;

	document.querySelector("h4.stat-name").innerText = data.name.toUpperCase();
	canvas = document.querySelector("canvas.stat-canvas").getContext("2d");
	let img = document.createElement("img");
	img.src = data.sprites.front_default;
	img.addEventListener("load", () => {
		let width = img.naturalWidth;
		let height = img.naturalHeight;

		
		canvas.drawImage(img, 250-(width/2), 50-(height/2), width, height);
	});

	const hp = stats[0].base_stat;
	const atk = stats[1].base_stat;
	const def = stats[2].base_stat;
	const spatk = stats[3].base_stat;
	const spdef = stats[4].base_stat;
	const speed = stats[5].base_stat;

	canvas.fillStyle = "red";
	const hp_height = 200 * (hp / 255);
	canvas.fillRect(20, 300 - hp_height, 50, hp_height);

	canvas.fillStyle = "orange";
	const atk_height = 200 * (atk / 255);
	canvas.fillRect(100, 300 - atk_height, 50, atk_height);

	canvas.fillStyle = "yellow";
	const def_height = 200 * (def / 255);
	canvas.fillRect(180, 300 - def_height, 50, def_height);

	canvas.fillStyle = "blue";
	const spa_height = 200 * (spatk / 255);
	canvas.fillRect(260, 300 - spa_height, 50, spa_height);

	canvas.fillStyle = "green";
	const spd_height = 200 * (spdef / 255);
	canvas.fillRect(340, 300 - hp_height, 50, hp_height);

	canvas.fillStyle = "pink";
	const spe_height = 200 * (speed / 255);
	canvas.fillRect(420, 300 - spe_height, 50, spe_height);
}
if ('geolocation' in navigator) {
	let map;
	
	function initMap() {
		let latitude;
		let longitude;
		navigator.geolocation.getCurrentPosition(location => {
			latitude = location.coords.latitude;
			console.log(latitude);
			longitude = location.coords.longitude;
			console.log(longitude);
				
		  map = new google.maps.Map(document.getElementById("map"), {
		    center: { lat: latitude, lng: longitude },
		    zoom: 8,
			});
			
		let marker = new google.maps.Marker({
			position: map.center,
			map: map
			});
	  });
	}
	
	window.initMap = initMap;
}