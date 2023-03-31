const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  return (seconds) => {
    let StartTimer = new Date().getTime();
    let EndTimer = StartTimer + seconds * 1000; // конец таймера

    function TimeStr(sec) {
      let s = sec % 60;
      let h = Math.trunc(sec / 3600);
      let m = Math.trunc(sec / 60) % 60;
      return [
        h.toString().padStart(2, '0'),
        m.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
      ].join(':');
    }
    timerEl.textContent = `${TimeStr(seconds)}`

    let t = seconds; // Оставшиеся секунды
    let interval = setInterval(() => {
      if (Math.trunc((EndTimer - Date.now()) / 1000) < t) {
        t = Math.trunc((EndTimer - Date.now()) / 1000);
        timerEl.textContent = `${TimeStr(Math.trunc((EndTimer - Date.now()) / 1000) + 1)}`;
      }

      if (EndTimer <= Date.now()) {
        timerEl.textContent = `${TimeStr(0, 0, 0)}`;
        clearInterval(interval);
        console.log("Время работы: ", Date.now() - StartTimer, "таймер на ", seconds, "сек");
      }
    }, 4)

    buttonEl.addEventListener('click', () => {
      if (interval) clearInterval(interval);
    });
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  if (Number(seconds) > 0 && Number(seconds)< 359999) {
    animateTimer(seconds);
  } else {
    animateTimer(359999)
  }
  inputEl.value = '';
});
