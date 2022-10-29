import World from "./Museum/World.js";

const sectionContainer = document.getElementById("cs");
let content = `<div class="content-action" id="action-wrapper">
<button class="btn-cancel" id='btn-cancel'>x</button>
<button class="btn-next" id='btn-next'>--</button>
<button class="btn-pre" id='btn-pre'>--</button>
</div>
<div class="content-detail">
  <div class="card">
    <div class="card-header"><h2>This is title</h2></div>
    <div class="card-body">
      <p>
        this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na this is onononaodnocoan on
        oncoan o na this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na this is onononaodnocoan on
        oncoan o na this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na this is onononaodnocoan on
        oncoan o na this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na this is onononaodnocoan on
        oncoan o na this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na this is onononaodnocoan on
        oncoan o na this is onononaodnocoan on oncoan o na this is
        onononaodnocoan on oncoan o na
      </p>
    </div>
    <div class="card-footer"></div>
  </div>
</div>`;
sectionContainer.innerHTML = content;

new World(document.getElementById("main-canvas"));
