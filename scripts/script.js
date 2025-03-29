document.addEventListener("DOMContentLoaded", function () {
    fetch("data/iphones.txt")
        .then(response => response.json())
        .then(data => {
            const iphoneList = document.getElementById("iphone-list");
            const repairList = document.getElementById("repair-list");
            const iphoneTitle = document.getElementById("iphone-title");

            if (iphoneList) {
                data.iphones.forEach(iphone => {
                    let div = document.createElement("div");
                    div.classList.add("iphone-card");
                    div.innerHTML = `
                        <img src="images/${iphone.image}" alt="${iphone.nom}">
                        <h2>${iphone.nom}</h2>
                    `;
                    div.addEventListener("click", () => {
                        window.location.href = `iphone.html?id=${iphone.id}`;
                    });
                    iphoneList.appendChild(div);
                });
            }

            if (repairList) {
                const urlParams = new URLSearchParams(window.location.search);
                const iphoneId = urlParams.get("id");
                const selectedIphone = data.iphones.find(iphone => iphone.id === iphoneId);

                if (selectedIphone) {
                    iphoneTitle.textContent = selectedIphone.nom;
                    selectedIphone.reparations.forEach(reparation => {
                        let p = document.createElement("p");
                        p.textContent = reparation.nom;
                        repairList.appendChild(p);
                    });
                } else {
                    iphoneTitle.textContent = "iPhone non trouvé";
                }
            }
        });
});