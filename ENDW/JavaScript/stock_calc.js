// stockApp.js

// Load Items and Brands from a JSON file
let items = [];
let brands = [];

fetch('stockData.json')
    .then(response => response.json())
    .then(data => {
        items = data.items;
        brands = data.brands;
        populateItemDropdown();
    })
    .catch(err => console.error('Error loading stockData.json:', err));

const itemSelect = document.getElementById('item');
const brandSection = document.getElementById('brandSection');
const brandSelect = document.getElementById('brand');
const customBrandInput = document.getElementById('customBrand');

// Populate Item Dropdown
function populateItemDropdown() {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        itemSelect.appendChild(option);
    });
}

// Populate Brand Dropdown
function populateBrandDropdown() {
    brandSelect.innerHTML = '';
    brands.forEach(b => {
        const option = document.createElement('option');
        option.value = b;
        option.textContent = b;
        brandSelect.appendChild(option);
    });
    const otherOption = document.createElement('option');
    otherOption.value = 'Other';
    otherOption.textContent = 'Other';
    brandSelect.appendChild(otherOption);
}

// Show/hide Brand section for 5G items
itemSelect.addEventListener('change', function () {
    const selectedItem = items.find(i => i.id === this.value);
    if (selectedItem && selectedItem.id === 'IT014') { // 5G
        brandSection.classList.remove('d-none');
        populateBrandDropdown();
        brandSelect.required = true;
    } else {
        brandSection.classList.add('d-none');
        brandSelect.required = false;
        brandSelect.value = '';
        customBrandInput.value = '';
        customBrandInput.classList.add('d-none');
    }
});

// Show custom brand input if Other is selected
brandSelect.addEventListener('change', function () {
    if (this.value === 'Other') {
        customBrandInput.classList.remove('d-none');
        customBrandInput.required = true;
    } else {
        customBrandInput.classList.add('d-none');
        customBrandInput.required = false;
        customBrandInput.value = '';
    }
});

// Form submission
const stockForm = document.getElementById('stockForm');
stockForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let selectedBrand = brandSelect.value;
    if (selectedBrand === 'Other') {
        selectedBrand = customBrandInput.value.trim();
    }

    const data = {
        date: new Date().toISOString(),
        item_id: itemSelect.value,
        brand: selectedBrand || null,
        action: document.getElementById('action').value,
        pallets: Number(document.getElementById('pallets').value),
        pcs: Number(document.getElementById('pcs').value),
        entered_by: document.getElementById('user').value
    };

    console.log('DATA TO SEND:', data);

    // Replace YOUR_POWER_AUTOMATE_WEBHOOK_URL with your actual webhook
    fetch('YOUR_POWER_AUTOMATE_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('status').innerHTML = "<span class='text-success fw-bold'>✔ Stock entry recorded!</span>";
                stockForm.reset();
                brandSection.classList.add('d-none');
                customBrandInput.classList.add('d-none');
            } else {
                document.getElementById('status').innerHTML = "<span class='text-danger fw-bold'>❌ Error saving stock</span>";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('status').innerHTML = "<span class='text-danger fw-bold'>❌ Connection error</span>";
        });
});
