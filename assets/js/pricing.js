document.addEventListener("DOMContentLoaded", () => {
  const periodButtons = document.querySelectorAll(".toggle-btn");
  const priceElements = document.querySelectorAll(".plan-price");
  const periodElements = document.querySelectorAll(".plan-period");

  const updatePrices = (period) => {
    priceElements.forEach((priceEl) => {
      if (period === "monthly") {
        priceEl.textContent = priceEl.dataset.monthlyPrice;
      } else if (period === "annually") {
        priceEl.textContent = priceEl.dataset.annuallyPrice;
      }
    });

    periodElements.forEach((periodEl) => {
      if (period === "monthly") {
        periodEl.textContent = periodEl.dataset.monthlyText;
      } else if (period === "annually") {
        periodEl.textContent = periodEl.dataset.annuallyText;
      }
    });
  };

  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      periodButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const selectedPeriod = this.dataset.period;

      updatePrices(selectedPeriod);
    });
  });

  updatePrices("monthly");
});
