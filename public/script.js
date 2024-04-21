const form = document.getElementById("my-form");

// handle form sublit
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get all radio buttons with the name "fruit"
  const radios = form.querySelectorAll('input[type="radio"]');

  const selectedValues = [];
  // Iterate over radio buttons
  radios.forEach((radio) => {
    // Check if the radio button is checked
    if (radio.checked) {
      selectedValues.push({ ques_id: radio.name, selected_id: radio.id }); // Add the value to the array
    }
  });

  try {
    const response = await fetch("/api/v1/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedValues),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { wQues, wAns } = await response.json();

    if (Object.keys(wQues).length > 0) {
      for (let ques of wQues) {
        const container = document.getElementById(ques);

        container.classList.add("error-type");
        container.querySelector(
          "p"
        ).innerHTML = `Option ${wAns[ques]} is the correct answer.`;
      }
    } else {
      window.alert("Celebrations are in order! You've aced every question!");
    }
  } catch (error) {
    window.alert(error);
    console.log(error);
  }
});

// load questions from backend and add them to the DOM
document.addEventListener("DOMContentLoaded", async () => {
  try {
    //  backend fetch
    const response = await fetch("/api/v1/ques");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { questions } = await response.json();

    const dataContainer = document.getElementById("data-container");
    let displayContent = ``;

    displayContent = questions
      .map((question) => {
        const optionsContent = question.options
          .map((option) => {
            return `<div>
            <input type="radio" name=${question._id} id=${option.id} value=${option.value} required/>
            <label for=${option.id}>${option.value}</label>
           
            </div>
            `;
          })
          .join(" ");

        let newContent = `<div id=${question._id} class="q-block">
            <div class="questions">${question.ques}</div>
            <div class="options">
                ${optionsContent}
                <p class="error"></p>
                </div>
                </div>`;
        return newContent;
      })
      .join("");

    dataContainer.innerHTML = displayContent;
  } catch (error) {
    console.log(error);
    window.alert(error);
  }
});
