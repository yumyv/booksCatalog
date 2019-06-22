import ModalWindow from '../modalWindows/ModalWindow';
import createDOMElem from '../createDOMElem';

class InfoModalWindow extends ModalWindow {
  constructor(text, timeForShow) {
    super(text);
    this.timer = timeForShow;
  }

  asElement() {
    if (!document.querySelector('.fade')) {
      const fade = createDOMElem('div', 'fade');
      const info = createDOMElem('div', 'info-output');
      info.innerText = this.text;
      fade.append(info);
      document.body.append(fade);
      const timerId = setTimeout(() => {
        document.body.removeChild(document.querySelector('.fade'));
        clearInterval(timerId);
      }, this.timer);
    }
  }
}

export default InfoModalWindow;
