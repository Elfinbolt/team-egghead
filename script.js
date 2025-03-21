import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Highlight.js initialization
  hljs.highlightAll()

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    // Save preference to localStorage
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }

  // Navigation active state
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Bar Chart
  const ctx = document.getElementById("barChart").getContext("2d")

  const barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"],
      datasets: [
        {
          label: "Completion Rate (%)",
          data: [85, 92, 78, 96, 88, 90],
          backgroundColor: [
            "rgba(79, 70, 229, 0.7)",
            "rgba(99, 102, 241, 0.7)",
            "rgba(129, 140, 248, 0.7)",
            "rgba(165, 180, 252, 0.7)",
            "rgba(199, 210, 254, 0.7)",
            "rgba(224, 231, 255, 0.7)",
          ],
          borderColor: [
            "rgba(79, 70, 229, 1)",
            "rgba(99, 102, 241, 1)",
            "rgba(129, 140, 248, 1)",
            "rgba(165, 180, 252, 1)",
            "rgba(199, 210, 254, 1)",
            "rgba(224, 231, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => value + "%",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => context.parsed.y + "%",
          },
        },
      },
    },
  })

  // Responsive chart resize
  window.addEventListener("resize", () => {
    barChart.resize()
  })

  // Image loading animation
  const galleryItems = document.querySelectorAll(".gallery-item img")

  galleryItems.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = 1
    })

    if (img.complete) {
      img.style.opacity = 1
    } else {
      img.style.opacity = 0
      img.style.transition = "opacity 0.5s ease-in-out"
    }
  })
})

