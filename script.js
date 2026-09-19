document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const banner = document.getElementById("banner");
    const bannerTitle = document.getElementById("banner-title");
    const bannerDesc = document.getElementById("banner-desc");
    const btnPlay = document.getElementById("btn-play");
    const btnInfo = document.getElementById("btn-info");
    const items = document.querySelectorAll(".item img");

    const btnSlideLeft = document.getElementById("btn-slide-left");
    const btnSlideRight = document.getElementById("btn-slide-right");

    // Modal Elements
    const modal = document.getElementById("info-modal");
    const closeModal = document.getElementById("close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");

    // Backsound Audio Setup
    const bgMusic = document.getElementById("bg-music");

    if (bgMusic) {
        bgMusic.volume = 0.3;

        const enableAudio = () => {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                document.removeEventListener("click", enableAudio);
                document.removeEventListener("touchstart", enableAudio);
                document.removeEventListener("keydown", enableAudio);
            }).catch((err) => {
                console.warn("Audio play blocked:", err);
            });
        };

        document.addEventListener("click", enableAudio, { once: true });
        document.addEventListener("touchstart", enableAudio, { once: true });
        document.addEventListener("keydown", enableAudio, { once: true });
    }

    // Fungsi geser slider
    if (btnSlideRight) {
        btnSlideRight.addEventListener("click", () => {
            slider.scrollBy({ left: 300, behavior: "smooth" });
        });
    }

    if (btnSlideLeft) {
        btnSlideLeft.addEventListener("click", () => {
            slider.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    // Ubah banner saat gambar diklik
    items.forEach((img) => {
        function updateBanner() {
            const imageSrc = img.src;
            const title = img.getAttribute("data-title") || "KORSEL";
            const desc = img.getAttribute("data-desc") || "kebersamaan yang akan selalu abadi dalam sanubari";
            const videoUrl = img.getAttribute("data-video") || "#";

            banner.style.backgroundImage = `
                linear-gradient(to right, rgba(0, 0, 0, 0.95) 25%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%),
                linear-gradient(to top, #000 5%, transparent 40%),
                url('${imageSrc}')
            `;

            if (bannerTitle) bannerTitle.textContent = title;
            if (bannerDesc) bannerDesc.textContent = desc;
            if (btnPlay) btnPlay.setAttribute("href", videoUrl);

            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;
        }

        img.addEventListener("click", updateBanner);
    });

    // Control Modal Info
    if (btnInfo && modal) {
        btnInfo.addEventListener("click", () => { 
            modal.style.display = "flex"; 
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => { 
            modal.style.display = "none"; 
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) { 
            modal.style.display = "none"; 
        }
    });
});