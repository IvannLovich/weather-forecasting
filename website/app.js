/* Global Variables */
let apiResponse = "";

document.addEventListener("DOMContentLoaded", () => {
  const dateWritten = document.querySelector("#date");
  const tempWritten = document.querySelector("#temp");
  const contentWritten = document.querySelector("#content");
  const resultData = document.querySelector("#entryHolder");

  document.getElementById("generate").addEventListener("click", async () => {
    const d = new Date();
    const zipCodeInput = document.getElementById("zip");
    const feelingInput = document.querySelector(".myInput");

    const zipCodeValue = zipCodeInput.value;
    const feelingValue = feelingInput.value;

    const countryName = document.createElement("div");

    let countryNameText = "";

    // Validate zip code
    if (!isValidZipCode(zipCodeValue)) {
      alert("Please enter a valid zip code.");
      return;
    }

    // Format the date using toLocaleString()
    const formattedDate = d.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    try {
      // Make a POST request to your server using Axios when the button is clicked
      apiResponse = await axios.post("/getData", { zipCodeValue });
      countryNameText = document.createTextNode(apiResponse.data.name);

      countryName.appendChild(countryNameText);

      resultData.innerHTML = "";
      resultData.appendChild(dateWritten);
      resultData.appendChild(countryName);
      resultData.appendChild(tempWritten);
      resultData.appendChild(contentWritten);

      // Do something with the data returned from the server (projectData)
      console.log("Data received from server:", apiResponse.data);
    } catch (error) {
      console.error("Error making request to server:", error);
    }

    dateWritten.innerHTML = zipCodeValue !== "" && formattedDate;
    tempWritten.innerHTML = apiResponse.data.main.temp + "°C";
    contentWritten.innerHTML = feelingValue;

    feelingInput.value = "";
    zipCodeInput.value = "";
  });

  // Validate zip code function
  function isValidZipCode(zipCode) {
    // Check if the zip code does not contain any special characters or letters and contains only numeric characters
    return /^\d+$/.test(zipCode) && !/[^\d]/.test(zipCode);
  }
});
