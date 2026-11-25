document.addEventListener("DOMContentLoaded", () => {
  // 1. Gentle Snowfall Effect on Christmas Hero Banner
  const snowContainer = document.getElementById("snowContainer");
  if (snowContainer) {
    const flakeCount = 28;
    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement("span");
      flake.classList.add("snowflake");
      const size = Math.random() * 5 + 3; // 3px to 8px
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${Math.random() * 7 + 7}s`;
      flake.style.animationDelay = `${Math.random() * 6}s`;
      snowContainer.appendChild(flake);
    }
  }

  // 2. Mobile Navigation Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-item");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 3. Active Nav State on Scroll
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  });

  // 4. Donation QR Channel Switcher
  const channels = {
    gcash: {
      title: "GCash Account",
      name: "Derwin Abe",
      number: "0935 791 6053",
      // Replace with your local image path e.g. "images/qr-gcash.png"
      qrSrc: "images/gcash-qr.png"
    },
    maya: {
      title: "Maya Account",
      name: "Aerolle Sana",
      number: "0929 228 1169",
      // Replace with your local image path e.g. "images/qr-maya.png"
      qrSrc: "images/maya-qr.png"
    },
    bank: {
      title: "GoTyme Bank",
      name: "Aerolle Tarcelo Sana",
      number: "0929 228 1169",
      // Replace with your local image path e.g. "images/qr-bank.png"
      qrSrc: "images/gotyme-qr.png"
    }
  };

  const tabButtons = document.querySelectorAll(".tab-btn");
  const qrImage = document.getElementById("qrImage");
  const channelTitle = document.getElementById("channelTitle");
  const accountName = document.getElementById("accountName");
  const accountNumber = document.getElementById("accountNumber");
  const copyAccountBtn = document.getElementById("copyAccountBtn");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selected = channels[btn.getAttribute("data-channel")];
      qrImage.src = selected.qrSrc;
      channelTitle.textContent = selected.title;
      accountName.innerHTML = `Account Name: <strong>${selected.name}</strong>`;
      accountNumber.textContent = selected.number;
    });
  });

  // 5. Copy Account Number Button
  copyAccountBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(accountNumber.textContent).then(() => {
      copyAccountBtn.textContent = "Copied!";
      setTimeout(() => {
        copyAccountBtn.textContent = "Copy";
      }, 2000);
    });
  });
});