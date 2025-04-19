// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل السلايدر
    initHeroSlider();
    
    // تفعيل شريط البحث
    initSearchBar();
    
    // تفعيل زر التمرير للأعلى
    initScrollTop();
    
    // تفعيل القائمة المتنقلة
    initMobileMenu();
    
    // تفعيل البحث الآني
    initLiveSearch();
    
    // تفعيل العرض السريع للمنتجات
    initQuickView();
    
    // تحميل الوضع المظلم إذا كان مفعل
    loadDarkMode();
});

// دالة السلايدر الرئيسي
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 ثواني
    
    // عرض الشريحة الحالية
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // الانتقال للشريحة التالية
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // بدء السلايدر التلقائي
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // إيقاف السلايدر التلقائي
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // أحداث الأزرار
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        stopSlider();
        startSlider();
    });
    
    // أحداث النقاط
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlider();
            startSlider();
        });
    });
    
    // بدء السلايدر
    showSlide(0);
    startSlider();
    
    // إيقاف السلايدر عند التحويم
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
}

// دالة شريط البحث
function initSearchBar() {
    const searchBtn = document.querySelector('.search-btn');
    const closeSearch = document.querySelector('.close-search');
    const searchBar = document.querySelector('.search-bar');
    
    searchBtn.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchBar.querySelector('input').focus();
        }
    });
    
    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });
}

// دالة زر التمرير للأعلى
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// دالة القائمة المتنقلة
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// دالة البحث الآني
function initLiveSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.querySelector('.search-results');
    
    // بيانات وهمية للبحث (في الواقع ستكون من قاعدة بيانات)
    const dummyProducts = [
        { id: 1, name: 'آيفون 13 برو', price: '1,200 د.ك', category: 'إلكترونيات', image: 'images/product1.jpg', location: 'الكويت' },
        { id: 2, name: 'ساعة أبل الذكية', price: '250 د.ك', category: 'إلكترونيات', image: 'images/product2.jpg', location: 'حولي' },
        { id: 3, name: 'حذاء رياضي نايك', price: '45 د.ك', category: 'أزياء', image: 'images/product3.jpg', location: 'الفروانية' },
        { id: 4, name: 'كاميرا كانون EOS', price: '350 د.ك', category: 'إلكترونيات', image: 'images/product4.jpg', location: 'السالمية' },
        { id: 5, name: 'ساعة يد فاخرة', price: '180 د.ك', category: 'أزياء', image: 'images/product5.jpg', location: 'الجهراء' },
        { id: 6, name: 'حقيبة ظهر جلدية', price: '75 د.ك', category: 'أزياء', image: 'images/product6.jpg', location: 'الفحيحيل' },
        { id: 7, name: 'دراجة هوائية جبلية', price: '150 د.ك', category: 'مركبات', image: 'images/product7.jpg', location: 'مبارك الكبير' },
        { id: 8, name: 'سماعات لاسلكية', price: '65 د.ك', category: 'إلكترونيات', image: 'images/product8.jpg', location: 'الشويخ' }
    ];

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (searchTerm.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const filteredProducts = dummyProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>${product.price} • ${product.category} • ${product.location}</p>
                    </div>
                `;
                resultItem.addEventListener('click', () => {
                    window.location.href = `product-details.html?id=${product.id}`;
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.classList.add('active');
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'لا توجد نتائج مطابقة للبحث';
            searchResults.appendChild(noResults);
            searchResults.classList.add('active');
        }
    });

    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// دالة العرض السريع للمنتجات
function initQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // بيانات وهمية للمنتجات (في الواقع ستكون من قاعدة بيانات)
    const dummyProducts = {
        1: {
            name: 'آيفون 13 برو',
            price: '1,200 د.ك',
            category: 'إلكترونيات',
            location: 'الكويت',
            date: 'منذ يومين',
            rating: 4.5,
            ratingCount: 24,
            description: 'آيفون 13 برو بحالة ممتازة، السعة 256 جيجابايت، اللون أزرق، مع علبته الأصلية وكل ملحقاته. البطارة صحتها 100%.',
            images: ['images/product1.jpg', 'images/product1-2.jpg', 'images/product1-3.jpg'],
            seller: {
                name: 'أحمد محمد',
                joinDate: 'منذ سنة',
                rating: 4.8,
                products: 12
            }
        },
        2: {
            name: 'ساعة أبل الذكية',
            price: '250 د.ك',
            category: 'إلكترونيات',
            location: 'حولي',
            date: 'منذ أسبوع',
            rating: 4,
            ratingCount: 12,
            description: 'ساعة أبل الذكية Series 7، مقاس 45 مم، شاشة دائماً مضاءة، مقاومة للماء، مع شاحنها الأصلي وحزام إضافي.',
            images: ['images/product2.jpg', 'images/product2-2.jpg'],
            seller: {
                name: 'سارة خالد',
                joinDate: 'منذ 6 أشهر',
                rating: 4.5,
                products: 7
            }
        }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.querySelector('.product-title').textContent.includes('آيفون') ? 1 : 2;
            const product = dummyProducts[productId];

            // ملء بيانات المنتج في النموذج
            modalBody.innerHTML = `
                <div class="modal-product-images">
                    <div class="main-product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="product-thumbnails">
                        ${product.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${product.name}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-product-details">
                    <h2>${product.name}</h2>
                    <div class="product-price">${product.price}</div>
                    <div class="product-meta">
                        <div class="meta-item">
                            <i class="fas fa-tag"></i>
                            <span>${product.category}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${product.location}</span>
                        </div>
                        <div class="meta-item">
                            <i class="far fa-clock"></i>
                            <span>${product.date}</span>
                        </div>
                    </div>
                    <div class="product-rating">
                        ${renderRatingStars(product.rating)}
                        <span>(${product.ratingCount} تقييمات)</span>
                    </div>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="seller-info">
                        <h3>معلومات البائع</h3>
                        <div class="seller-details">
                            <img src="images/user-avatar.jpg" alt="${product.seller.name}">
                            <div>
                                <h4>${product.seller.name}</h4>
                                <p>عضو منذ ${product.seller.joinDate}</p>
                                <div class="seller-rating">
                                    ${renderRatingStars(product.seller.rating)}
                                    <span>${product.seller.products} منتجات</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="text" class="quantity-input" value="1" readonly>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i>
                            أضف إلى السلة
                        </button>
                    </div>
                </div>
            `;

            // عرض النموذج
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // تفعيل معاينة الصور المصغرة
            initThumbnailsPreview();
            
            // تفعيل عداد الكمية
            initQuantitySelector();
        });
    });

    // إغلاق النموذج
    closeModal.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // إغلاق النموذج عند النقر خارج المحتوى
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // دالة مساعدة لعرض النجوم
    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
}

// دالة معاينة الصور المصغرة
function initThumbnailsPreview() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-product-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // إزالة التنشيط من جميع الصور المصغرة
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // تفعيل الصورة المحددة
            this.classList.add('active');
            
            // تغيير الصورة الرئيسية
            mainImage.src = this.querySelector('img').src;
            
            // إضافة تأثير انتقالي
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
}

// دالة عداد الكمية
function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
}

// دالة تحميل الوضع المظلم
function loadDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.fa-moon').style.opacity = '0';
        themeToggle.querySelector('.fa-sun').style.opacity = '1';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('.fa-moon').style.opacity = '1';
        themeToggle.querySelector('.fa-sun').style.opacity = '0';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isNowDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDarkMode);
        
        themeToggle.querySelector('.fa-moon').style.opacity = isNowDarkMode ? '0' : '1';
        themeToggle.querySelector('.fa-sun').style.opacity = isNowDarkMode ? '1' : '0';
    });
}

// دالة تحميل المزيد من المنتجات (لصفحة المنتجات)
function loadMoreProducts() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        
        // محاكاة جلب بيانات من الخادم
        setTimeout(() => {
            const productsGrid = document.querySelector('.products-grid');
            
            // بيانات وهمية للمنتجات الإضافية
            const dummyProducts = [
                {
                    id: 9,
                    name: 'جهاز ماك بوك برو',
                    price: '800 د.ك',
                    category: 'إلكترونيات',
                    image: 'images/product9.jpg',
                    location: 'السالمية',
                    date: 'منذ 4 أيام',
                    rating: 4.7,
                    badge: 'جديد'
                },
                {
                    id: 10,
                    name: 'كاميرا كانون',
                    price: '300 د.ك',
                    category: 'إلكترونيات',
                    image: 'images/product10.jpg',
                    location: 'حولي',
                    date: 'منذ أسبوع',
                    rating: 4.2,
                    badge: ''
                },
                {
                    id: 11,
                    name: 'حذاء رياضي اديداس',
                    price: '50 د.ك',
                    category: 'أزياء',
                    image: 'images/product11.jpg',
                    location: 'الفروانية',
                    date: 'منذ 3 أيام',
                    rating: 4.0,
                    badge: ''
                },
                {
                    id: 12,
                    name: 'نظارة شمسية راي بان',
                    price: '35 د.ك',
                    category: 'أزياء',
                    image: 'images/product12.jpg',
                    location: 'الجهراء',
                    date: 'منذ يوم',
                    rating: 4.5,
                    badge: 'خصم'
                }
            ];

            // إضافة المنتجات الجديدة
            dummyProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.setAttribute('data-aos', 'fade-up');
                
                if (product.badge) {
                    productCard.innerHTML = `
                        <div class="product-badge">${product.badge}</div>
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-actions">
                                <button class="quick-view"><i class="fas fa-eye"></i></button>
                                <button class="add-favorite"><i class="far fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="product-details">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">${product.price}</div>
                            <div class="product-meta">
                                <span class="product-location"><i class="fas fa-map-marker-alt"></i> ${product.location}</span>
                                <span class="product-date"><i class="far fa-clock"></i> ${product.date}</span>
                            </div>
                            <div class="product-rating">
                                ${renderRatingStars(product.rating)}
                                <span>(${Math.floor(Math.random() * 20) + 5})</span>
                            </div>
                        </div>
                    `;
                } else {
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-actions">
                                <button class="quick-view"><i class="fas fa-eye"></i></button>
                                <button class="add-favorite"><i class="far fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="product-details">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">${product.price}</div>
                            <div class="product-meta">
                                <span class="product-location"><i class="fas fa-map-marker-alt"></i> ${product.location}</span>
                                <span class="product-date"><i class="far fa-clock"></i> ${product.date}</span>
                            </div>
                            <div class="product-rating">
                                ${renderRatingStars(product.rating)}
                                <span>(${Math.floor(Math.random() * 20) + 5})</span>
                            </div>
                        </div>
                    `;
                }
                
                productsGrid.appendChild(productCard);
            });

            // إعادة تهيئة العرض السريع للمنتجات الجديدة
            initQuickView();
            
            // إعادة تهيئة VanillaTilt للمنتجات الجديدة
            VanillaTilt.init(document.querySelectorAll(".product-card"), {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.1,
            });
            
            // إعادة تهيئة AOS للمنتجات الجديدة
            AOS.refresh();
            
            // إخفاء زر التحميل إذا وصلنا للحد الأقصى (في الواقع الفعلي سيكون من الخادم)
            this.style.display = 'none';
        }, 1500);
    });
}

// دالة مساعدة لعرض النجوم (لصفحة المنتجات)
function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}