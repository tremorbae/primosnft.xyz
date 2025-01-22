class PrimoBuilder {
    constructor() {
        this.canvas = document.getElementById('previewCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.traits = {};
        this.selectedTraits = {};
        this.loadingTraits = false;
        this.searchTerm = '';
        
        // Set canvas size
        this.canvas.width = 1000;
        this.canvas.height = 1000;

        this.initializeListeners();
        this.loadTraits();
        this.loadSavedCombinations();
    }

    async loadTraits() {
        try {
            this.loadingTraits = true;
            const traitCategories = [
                'Background', 'Base', 'Face', 'Brows', 'Clothing',
                'Eyes', 'Hair', 'Mouth', 'Accessories'
            ];

            for (const category of traitCategories) {
                const response = await fetch(`traits/${category.toLowerCase()}/manifest.json`);
                const traitList = await response.json();
                this.traits[category] = traitList;
            }

            // Load initial category
            this.loadTraitCategory('Background');
        } catch (error) {
            console.error('Error loading traits:', error);
        } finally {
            this.loadingTraits = false;
        }
    }

    loadTraitCategory(category) {
        const traitList = document.querySelector('.trait-list');
        traitList.innerHTML = '';

        if (!this.traits[category]) return;

        const filteredTraits = this.traits[category].filter(trait => 
            trait.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        filteredTraits.forEach(trait => {
            const traitElement = document.createElement('div');
            traitElement.className = 'trait-item';
            if (this.selectedTraits[category] === trait.name) {
                traitElement.classList.add('selected');
            }

            traitElement.innerHTML = `
                <img src="traits/${category.toLowerCase()}/${trait.filename}" alt="${trait.name}">
                <p>${trait.name}</p>
            `;

            traitElement.addEventListener('click', () => {
                this.selectTrait(category, trait);
            });

            traitList.appendChild(traitElement);
        });
    }

    selectTrait(category, trait) {
        this.selectedTraits[category] = trait.name;
        this.loadTraitCategory(category);
        this.renderPreview();
    }

    async renderPreview() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const categories = [
            'Background', 'Base', 'Face', 'Brows', 'Clothing',
            'Eyes', 'Hair', 'Mouth', 'Accessories'
        ];

        for (const category of categories) {
            const traitName = this.selectedTraits[category];
            if (!traitName) continue;

            const trait = this.traits[category].find(t => t.name === traitName);
            if (!trait) continue;

            await this.drawTraitImage(category, trait.filename);
        }
    }

    async drawTraitImage(category, filename) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                resolve();
            };
            img.onerror = reject;
            img.src = `traits/${category.toLowerCase()}/${filename}`;
        });
    }

    randomize() {
        Object.keys(this.traits).forEach(category => {
            const traitList = this.traits[category];
            const randomTrait = traitList[Math.floor(Math.random() * traitList.length)];
            this.selectedTraits[category] = randomTrait.name;
        });

        this.loadTraitCategory(document.querySelector('.trait-category.active').dataset.category);
        this.renderPreview();
    }

    reset() {
        this.selectedTraits = {};
        this.loadTraitCategory(document.querySelector('.trait-category.active').dataset.category);
        this.renderPreview();
    }

    download() {
        const link = document.createElement('a');
        link.download = 'my-primo.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    // Save and Load Functionality
    saveCombination() {
        const name = document.getElementById('combinationName').value.trim();
        if (!name) {
            this.showToast('Please enter a name for your creation');
            return;
        }

        const savedCombinations = this.getSavedCombinations();
        const combination = {
            name,
            traits: this.selectedTraits,
            timestamp: Date.now()
        };

        savedCombinations.push(combination);
        localStorage.setItem('primoCombinations', JSON.stringify(savedCombinations));
        
        this.loadSavedCombinations();
        document.getElementById('combinationName').value = '';
        this.showToast('Creation saved successfully!');
    }

    getSavedCombinations() {
        const saved = localStorage.getItem('primoCombinations');
        return saved ? JSON.parse(saved) : [];
    }

    loadSavedCombinations() {
        const savedList = document.querySelector('.saved-list');
        const combinations = this.getSavedCombinations();
        
        savedList.innerHTML = combinations.map((combo, index) => `
            <div class="saved-item" data-index="${index}">
                <span>${combo.name}</span>
                <button class="delete-saved" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Add event listeners
        savedList.querySelectorAll('.saved-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-saved')) {
                    const index = item.dataset.index;
                    this.loadCombination(combinations[index]);
                }
            });
        });

        savedList.querySelectorAll('.delete-saved').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = btn.dataset.index;
                this.deleteCombination(index);
            });
        });
    }

    loadCombination(combination) {
        this.selectedTraits = { ...combination.traits };
        this.loadTraitCategory(document.querySelector('.trait-category.active').dataset.category);
        this.renderPreview();
        this.showToast('Creation loaded!');
    }

    deleteCombination(index) {
        const combinations = this.getSavedCombinations();
        combinations.splice(index, 1);
        localStorage.setItem('primoCombinations', JSON.stringify(combinations));
        this.loadSavedCombinations();
        this.showToast('Creation deleted');
    }

    // Social Sharing
    async shareToTwitter() {
        const dataUrl = this.canvas.toDataURL('image/png');
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'primo.png', { type: 'image/png' });
        
        // You'll need to implement your own upload functionality here
        // For now, we'll just open Twitter with a pre-filled message
        const text = encodeURIComponent('Check out my custom Primo NFT! 🎨 #PrimosNFT');
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    }

    shareToDiscord() {
        // Implementation depends on your Discord integration
        this.showToast('Discord sharing coming soon!');
    }

    async copyShareLink() {
        // Generate a unique link to this combination
        const params = new URLSearchParams();
        params.set('traits', JSON.stringify(this.selectedTraits));
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        
        try {
            await navigator.clipboard.writeText(url);
            this.showToast('Share link copied to clipboard!');
        } catch (err) {
            this.showToast('Failed to copy link');
        }
    }

    // Search Functionality
    updateSearch(term) {
        this.searchTerm = term;
        this.loadTraitCategory(document.querySelector('.trait-category.active').dataset.category);
    }

    clearSearch() {
        document.getElementById('traitSearch').value = '';
        this.updateSearch('');
    }

    // Toast Notifications
    showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }

    initializeListeners() {
        // Category buttons
        document.querySelectorAll('.trait-category').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.trait-category').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                this.loadTraitCategory(button.dataset.category);
            });
        });

        // Search
        const searchInput = document.getElementById('traitSearch');
        searchInput.addEventListener('input', (e) => this.updateSearch(e.target.value));
        document.getElementById('clearSearch').addEventListener('click', () => this.clearSearch());

        // Control buttons
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomize());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('downloadBtn').addEventListener('click', () => this.download());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveCombination());

        // Share buttons
        document.getElementById('shareTwitter').addEventListener('click', () => this.shareToTwitter());
        document.getElementById('shareDiscord').addEventListener('click', () => this.shareToDiscord());
        document.getElementById('shareCopyLink').addEventListener('click', () => this.copyShareLink());

        // Load combination from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const traits = urlParams.get('traits');
        if (traits) {
            try {
                this.selectedTraits = JSON.parse(traits);
                this.renderPreview();
            } catch (e) {
                console.error('Invalid traits in URL');
            }
        }
    }
}

// Initialize the builder when the page loads
window.addEventListener('DOMContentLoaded', () => {
    window.primoBuilder = new PrimoBuilder();
});
