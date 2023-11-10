const btnFill = document.querySelector(".actions > #fill");
const btnCap = document.querySelector(".actions > #cap");
const btnShake = document.querySelector(".actions > #shake");
const btnBath = document.querySelector(".actions > #bath");
const btnPut = document.querySelector(".actions > #put");
const btnPutInPan = document.querySelector(".actions > #putInPan");
const btnEmpty = document.querySelector(".actions > #empty");
const btnRest = document.querySelector(".actions > #rest");
const btnHeat = document.querySelector(".actions > #heat");
const btnFillPicker = document.querySelector(".actions > #fillPicker");

btnFill.addEventListener(
  "click",
  () => {
    const sediment = document.querySelector(".middle > .sediment");
    sediment.style.setProperty("animation", "fillVessel 5s forwards");
  },
  {
    once: true,
  }
);

// cap the vessel
btnCap.addEventListener(
  "click",
  () => {
    const cap = document.querySelector(".pipette > .neck > .cap");
    cap.style.setProperty("animation", "cap 5s forwards");
  },
  {
    once: true,
  }
);

// shake vessel
btnShake.addEventListener("click", shake, {
  once: true,
});

// shake vessel function
function shake() {
  const vessel = document.querySelector(".pipette");
  //   var liquid = document.getElementById("liquid");
  var duration = 1000; // Duration of the shake animation in milliseconds
  var start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;

    // Calculate the horizontal position of the vessel based on the progress
    var x = Math.sin(progress / 20) * 10;

    // vessel.style.transform = "translateX(" + x + "px)";
    vessel.style.transform = "translateX(" + x + "px) rotate(" + x + "deg)";

    if (progress < duration) {
      // Continue the animation until the duration is reached
      window.requestAnimationFrame(step);
    } else {
      // Animation completed, reset the vessel position
      // vessel.style.transform = "translateX(0)";

      vessel.style.transform = "translateX(0) rotate(0)";
    }
  }
  // Start the animation
  window.requestAnimationFrame(step);
}

// constant temperature bath
btnBath.addEventListener(
  "click",
  () => {
    const bath = document.querySelector(".pipette > .bottom");
    bath.style.setProperty("animation", "bath 5s forwards");
  },
  {
    once: true,
  }
);

let animationInProgress = false;
btnPut.addEventListener("click", pipetteInside, {
  once: true,
});

// put pipette inside vessel
function pipetteInside() {
  const neck = document.querySelector(".neck");
  const picker = document.querySelector(".picker");

  const neckCords = neck.getBoundingClientRect();
  const pickerCords = picker.getBoundingClientRect();

  if (!animationInProgress) {
    animationInProgress = true;

    const anim = picker.animate(
      [
        {
          transform: "rotate(90deg) translate(0,0)",
        },
        {
          transform: `rotate(0deg) translate(-${
            Math.abs(neckCords.left - pickerCords.left) + 233
          }px, -${Math.abs(neckCords.top - pickerCords.top) + 300}px)`,
        },
        {
          transform: `rotate(0deg) translate(-${
            Math.abs(neckCords.left - pickerCords.left) + 233
          }px, -${Math.abs(neckCords.top - pickerCords.top)}px)`,
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
      }
    );

    anim.onfinish = function () {
      this.commitStyles();
      animationInProgress = false;
      console.log(
        "picker animation finish, picker rect =",
        picker.getBoundingClientRect()
      );
    };
  }
}

// fill pipette
btnFillPicker.addEventListener(
  "click",
  () => {
    const sediment = document.querySelector(".length > .sediment");
    sediment.style.setProperty("animation", "fillPicker 5s forwards");
  },
  {
    once: true,
  }
);

// put pipette into the pan
btnPutInPan.addEventListener("click", pipettePour, {
  once: true,
});

function pipettePour() {
  const picker = document.querySelector(".picker");
  const neck = document.querySelector(".neck");
  // const neck = document.querySelector(".neck");
  const beaker = document.querySelector(".beaker");
  // const pipette = document.querySelector(".picker");
  const beakerRect = beaker.getBoundingClientRect();
  // const pipetteRect = pipette.getBoundingClientRect();
  const neckCords = neck.getBoundingClientRect();
  const pickerCords = picker.getBoundingClientRect();
  console.log("empty picker =", pickerCords);

  if (!animationInProgress) {
    animationInProgress = true;
    picker.animate(
      [
        {},
        {
          transform: `rotate(0deg) translate(-${
            Math.abs(neckCords.left - pickerCords.left) + 233 + 146
          }px, -${Math.abs(neckCords.top - pickerCords.top + 250)}px)`,
        },
        {
          transform: `rotate(0deg) translate(${Math.abs(
            pickerCords.left + 233 + 60 - beakerRect.left
          )}px, -${Math.abs(neckCords.top - pickerCords.top + 250)}px)`,
        },
        {
          transform: `rotate(0deg) translate(${Math.abs(
            pickerCords.left + 233 + 60 - beakerRect.left
          )}px, -${Math.abs(neckCords.top - pickerCords.top - 100)}px)`,
        },
      ],
      {
        // options
        duration: 1000,
        fill: "forwards",
      }
    ).onfinish = function () {
      this.commitStyles();
      console.log(picker.getBoundingClientRect());
      animationInProgress = false;
    };
  }
}

// empty pipette into the pan
btnEmpty.addEventListener(
  "click",
  () => {
    const pickerSediment = document.querySelector(".length > .sediment");
    const beakerSediment = document.querySelector(".beaker > .sediment");

    pickerSediment.style.setProperty("animation", "emptyPicker 5s forwards");
    beakerSediment.style.setProperty("animation", "fillBeaker 5s forwards");
  },
  {
    once: true,
  }
);

// rest the picker
btnRest.addEventListener("click", pickerRest, {
  once: true,
});
function pickerRest() {
  const neck = document.querySelector(".neck");
  const picker = document.querySelector(".picker");
  const beaker = document.querySelector(".beaker");

  const beakerRect = beaker.getBoundingClientRect();
  const neckCords = neck.getBoundingClientRect();
  const pickerCords = picker.getBoundingClientRect();

  if (!animationInProgress) {
    animationInProgress = true;

    const anim = picker.animate(
      [
        {},
        {
          transform: `rotate(0deg) translate(${Math.abs(
            pickerCords.left + 233 + 90 - beakerRect.left
          )}px, -${Math.abs(neckCords.top - pickerCords.top + 200)}px)`,
        },
        {
          transform: `rotate(0deg) translate(0, -${Math.abs(
            neckCords.top - pickerCords.top + 200
          )}px)`,
        },
        {
          transform: "rotate(90deg) translate(0, 0)",
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
      }
    );

    anim.onfinish = function () {
      this.commitStyles();
      animationInProgress = false;
      console.log(
        "picker animation finish, picker rect =",
        picker.getBoundingClientRect()
      );
    };
  }
}

//heat the beaker
btnHeat.addEventListener("click", heatBeaker, {
  once: true,
});
function heatBeaker() {
  const microwave = document.querySelector(".microwave > .store > .window");
  const beaker = document.querySelector(".beaker");
  const sediment = document.querySelector(".beaker > .sediment");

  const microwaveRect = microwave.getBoundingClientRect();
  const beakerRect = beaker.getBoundingClientRect();

  beaker.animate(
    [
      {},
      {
        transform: `translate(${microwaveRect.left - beakerRect.left}px,${
          microwaveRect.bottom - beakerRect.bottom - 20
        }px)`,
        height: `${microwaveRect.height - 50}px`,
        width: `${microwaveRect.width / 2}px`,
        opacity: "30%",
      },
    ],
    { duration: 1000, fill: "forwards" }
  );

  sediment.animate(
    [
      {},
      {
        transform: "translate(0, -50px)",
      },
    ],
    {
      duration: 1000,
      fill: "forwards",
    }
  );
}

btnFillPicker.addEventListener(
  "click",
  () => {
    const sediment = document.querySelector(".length > .sediment");
    sediment.style.setProperty("animation", "fillPicker 5s forwards");
  },
  {
    once: true,
  }
);
