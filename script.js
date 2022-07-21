const smallCups = document.querySelectorAll(".cup-small");
const liter = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
const noOfCups = document.querySelectorAll(".cup-small").length;
const cupProps = getComputedStyle(document.querySelector(".cup"));
const cupHeight = parseInt(cupProps.getPropertyValue("height"));

updateBigCup();
smallCups.forEach((cup, i) => {
  cup.addEventListener("click", () => highlightCup(i));
});

function highlightCup(ind) {
  // if the small cup is the last one, drain it
  if (
    smallCups[`${noOfCups - 1}`].classList.contains("full") &&
    ind === noOfCups - 1
  ) {
    ind--;
  }

  // If the selected small cup is filled, drain it, by reducing index by 1 on condition that the current cup is filled and the next one isn't filled

  if (
    smallCups[ind].classList.contains("full") &&
    !smallCups[`${ind + 1}`].classList.contains("full")
  ) {
    ind--;
  }

  smallCups.forEach((cup, indx) => {
    console.log(ind);
    if (indx <= ind) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

function updateBigCup() {
  // number of cups with class of full
  const noOfFullCups = document.querySelectorAll(".cup-small.full").length;

  if (noOfFullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";

    // increase the height of percentage in proportion to no of cups
    percentage.style.height = `${(noOfFullCups / noOfCups) * cupHeight}px`;
    percentage.innerText = `${(noOfFullCups / noOfCups) * 100}%`;
  }

  if (noOfFullCups === noOfCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liter.innerText = `${2 - (250 * noOfFullCups) / 1000}L`;
  }
}
