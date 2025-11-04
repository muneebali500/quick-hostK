// Data for different periods - Sales Chart
const salesData = {
  month: {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    sales: [650, 780, 580, 720, 650, 700, 480, 850, 720, 680, 750, 520],
    customers: [450, 580, 380, 520, 450, 500, 280, 650, 520, 480, 550, 320],
  },
  quarter: {
    labels: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"],
    sales: [2010, 2070, 2050, 1950],
    customers: [1410, 1470, 1450, 1350],
  },
  year: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    sales: [6200, 6800, 7500, 8100, 8500, 8080],
    customers: [4200, 4800, 5500, 6100, 6500, 6080],
  },
};

// Data for different periods - Income Chart
const incomeData = {
  yearly: {
    labels: [
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    values: [28000, 25000, 18000, 15000, 12000, 10000, 14000, 18000, 22000],
    total: "43,145.24 EGB",
  },
  quarterly: {
    labels: [
      "Q1 2023",
      "Q2 2023",
      "Q3 2023",
      "Q4 2023",
      "Q1 2024",
      "Q2 2024",
      "Q3 2024",
      "Q4 2024",
    ],
    values: [18500, 17200, 16800, 15200, 19500, 21000, 22500, 24000],
    total: "154,700.00 EGB",
  },
  monthly: {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    values: [
      21000, 20500, 19800, 21500, 22000, 23500, 22800, 24000, 23200, 24500,
      25000, 25500,
    ],
    total: "273,300.00 EGB",
  },
};

// Initialize Bar Chart
const salesBarCtx = document.getElementById("salesBarChart").getContext("2d");
let salesBarChart = new Chart(salesBarCtx, {
  type: "bar",
  data: {
    labels: salesData.month.labels,
    datasets: [
      {
        label: "المبيعات",
        data: salesData.month.sales,
        backgroundColor: "#009fd9",
        borderRadius: 4,
        barThickness: 8,
      },
      {
        label: "العملاء",
        data: salesData.month.customers,
        backgroundColor: "#009fd956",
        borderRadius: 4,
        barThickness: 8,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 200,
          font: { size: 11 },
          color: "#999",
        },
        grid: {
          color: "#f0f0f0",
          drawBorder: false,
        },
        border: { display: false },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { size: 11 },
          color: "#999",
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#009fd9",
        padding: 10,
        borderRadius: 6,
        displayColors: true,
      },
    },
  },
});

// Initialize Line Chart
const incomeLineCtx = document
  .getElementById("incomeLineChart")
  .getContext("2d");
let incomeLineChart = new Chart(incomeLineCtx, {
  type: "line",
  data: {
    labels: incomeData.yearly.labels,
    datasets: [
      {
        label: "الدخل",
        data: incomeData.yearly.values,
        borderColor: "#00bcd4",
        backgroundColor: "rgba(0, 188, 212, 0.1)",
        tension: 0.4,
        fill: false,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#00bcd4",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 10000,
        max: 30000,
        ticks: {
          stepSize: 5000,
          callback: function (value) {
            return value / 1000 + "k";
          },
          font: { size: 11 },
          color: "#999",
        },
        grid: {
          color: "#f0f0f0",
          drawBorder: false,
        },
        border: { display: false },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { size: 11 },
          color: "#999",
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#009fd9",
        padding: 10,
        borderRadius: 6,
        displayColors: false,
      },
    },
  },
});

// Sales Chart Dropdown Handler
document.querySelectorAll(".sales-period-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const period = this.dataset.period;
    const label = this.textContent;

    document.getElementById("salesPeriodLabel").textContent = label;

    const data = salesData[period];
    salesBarChart.data.labels = data.labels;
    salesBarChart.data.datasets[0].data = data.sales;
    salesBarChart.data.datasets[1].data = data.customers;

    // Adjust y-axis based on data
    const maxValue = Math.max(...data.sales, ...data.customers);
    salesBarChart.options.scales.y.max = Math.ceil(maxValue / 1000) * 1000;
    salesBarChart.options.scales.y.ticks.stepSize =
      salesBarChart.options.scales.y.max / 5;

    salesBarChart.update();
  });
});

// Income Chart Dropdown Handler
document.querySelectorAll(".income-period-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const period = this.dataset.period;
    const label = this.textContent;

    document.getElementById("incomePeriodLabel").textContent = label;

    const data = incomeData[period];
    document.getElementById("incomeValue").textContent = data.total;

    incomeLineChart.data.labels = data.labels;
    incomeLineChart.data.datasets[0].data = data.values;

    // Adjust y-axis based on data
    const minValue = Math.min(...data.values);
    const maxValue = Math.max(...data.values);
    incomeLineChart.options.scales.y.min = Math.floor(minValue / 5000) * 5000;
    incomeLineChart.options.scales.y.max = Math.ceil(maxValue / 5000) * 5000;

    incomeLineChart.update();
  });
});
