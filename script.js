// ========================================
// CAMPUS LOST & FOUND - JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Campus Lost & Found JS is working!");

    // ========================================
    // LOST FORM
    // ========================================

    const lostForm = document.querySelector(".lost-form");

    // Check karna ki Lost Form mila ya nahi
    console.log(lostForm);

    if (lostForm) {

        // Lost Form submit
        lostForm.addEventListener("submit", function (event) {

            // Page refresh hone se rokna
            event.preventDefault();

            console.log("Lost form submitted!");

            // ========================================
            // FORM SE DATA LENA
            // ========================================

            const inputs = lostForm.querySelectorAll("input");

            const itemName = inputs[0].value.trim();
            const category = inputs[1].value.trim();
            const itemColor = inputs[2].value.trim();
            const dateLost = inputs[3].value;
            const location = inputs[4].value.trim();
            const description =
                lostForm.querySelector("textarea").value.trim();
            const contact = inputs[6].value.trim();

            const imageInput = document.querySelector("#itemImage");
            const imageFile = imageInput.files[0];

            const reader = new FileReader();

            reader.onload = function () {

                // ========================================
                // EMPTY FIELD CHECK
                // ========================================

                if (
                    itemName === "" ||
                    category === "" ||
                    itemColor === "" ||
                    dateLost === "" ||
                    location === "" ||
                    description === "" ||
                    contact === ""
                ) {
                    alert("Please fill all the fields!");
                    return;
                }

                // ========================================
                // LOST ITEM OBJECT
                // ========================================

                const lostItem = {
                    itemName: itemName,
                    category: category,
                    itemColor: itemColor,
                    dateLost: dateLost,
                    location: location,
                    description: description,
                    contact: contact,
                    image: reader.result
                };

                // Console mein check karna
                console.log("New Lost Item:", lostItem);

                // ========================================
                // PURANE LOST ITEMS LENA
                // ========================================

                let lostItems =
                    JSON.parse(localStorage.getItem("lostItems")) || [];

                // ========================================
                // NAYA ITEM LIST MEIN ADD KARNA
                // ========================================

                lostItems.push(lostItem);

                // ========================================
                // LOCAL STORAGE MEIN SAVE KARNA
                // ========================================

                localStorage.setItem(
                    "lostItems",
                    JSON.stringify(lostItems)
                );

                console.log("All Lost Items:", lostItems);

                // ========================================
                // SUCCESS MESSAGE
                // ========================================

                alert("Lost item reported successfully!");

                // ========================================
                // FORM RESET
                // ========================================

                lostForm.reset();

            };

            // ========================================
            // IMAGE READ KARNA
            // ========================================

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            }

        });

    }

});

// ========================================
// FOUND FORM
// ========================================

const foundForm = document.querySelector(".found-form");

if (foundForm) {

    foundForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // ========================================
        // FORM SE DATA LENA
        // ========================================

        const inputs = foundForm.querySelectorAll("input");

        const itemName = inputs[0].value.trim();
        const category = inputs[1].value.trim();
        const itemColor = inputs[2].value.trim();
        const dateFound = inputs[3].value;
        const location = inputs[4].value.trim();
        const contact = inputs[6].value.trim();

        const description =
            foundForm.querySelector("textarea").value.trim();

        const imageInput =
            document.querySelector("#foundItemImage");

        const imageFile = imageInput.files[0];

        const reader = new FileReader();

        reader.onload = function () {

            // ========================================
            // EMPTY FIELD CHECK
            // ========================================

            if (
                itemName === "" ||
                category === "" ||
                itemColor === "" ||
                dateFound === "" ||
                location === "" ||
                description === "" ||
                contact === ""
            ) {
                alert("Please fill all the fields!");
                return;
            }

            // ========================================
            // FOUND ITEM OBJECT
            // ========================================

            const foundItem = {
                itemName: itemName,
                category: category,
                itemColor: itemColor,
                dateFound: dateFound,
                location: location,
                description: description,
                contact: contact,
                image: reader.result
            };

            console.log("New Found Item:", foundItem);

            // ========================================
            // PURANE FOUND ITEMS LENA
            // ========================================

            let foundItems =
                JSON.parse(localStorage.getItem("foundItems")) || [];

            // ========================================
            // NAYA ITEM ADD KARNA
            // ========================================

            foundItems.push(foundItem);

            // ========================================
            // LOCAL STORAGE MEIN SAVE
            // ========================================

            localStorage.setItem(
                "foundItems",
                JSON.stringify(foundItems)
            );

            console.log("All Found Items:", foundItems);

            // ========================================
            // SUCCESS MESSAGE
            // ========================================

            alert("Found item reported successfully!");

            // ========================================
            // FORM RESET
            // ========================================

            foundForm.reset();

        };

        // ========================================
        // IMAGE READ KARNA
        // ========================================

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }

    });

}


// ========================================
// BROWSE LOST + FOUND ITEMS
// ========================================

const itemsContainer = document.querySelector("#itemsContainer");

if (itemsContainer) {

    const lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];

    const foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];

    // Lost items mein status add
    const allLostItems = lostItems.map(function (item) {
        return {
            ...item,
            status: "Lost"
        };
    });

    // Found items mein status add
    const allFoundItems = foundItems.map(function (item) {
        return {
            ...item,
            status: "Found"
        };
    });

    // Dono ko ek list mein lana
    const allItems = [...allLostItems, ...allFoundItems];

    allItems.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "item-card";

        card.innerHTML = `
            <img src="${item.image}" 
                 alt="${item.itemName}" 
                 class="item-image">

            <h3>${item.itemName}</h3>

            <p>
                <strong>Status:</strong>
                <span class="${item.status === "Lost" ? "lost-status" : "found-status"}">
                    ${item.status}
                </span>
            </p>

            <p><strong>Category:</strong> ${item.category}</p>

            <p><strong>Color:</strong> ${item.itemColor}</p>

            <p><strong>Location:</strong> ${item.location}</p>

            <p><strong>Date:</strong> ${item.status === "Lost" ? item.dateLost : item.dateFound}</p>

            <p><strong>Description:</strong> ${item.description}</p>

            <p><strong>Contact:</strong> ${item.contact}</p>
        `;

        itemsContainer.appendChild(card);

    });

}

// ========================================
// SEARCH ITEMS
// ========================================

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

if (searchInput && searchButton) {

    searchButton.addEventListener("click", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const cards =
            document.querySelectorAll(".item-card");

        cards.forEach(function (card) {

            const itemName =
                card.querySelector("h3").textContent.toLowerCase();

            if (itemName.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// ========================================
// FILTER ITEMS
// ========================================

const itemFilter = document.querySelector("#itemFilter");

if (itemFilter) {

    itemFilter.addEventListener("change", function () {

        const selectedFilter = itemFilter.value;

        const cards =
            document.querySelectorAll(".item-card");

        cards.forEach(function (card) {

    const status =
        card.querySelector(".lost-status, .found-status").textContent.trim();

    if (selectedFilter === "All Items") {

        card.style.display = "block";

    }

    else if (
        selectedFilter === "Lost Items" &&
        status === "Lost"
    ) {

        card.style.display = "block";

    }

    else if (
        selectedFilter === "Found Items" &&
        status === "Found"
    ) {

        card.style.display = "block";

    }

    else {

        card.style.display = "none";

    }

});

    });

}

// ========================================
// CONTACT FORM
// ========================================

const contactButton =
    document.querySelector(".message-box button");

if (contactButton) {

    contactButton.addEventListener("click", function () {

        const inputs =
            document.querySelectorAll(".message-box input");

        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();

        const message =
            document.querySelector(".message-box textarea").value.trim();

        // ========================================
        // EMPTY FIELD CHECK
        // ========================================

        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {
            alert("Please fill all the fields!");
            return;
        }

        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        alert("Message sent successfully! We will get back to you soon.");

        // ========================================
        // FORM CLEAR
        // ========================================

        inputs[0].value = "";
        inputs[1].value = "";
        document.querySelector(".message-box textarea").value = "";

    });

}