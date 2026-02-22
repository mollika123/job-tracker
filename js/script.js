document.addEventListener("DOMContentLoaded", function () {

  const totalCount = document.getElementById("totalCount");
  const interviewCount = document.getElementById("interviewCount");
  const rejectedCount = document.getElementById("rejectedCount");

  const allBtn = document.getElementById("all-filter-btn");
  const interviewBtn = document.getElementById("interview-filter-btn");
  const rejectedBtn = document.getElementById("rejected-filter-btn");

  const cards = document.querySelectorAll(".container");

  // Initialize status
  cards.forEach(card => {
    card.dataset.status = "not-applied";
  });

  // ==============================
  // Update Dashboard Count
  // ==============================
  function updateDashboard() {
    const allCards = document.querySelectorAll(".container");

    let interview = 0;
    let rejected = 0;

    allCards.forEach(card => {
      if (card.dataset.status === "interview") interview++;
      if (card.dataset.status === "rejected") rejected++;
    });

    totalCount.innerText = allCards.length;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;
  }

  // ==============================
  // Active Filter Button
  // ==============================
  function setActiveButton(activeBtn) {
    const buttons = [allBtn, interviewBtn, rejectedBtn];

    buttons.forEach(btn => {
      btn.classList.remove("bg-[#3B82F6]", "text-white");
      btn.classList.add("text-[#64748B]");
    });

    activeBtn.classList.add("bg-[#3B82F6]", "text-white");
    activeBtn.classList.remove("text-[#64748B]");
  }

  // ==============================
  // Filter Logic
  // ==============================
  function filterCards(type) {
    cards.forEach(card => {
      if (type === "all") {
        card.style.display = "flex";
      } else if (card.dataset.status === type) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // ==============================
  // Interview Button
  // ==============================
  document.querySelectorAll(".interview-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      const card = this.closest(".container");
      const statusBtn = card.querySelector(".not-applied-btn");

      if (card.dataset.status === "interview") {
        card.dataset.status = "not-applied";
        statusBtn.innerText = "Not Applied";
        statusBtn.className =
          "not-applied-btn bg-green-200 text-[#002C5C] px-3 py-2 font-semibold rounded-md mt-5";
      } else {
        card.dataset.status = "interview";
        statusBtn.innerText = "Interview";
        statusBtn.className =
          "not-applied-btn bg-green-500 text-white px-3 py-2 font-semibold rounded-md mt-5";
      }

      updateDashboard();
    });
  });

  // ==============================
  // Rejected Button
  // ==============================
  document.querySelectorAll(".rejected-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      const card = this.closest(".container");
      const statusBtn = card.querySelector(".not-applied-btn");

      if (card.dataset.status === "rejected") {
        card.dataset.status = "not-applied";
        statusBtn.innerText = "Not Applied";
        statusBtn.className =
          "not-applied-btn bg-green-200 text-[#002C5C] px-3 py-2 font-semibold rounded-md mt-5";
      } else {
        card.dataset.status = "rejected";
        statusBtn.innerText = "Rejected";
        statusBtn.className =
          "not-applied-btn bg-red-500 text-white px-3 py-2 font-semibold rounded-md mt-5";
      }

      updateDashboard();
    });
  });

  // ==============================
  // Delete Button
  // ==============================
  document.querySelectorAll(".fa-trash-can").forEach(icon => {
    icon.parentElement.addEventListener("click", function () {
      const card = this.closest(".container");
      card.remove();
      updateDashboard();
    });
  });

  // ==============================
  // Filter Buttons
  // ==============================
  allBtn.addEventListener("click", function () {
    filterCards("all");
    setActiveButton(this);
  });

  interviewBtn.addEventListener("click", function () {
    filterCards("interview");
    setActiveButton(this);
  });

  rejectedBtn.addEventListener("click", function () {
    filterCards("rejected");
    setActiveButton(this);
  });

  // Default
  setActiveButton(allBtn);
  updateDashboard();
});