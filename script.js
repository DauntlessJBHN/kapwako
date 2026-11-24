document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
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

  // 2. Highlight Active Nav Link on Scroll
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
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

  // 3. Donation Amount Selection
  const amountButtons = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.getElementById("customAmount");

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      customAmountInput.value = btn.getAttribute("data-amount");
    });
  });

  customAmountInput.addEventListener("input", () => {
    amountButtons.forEach((b) => b.classList.remove("active"));
  });

  // 4. Copy Account Details to Clipboard
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });

  // 5. Handle Donation Form Submission & Live Progress Update
  let currentRaised = 22500;
  const targetGoal = 50000;

  const donationForm = document.getElementById("donationForm");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  const modal = document.getElementById("confirmationModal");
  const modalDonorName = document.getElementById("modalDonorName");
  const modalSummary = document.getElementById("modalSummary");
  const closeModal = document.getElementById("closeModal");
  const modalDoneBtn = document.getElementById("modalDoneBtn");

  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(customAmountInput.value) || 0;
    const name = document.getElementById("donorName").value.trim() || "Ka-Kapwa";
    const method = document.getElementById("paymentMethod").value;

    // Update progress bar
    currentRaised += amount;
    const percentage = Math.min(Math.round((currentRaised / targetGoal) * 100), 100);
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `₱${currentRaised.toLocaleString()} / ₱${targetGoal.toLocaleString()} (${percentage}%)`;

    // Show confirmation modal
    modalDonorName.textContent = name;
    modalSummary.textContent = `Your pledge of ₱${amount.toLocaleString()} via ${method} has been recorded for Kapwa Ko: Gift-Giving Activity for the PDLs of Batangas City Jail.`;
    modal.classList.add("show");

    donationForm.reset();
    customAmountInput.value = 500;
  });

  const hideModal = () => modal.classList.remove("show");
  closeModal.addEventListener("click", hideModal);
  modalDoneBtn.addEventListener("click", hideModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
});