// Gallery data
const galleryData = {
    events: [
        'images/event1.jpg', 'images/event2.jpg', 'images/event3.jpg'
    ],
    campus: [
        'images/campus1.jpg', 'images/campus2.jpg', 'images/campus3.jpg'
    ],
    labs: [
        'images/lab1.jpg', 'images/lab2.jpg', 'images/lab3.jpg'
    ]
};

// Placeholder images for demo (using placeholder images)
const placeholderImages = {
    events: [
        'https://via.placeholder.com/400x300/1e3c72/ffffff?text=Annual+Convocation',
        'https://via.placeholder.com/400x300/2a5298/ffffff?text=Sports+Day',
        'https://via.placeholder.com/400x300/4a90e2/ffffff?text=Cultural+Fest'
    ],
    campus: [
        'https://via.placeholder.com/400x300/1e3c72/ffffff?text=Main+Campus',
        'https://via.placeholder.com/400x300/2a5298/ffffff?text=Library+Building',
        'https://via.placeholder.com/400x300/4a90e2/ffffff?text=Academic+Block'
    ],
    labs: [
        'https://via.placeholder.com/400x300/1e3c72/ffffff?text=Computer+Lab',
        'https://via.placeholder.com/400x300/2a5298/ffffff?text=Science+Lab',
        'https://via.placeholder.com/400x300/4a90e2/ffffff?text=Robotics+Lab'
    ]
};

let currentCategory = 'all';

// Display gallery items
const displayGallery = (category) => {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    let imagesToShow = [];
    
    if (category === 'all') {
        imagesToShow = [
            ...placeholderImages.events.map(img => ({ url: img, category: 'events' })),
            ...placeholderImages.campus.map(img => ({ url: img, category: 'campus' })),
            ...placeholderImages.labs.map(img => ({ url: img, category: 'labs' }))
        ];
    } else {
        imagesToShow = placeholderImages[category].map(img => ({ url: img, category }));
    }
    
    imagesToShow.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', image.category);
        galleryItem.innerHTML = `<img src="${image.url}" alt="Gallery Image ${index + 1}">`;
        galleryItem.addEventListener('click', () => openLightbox(image.url));
        galleryGrid.appendChild(galleryItem);
    });
};

// Lightbox functionality
const openLightbox = (imageUrl) => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageUrl;
        lightbox.classList.add('active');
    }
};

const closeLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
};

// Setup gallery filters
const setupGalleryFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery
            const category = btn.getAttribute('data-filter');
            currentCategory = category;
            displayGallery(category);
        });
    });
};

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.gallery-grid')) {
        displayGallery('all');
        setupGalleryFilters();
        
        // Setup lightbox close
        const closeBtn = document.querySelector('.close-lightbox');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        // Close lightbox on background click
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }
    }
});