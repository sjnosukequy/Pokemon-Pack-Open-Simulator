export default class spinCard {
    constructor() {
        const href = '/component/dyanmic/spinCard/spinCard.css';
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
            console.log('spinCard styles added to document.');
        }
    }

    createCard(imglink) {
        const div = document.createElement('div')
        div.classList.add('container', 'noselect')
        div.innerHTML = `
        <!-- From Uiverse.io by imtausef --> 
<div class="card-container">
  <div class="card">
    <div class="back">
    </div>
    <div class="front">
    <img src="${imglink}" loading="lazy" />
    </div>
  </div>
</div>
        `
        return div
    }
}