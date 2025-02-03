document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionIndex = 0;
  let questions = [];
  let score = 0;

  // Fetch quiz questions from the backend
  fetch("/api/questions")
      .then(response => response.json())
      .then(data => {
          questions = data;
          displayQuestion();
      })
      .catch(error => console.error("Error fetching questions:", error));

  function displayQuestion() {
      if (questions.length === 0) {
          document.getElementById("question-container").innerHTML = "<p>No questions found.</p>";
          return;
      }

      document.getElementById("question-container").innerHTML = `<h2>${questions[currentQuestionIndex].question}</h2>`;
      document.getElementById("answer-input").value = "";
      document.getElementById("result").textContent = "";
  }

  document.getElementById("submit-btn").addEventListener("click", () => {
      const userAnswer = document.getElementById("answer-input").value.trim();
      if (!userAnswer) {
          alert("Please enter an answer!");
          return;
      }

      // Send answer to backend
      fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              question: questions[currentQuestionIndex].question,
              answer: userAnswer
          })
      })
      .then(response => response.json())
      .then(data => {
          const resultText = document.getElementById("result");
          if (data.correct) {
              score++;
              document.getElementById("score").textContent = `Score: ${score}`;
              resultText.textContent = "✅ Correct!";
              resultText.style.color = "green";
          } else {
              resultText.textContent = "❌ Incorrect! Try again.";
              resultText.style.color = "red";
          }
      })
      .catch(error => console.error("Error submitting answer:", error));
  });

  document.getElementById("next-btn").addEventListener("click", () => {
      currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
      displayQuestion();
  });
});
