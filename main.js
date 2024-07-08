class Screen {
  constructor(canvas, aspect, charSize) {
    this.canvas = canvas;
    this.aspect = aspect;
    this.charSize = charSize;
    this.charWidth;
    this.charHeight;
    this.width;
    this.height;
    this.startX;
    this.startY;
    this.values;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.onresize = () => { this.resize() };
  }

  buildValues() {
    this.values = [];

    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(['', '']);
      }
      this.values.push(row);
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    let aspectWidth = this.canvas.width / Math.sqrt(this.aspect);
    let aspectHeight = this.canvas.height * Math.sqrt(this.aspect);

    let side = aspectWidth < aspectHeight;

    this.ctx.font = `${(side ? aspectWidth : aspectHeight) * this.charSize / 600}px monospace`;
    this.calculateCharScale();

    let scale = side ? this.canvas.width : this.canvas.height;

    let sx = scale / this.charWidth;
    let sy = scale / this.charHeight;

    if (side)
      sy /= this.aspect;
    else
      sx *= this.aspect;

    this.width = Math.floor(sx);
    this.height = Math.floor(sy);

    this.startX = (this.canvas.width - this.width*this.charWidth)/this.charWidth/2;
    this.startY = (this.canvas.height - this.height*this.charHeight)/this.charHeight/2;

    this.buildValues();
  }

  get(x, y) {
    return this.values[y][x];
  }

  set(x, y, value) {
    this.values[y][x] = value;
  }

  calculateCharScale() {
    let measure = this.ctx.measureText('0');
    this.charWidth = measure.width;
    this.charHeight = measure.fontBoundingBoxAscent;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.ctx.fillStyle = this.get(x, y)[1];
        this.ctx.fillText(this.get(x, y)[0], (x + this.startX) * this.charWidth, (y + this.startY + 1) * this.charHeight);
      }
    }
  }
}

class AsciiIT {
  static getAscii(normalizedIndex) {
    let asciiLevels = " .:!=?t*nv2$&0@B";
    return asciiLevels.charAt(Math.max(Math.min(Math.round(normalizedIndex * 15), 15), 0));
  }
}

class V2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}



const mouse = {
  acc: new V2()
}
const keys = {};
window.addEventListener('mousedown', async e => {
  await canvas.requestPointerLock();
});
window.addEventListener('mousedown', e => {

});
window.addEventListener('mouseup', e => {

});
window.addEventListener('mousemove', e => {
  mouse.acc.x = e.movementX;
  mouse.acc.y = e.movementY;
});
window.addEventListener('keydown', e => {
  if (!keys[e.code])
    keys[e.code] = true;
});
window.addEventListener('keyup', e => {
  keys[e.code] = false;
});



let screen = new Screen(document.querySelector('#canvas'), 1.6, 10);

const world = {
  width: 16,
  height: 16,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  texSize: 16,
  textures: [
    [
      ['#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#999', '#f00', '#999', '#f00', '#999', '#999', '#999', '#f00', '#999', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#999', '#f00', '#999', '#f00', '#f00', '#999', '#f00', '#f00', '#999', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#999', '#999', '#999', '#f00', '#f00', '#999', '#f00', '#f00', '#999', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#999', '#f00', '#999', '#f00', '#f00', '#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#999', '#f00', '#999', '#f00', '#999', '#999', '#999', '#f00', '#999', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#f00', '#999'],
      ['#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999'],
    ]
  ]
};

const camera = {
  pos: new V2(1.5, 1.5),
  angle: 0,
  fov: 60 * 0.017453292519943295
};

function run() {
  requestAnimationFrame(run);

  update();
}

function update() {
  for (let i = 0; i < screen.width; i++) {
    let rayAngle = camera.angle - (camera.fov / 2) + i * (camera.fov / screen.width);
    let dir = new V2(Math.cos(rayAngle), Math.sin(rayAngle));
    let mapPos = new V2(Math.floor(camera.pos.x), Math.floor(camera.pos.y));
    let sideDist = new V2();
    let deltaDist = new V2(dir.x != 0 ? Math.abs(1 / dir.x) : Infinity, dir.y != 0 ? Math.abs(1 / dir.y) : Infinity);
    let perpWallDist;
    let step = new V2();
    let side = 0;
    if (dir.x < 0) {
      step.x = -1;
      sideDist.x = (camera.pos.x - mapPos.x) * deltaDist.x;
    } else {
      step.x = 1;
      sideDist.x = (mapPos.x + 1 - camera.pos.x) * deltaDist.x;
    }
    if (dir.y < 0) {
      step.y = -1;
      sideDist.y = (camera.pos.y - mapPos.y) * deltaDist.y;
    } else {
      step.y = 1;
      sideDist.y = (mapPos.y + 1 - camera.pos.y) * deltaDist.y;
    }

    let hit;
    for (let i = 0; i < world.width * world.height; i++) {
      if (sideDist.x < sideDist.y) {
        sideDist.x += deltaDist.x;
        mapPos.x += step.x;
        side = 0;
      } else {
        sideDist.y += deltaDist.y;
        mapPos.y += step.y;
        side = 1;
      }
      if (world.map[mapPos.y] && world.map[mapPos.y][mapPos.x] && world.map[mapPos.y][mapPos.x] > 0) {
        hit = true;
        break;
      };
    }

    if (!hit) continue;

    let fishEyeFix = Math.cos(camera.angle - rayAngle);
    let wallX;
    if (side == 0) {
      perpWallDist = (sideDist.x - deltaDist.x) * fishEyeFix;
      wallX = camera.pos.y + (sideDist.x - deltaDist.x) * dir.y;
    } else {
      perpWallDist = (sideDist.y - deltaDist.y) * fishEyeFix;
      wallX = camera.pos.x + (sideDist.y - deltaDist.y) * dir.x;
    }
    wallX -= Math.floor(wallX);
    let texX = world.texSize - 1 - Math.floor(wallX * world.texSize);
    if (side == 0 && dir.x > 0) texX = world.texSize - texX - 1;
    if (side == 1 && dir.y < 0) texX = world.texSize - texX - 1;
    let lineHeight = screen.width / perpWallDist / camera.fov * (screen.charWidth / screen.charHeight);
    let lineStart = Math.max(Math.floor(-lineHeight / 2 + screen.height / 2), 0);
    let lineEnd = Math.min(Math.floor(lineHeight / 2 + screen.height / 2), screen.height - 1);
    let texNum = world.map[mapPos.y][mapPos.x] - 1;
    let wallYStep = 1 * world.texSize / lineHeight;
    let texPos = (lineStart - screen.height / 2 + lineHeight / 2) * wallYStep;

    let wallLightIntensity = (lineHeight/screen.height-.3);

    for (let j = lineStart; j <= lineEnd; j++) {
      let texY = Math.min(Math.max(Math.floor(texPos), 0), world.texSize - 1);
      texPos += wallYStep;
      if (j == screen.height / 2) texY = world.texSize / 2;
      let color = world.textures[texNum][texY][texX];
      screen.set(i, j, [AsciiIT.getAscii(wallLightIntensity), color]);
    }

    for (let j = 0; j < lineStart; j++) {
      screen.set(i, j, ['', '']);
    }

    for (let j = lineEnd + 1; j < screen.height; j++) {
      let floorLightIntensity = (j-screen.height/2)/(screen.height/2)-.2;
      screen.set(i, j, [AsciiIT.getAscii(floorLightIntensity), '#293']);
    }

    camera.angle += mouse.acc.x / 400;

    if (keys.KeyW) {
      camera.pos.x += Math.cos(camera.angle) / 3000;
      camera.pos.y += Math.sin(camera.angle) / 3000;
    }
    if (keys.KeyS) {
      camera.pos.x -= Math.cos(camera.angle) / 3000;
      camera.pos.y -= Math.sin(camera.angle) / 3000;
    }
    if (keys.KeyA) {
      camera.pos.x += Math.sin(camera.angle) / 6000;
      camera.pos.y -= Math.cos(camera.angle) / 6000;
    }
    if (keys.KeyD) {
      camera.pos.x -= Math.sin(camera.angle) / 6000;
      camera.pos.y += Math.cos(camera.angle) / 6000;
    }

    mouse.acc.x = 0;
    mouse.acc.y = 0;
  }

  screen.render();
}

run();
