// Typed.js untuk animasi teks
var typed = new Typed(".input", {
    strings: ["App Developer", "Web Developer"],
    typeSpeed: 70,
    backSpeed: 55,
    loop: true
});

// Event listener untuk memastikan DOM sudah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".certificates .card img");
    const zoomOverlay = document.getElementById("zoomOverlay");
    const zoomModal = document.getElementById("zoomModal");
    const zoomImage = document.getElementById("zoomImage");
    
    // Fungsi untuk animasi yang lebih halus
    const animate = (element, keyframes, options) => {
        return element.animate(keyframes, options).finished;
    };

    // Fungsi untuk membuka modal dengan animasi
    const openModal = async (imageSrc) => {
        zoomImage.src = imageSrc;
        zoomModal.classList.add("active");
        zoomOverlay.classList.add("active");
        document.body.style.overflow = 'hidden'; // Mencegah scroll pada background
        
        await animate(zoomModal, [
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' },
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    };

    // Fungsi untuk menutup modal dengan animasi
    const closeModal = async () => {
        await animate(zoomModal, [
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' }
        ], {
            duration: 200,
            easing: 'ease-in'
        });
        
        zoomModal.classList.remove("active");
        zoomOverlay.classList.remove("active");
        document.body.style.overflow = ''; // Mengembalikan scroll pada background
    };

    // Event listener untuk setiap gambar sertifikat
    images.forEach((image) => {
        image.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(image.src);
        });
    });

    // Menutup modal ketika mengklik overlay
    zoomOverlay.addEventListener("click", closeModal);

    // Menutup modal dengan tombol Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && zoomModal.classList.contains("active")) {
            closeModal();
        }
    });

    // Toggle menu untuk navbar pada tampilan mobile
    const toggleBtn = document.querySelector('.togglebtn');
    const navlinks = document.querySelector('.navlinks');
    let menuOpen = false;

    toggleBtn.addEventListener('click', () => {
        if (!menuOpen) {
            toggleBtn.classList.add('click');
            navlinks.classList.add('open');
            menuOpen = true;
        } else {
            toggleBtn.classList.remove('click');
            navlinks.classList.remove('open');
            menuOpen = false;
        }
    });

    // Menutup menu ketika link di navbar diklik
    const navLinks = document.querySelectorAll('.navlinks li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('click');
            navlinks.classList.remove('open');
            menuOpen = false;
        });
    });

    // Smooth scroll untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mencegah scroll pada background ketika modal terbuka
    const handleScroll = (e) => {
        if (zoomModal.classList.contains("active")) {
            e.preventDefault();
        }
    };

    // Event listener untuk mencegah scroll
    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchmove", handleScroll, { passive: false });

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Anda bisa menambahkan logika untuk mengirim email di sini
            // Contoh: menggunakan service seperti EmailJS atau backend server Anda

            // Contoh alert sederhana
            alert('Terima kasih! Pesan Anda akan segera kami proses.');
            contactForm.reset();
        });
    }
});