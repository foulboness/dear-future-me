
/* =========================================
   DEAR, FUTURE ME
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const letterTitle =
  document.getElementById("letterTitle");

const letterText =
  document.getElementById("letterText");

const signature =
  document.getElementById("signature");

const openDate =
  document.getElementById("openDate");

const wordCount =
  document.getElementById("wordCount");

const todayDisplay =
  document.getElementById("todayDisplay");

const promptText =
  document.getElementById("promptText");

const newPrompt =
  document.getElementById("newPrompt");

const sealButton =
  document.getElementById("sealButton");

const countdownCard =
  document.getElementById("countdownCard");

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");

const openDateMessage =
  document.getElementById("openDateMessage");

const letterList =
  document.getElementById("letterList");

const letterCount =
  document.getElementById("letterCount");

const letterModal =
  document.getElementById("letterModal");

const closeModal =
  document.getElementById("closeModal");

const lockedLetter =
  document.getElementById("lockedLetter");

const openedLetter =
  document.getElementById("openedLetter");

const openedTitle =
  document.getElementById("openedTitle");

const openedText =
  document.getElementById("openedText");

const openedSignature =
  document.getElementById("openedSignature");

const writtenDate =
  document.getElementById("writtenDate");


/* =========================================
   DATE HELPERS
   ========================================= */

function getToday() {

  const now = new Date();

  return now.toISOString().split("T")[0];

}


function displayDate(dateValue) {

  if (!dateValue) return "";

  const date =
    new Date(dateValue + "T00:00:00");

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  ).replace(/\//g, " / ");

}


/* =========================================
   SET TODAY
   ========================================= */

const today = getToday();

todayDisplay.textContent =
  displayDate(today);

openDate.min = today;


/*
  Default opening date:
  one year from today.
*/

const defaultDate =
  new Date();

defaultDate.setFullYear(
  defaultDate.getFullYear() + 1
);

openDate.value =
  defaultDate.toISOString().split("T")[0];


/* =========================================
   WORD COUNTER
   ========================================= */

function updateWordCount() {

  const text =
    letterText.value.trim();

  if (!text) {

    wordCount.textContent =
      "0 words";

    return;
  }

  const words =
    text.split(/\s+/).length;

  wordCount.textContent =
    `${words} ${words === 1 ? "word" : "words"}`;

}

letterText.addEventListener(
  "input",
  updateWordCount
);


/* =========================================
   PROMPTS
   ========================================= */

const prompts = [

  "What do you hope has changed by the time you read this?",

  "What is something you are scared of right now?",

  "What are you currently dreaming about?",

  "Who is important to you right now?",

  "What is making you happy lately?",

  "What do you never want to forget about this moment?",

  "What are you proud of yourself for?",

  "Where do you hope you are living when you read this?",

  "What song describes your life right now?",

  "What is one thing you desperately want to accomplish?",

  "What would you tell yourself if you could give yourself advice?",

  "Describe an ordinary day in your life right now.",

  "What are you currently obsessed with?",

  "What do you hope future you has learned?",

  "What kind of person are you trying to become?",

  "What is something you wish you could tell someone?",

  "What are you grateful for today?",

  "What would make you proud of the person reading this?",

  "What are you afraid you might forget?",

  "If everything goes well, what does your life look like?"
];


let currentPrompt = 0;


newPrompt.addEventListener(
  "click",
  () => {

    currentPrompt++;

    if (
      currentPrompt >= prompts.length
    ) {
      currentPrompt = 0;
    }

    promptText.style.opacity = "0";

    setTimeout(() => {

      promptText.textContent =
        prompts[currentPrompt];

      promptText.style.opacity = "1";

    }, 150);

  }
);


/* =========================================
   QUICK DATE BUTTONS
   ========================================= */

const quickDateButtons =
  document.querySelectorAll(
    ".quick-dates button"
  );


quickDateButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const days =
        Number(button.dataset.days);

      const future =
        new Date();

      future.setDate(
        future.getDate() + days
      );

      openDate.value =
        future.toISOString()
          .split("T")[0];

    }
  );

});


/* =========================================
   PAPER THEMES
   ========================================= */

const paperButtons =
  document.querySelectorAll(
    ".paper-option"
  );

paperButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const paper =
        button.dataset.paper;


      document.body.classList.remove(
        "paper-pink",
        "paper-cream",
        "paper-night",
        "paper-lavender"
      );


      if (paper !== "pink") {

        document.body.classList.add(
          `paper-${paper}`
        );

      }


      paperButtons.forEach(
        item => item.classList.remove("active")
      );

      button.classList.add("active");

    }
  );

});


/* =========================================
   COUNTDOWN
   ========================================= */

let countdownInterval;


function startCountdown(
  targetDate
) {

  clearInterval(countdownInterval);


  function update() {

    const now =
      new Date().getTime();

    const target =
      new Date(
        targetDate + "T00:00:00"
      ).getTime();

    const difference =
      target - now;


    if (difference <= 0) {

      daysElement.textContent = "000";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      openDateMessage.textContent =
        "✦ Your letter is ready to open.";

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (difference /
        (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (difference /
        (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (difference / 1000) % 60
      );


    daysElement.textContent =
      String(days).padStart(3, "0");

    hoursElement.textContent =
      String(hours).padStart(2, "0");

    minutesElement.textContent =
      String(minutes).padStart(2, "0");

    secondsElement.textContent =
      String(seconds).padStart(2, "0");


    openDateMessage.textContent =
      `opens ${displayDate(targetDate)}`;

  }


  update();

  countdownInterval =
    setInterval(update, 1000);

}


/* =========================================
   LOCAL STORAGE
   ========================================= */

function getLetters() {

  return JSON.parse(
    localStorage.getItem(
      "futureMeLetters"
    )
  ) || [];

}


function saveLetters(letters) {

  localStorage.setItem(
    "futureMeLetters",
    JSON.stringify(letters)
  );

}


/* =========================================
   SEAL LETTER
   ========================================= */

sealButton.addEventListener(
  "click",
  () => {

    const text =
      letterText.value.trim();

    const selectedDate =
      openDate.value;


    if (!text) {

      alert(
        "Write a little something first ♡"
      );

      letterText.focus();

      return;
    }


    if (!selectedDate) {

      alert(
        "Choose a date for future you ♡"
      );

      return;
    }


    const todayDate =
      new Date();

    todayDate.setHours(
      0, 0, 0, 0
    );


    const openingDate =
      new Date(
        selectedDate + "T00:00:00"
      );


    if (openingDate <= todayDate) {

      alert(
        "Your opening date needs to be in the future ♡"
      );

      return;
    }


    const letter = {

      id: Date.now(),

      title:
        letterTitle.value.trim() ||
        "A little letter",

      text: text,

      signature:
        signature.value.trim() ||
        "me",

      writtenDate: today,

      openDate: selectedDate,

      opened: false

    };


    const letters =
      getLetters();

    letters.unshift(letter);

    saveLetters(letters);


    /*
      Clear writing area.
    */

    letterTitle.value = "";
    letterText.value = "";
    signature.value = "";

    updateWordCount();


    /*
      Start countdown.
    */

    countdownCard.classList.remove(
      "hidden"
    );

    startCountdown(
      selectedDate
    );


    /*
      Render archive.
    */

    renderLetters();


    /*
      Scroll to countdown.
    */

    setTimeout(() => {

      countdownCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 200);

  }
);


/* =========================================
   RENDER LETTERS
   ========================================= */

function renderLetters() {

  const letters =
    getLetters();


  letterCount.textContent =
    letters.length;


  if (!letters.length) {

    letterList.innerHTML = `

      <div class="empty-state">

        <div>♡</div>

        <h3>
          Nothing here yet.
        </h3>

        <p>
          Your future self is waiting
          for the first letter.
        </p>

      </div>

    `;

    return;
  }


  letterList.innerHTML =
    letters.map(letter => {

      const now =
        new Date();

      const open =
        new Date(
          letter.openDate +
          "T00:00:00"
        );


      const isReady =
        now >= open;


      return `

        <article
          class="saved-letter"
          data-id="${letter.id}"
        >

          <span class="saved-letter-label">
            LETTER #${String(letter.id).slice(-3)}
          </span>

          <h3>
            ${escapeHTML(letter.title)}
          </h3>

          <div class="saved-letter-date">

            WRITTEN
            ${displayDate(letter.writtenDate)}

            <br>

            OPENS
            ${displayDate(letter.openDate)}

          </div>

          <span class="saved-letter-status">

            ${
              isReady
                ? "✦ READY TO OPEN"
                : "🔒 SEALED"
            }

          </span>

        </article>

      `;

    }).join("");


  document.querySelectorAll(
    ".saved-letter"
  ).forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const id =
          Number(card.dataset.id);

        openLetter(id);

      }
    );

  });

}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;

}


/* =========================================
   OPEN LETTER
   ========================================= */

function openLetter(id) {

  const letters =
    getLetters();

  const letter =
    letters.find(
      item => item.id === id
    );


  if (!letter) return;


  const now =
    new Date();

  const open =
    new Date(
      letter.openDate +
      "T00:00:00"
    );


  letterModal.classList.remove(
    "hidden"
  );


  if (now < open) {

    lockedLetter.classList.remove(
      "hidden"
    );

    openedLetter.classList.add(
      "hidden"
    );

    return;

  }


  lockedLetter.classList.add(
    "hidden"
  );

  openedLetter.classList.remove(
    "hidden"
  );


  openedTitle.textContent =
    letter.title;

  openedText.textContent =
    letter.text;

  openedSignature.textContent =
    letter.signature;

  writtenDate.textContent =
    displayDate(letter.writtenDate);

}


/* =========================================
   CLOSE MODAL
   ========================================= */

closeModal.addEventListener(
  "click",
  () => {

    letterModal.classList.add(
      "hidden"
    );

  }
);


document.querySelector(
  ".modal-overlay"
).addEventListener(
  "click",
  () => {

    letterModal.classList.add(
      "hidden"
    );

  }
);


/* =========================================
   ESC KEY
   ========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      letterModal.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================================
   INITIAL LOAD
   ========================================= */

function loadLatestCountdown() {

  const letters =
    getLetters();

  if (!letters.length) return;


  const latest =
    letters[0];


  const now =
    new Date();

  const target =
    new Date(
      latest.openDate +
      "T00:00:00"
    );


  if (target > now) {

    countdownCard.classList.remove(
      "hidden"
    );

    startCountdown(
      latest.openDate
    );

  }

}


renderLetters();

loadLatestCountdown();

updateWordCount();
