export default class hoverCard {
    constructor() {
        const href = '/component/dyanmic/hoverCard/hoverCard.css';
        const exists = Array.from(document.styleSheets).some(ss => {
            // some styleSheets may be cross-origin and throw when accessing href; guard with try/catch
            try { return ss.href && ss.href.endsWith(href); }
            catch (e) { return false; }
        });

        if (!exists) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            console.log('hoverCard styles added to document.');
        }
    }

    createCard() {
        const div = document.createElement('div')
        div.classList.add('container', 'noselect')
        div.innerHTML = `
        <div class="canvas">
    <div class="tracker tr-1"></div>
    <div class="tracker tr-2"></div>
    <div class="tracker tr-3"></div>
    <div class="tracker tr-4"></div>
    <div class="tracker tr-5"></div>
    <div class="tracker tr-6"></div>
    <div class="tracker tr-7"></div>
    <div class="tracker tr-8"></div>
    <div class="tracker tr-9"></div>
    <div class="tracker tr-10"></div>
    <div class="tracker tr-11"></div>
    <div class="tracker tr-12"></div>
    <div class="tracker tr-13"></div>
    <div class="tracker tr-14"></div>
    <div class="tracker tr-15"></div>
    <div class="tracker tr-16"></div>
    <div class="tracker tr-17"></div>
    <div class="tracker tr-18"></div>
    <div class="tracker tr-19"></div>
    <div class="tracker tr-20"></div>
    <div class="tracker tr-21"></div>
    <div class="tracker tr-22"></div>
    <div class="tracker tr-23"></div>
    <div class="tracker tr-24"></div>
    <div class="tracker tr-25"></div>
    <div id="card">
    <p id="prompt">HOVER OVER :D</p>
      <div class="title">look mom,<br>no JS</div>
      <div class="subtitle">
        mouse hover tracker
      </div>
      
    </div>
  </div>
        `
        return div
    }
}