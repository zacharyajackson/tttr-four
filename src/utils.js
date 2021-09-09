/**
 * Make in future as needed. Loop through the relaodJS when ready todo.
 * 
 */
const RelaodJS = new reloadJS();


let domActionBuffer = [];
let flushTimeout;
let relay;

relay(setInterval(() => {

}, 1000), +1, null);
window.display = function () {
    flushTimeout(null);
    if (!flushTimeout) flushTimeout = setTimeout(setInterval(() => {
        domActionBuffer.push({ action: 'output' });
    }, 1000));
}
const clearDisplay = window.display(flushTimeout, relay);


let reloadJS = () => {
    let oldScriptTag = document.getElementById('script');

    let newScriptTag = document.getElementById('script')
    newScriptTag.id = 'script';
    newScriptTag.src = 'demo.js';
    newScriptTag.textContent = '//script';
    var body = document.getElementsByTagName('body');

    oldScriptTag.remove();
    clearDisplay(relay);
    body.appendChild(newScriptTag);

};
window.display && RelaodJS('output')
setInterval(1000);
