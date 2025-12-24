const WEBHOOK_URL = "https://default0765532a06c14f0f9f39394689f5f8.fe.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/598dd0d9f4fc40968db5db6c7a670b70/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cRD8UsRPm8Fp0AVNZQ4xVJD-GUGS0LnXsEsqyP9otrM";

const items = [
    { id: "ID001", name: "1.5 CTN" },
    { id: "ID002", name: "0.5 CTN" },
    { id: "ID003", name: "330 CTN" },
    { id: "ID004", name: "250 CTN" },
    { id: "ID005", name: "250 CUP" },
    { id: "ID006", name: "200(30) CUP" },
    { id: "ID007", name: "200(36) CUP" },
    { id: "ID008", name: "150 CUP" },
    { id: "ID009", name: "100 CUP" },
    { id: "ID010", name: "1.5 CP" },
    { id: "ID011", name: "0.5 CP" },
    { id: "ID012", name: "330 CP" },
    { id: "ID013", name: "250 CP" },
    { id: "ID014", name: "5 G" }

];

const itemSelect = document.getElementById("Items");

items.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    itemSelect.appendChild(option);
});

document.getElementById("StockForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedOption = itemSelect.options[itemSelect.selectedIndex];

    if (!selectedOption.value) {
        alert("Please select an item");
        return;
    }

    const payload = {
        Item_ID: selectedOption.value,
        /* Item: selectedOption.textContent,
        Std_Pcs: Number(selectedOption.dataset.stdpcs), */
        No_Pallet: Number(document.getElementById("No_Pallet").value),
        Loose_Pcs: Number(document.getElementById("Loose_Pcs").value),
        Action: document.getElementById("Action").value,
        User: document.getElementById("user").value.trim()
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Failed to submit stock");
        }

        alert("✅ Stock submitted successfully");

        document.getElementById("StockForm").reset();
        document.getElementById("No_Pallet").value = 0;
        document.getElementById("Loose_Pcs").value = 0;

    } catch (error) {
        console.error(error);
        alert("❌ Error submitting stock. Please try again.");
    }
});
