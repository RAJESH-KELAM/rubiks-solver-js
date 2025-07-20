class RubiksCube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b')
    };
    this.history = [];
  }

  rotateFaceCW(face) {
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2]
    ];
  }

  moveF() {
    this.rotateFaceCW('F');
    const U = this.faces.U.slice(), D = this.faces.D.slice(),
          L = this.faces.L.slice(), R = this.faces.R.slice();

    [U[6], U[7], U[8], R[0], R[3], R[6], D[2], D[1], D[0], L[8], L[5], L[2]] =
    [L[8], L[5], L[2], U[6], U[7], U[8], R[0], R[3], R[6], D[2], D[1], D[0]];

    this.faces.U = U;
    this.faces.D = D;
    this.faces.L = L;
    this.faces.R = R;

    this.history.push("F");
  }

  shuffle(moves = 20) {
    const actions = ['moveF'];
    for (let i = 0; i < moves; i++) {
      const move = actions[Math.floor(Math.random() * actions.length)];
      this[move]();
    }
  }

  solve() {
    for (let i = this.history.length - 1; i >= 0; i--) {
      const move = this.history[i];
      if (move === 'F') this.moveF(); // naive reversal
    }
  }

  getCubeColorString() {
    return ['U', 'R', 'F', 'D', 'L', 'B']
      .map(face => this.faces[face].join(''))
      .join('');
  }
}

function getCubeSvg(colorString) {
  return "<pre>Cube: " + colorString + "</pre>";
}

const cube = new RubiksCube();

function shuffleCube() {
  cube.shuffle();
  document.getElementById('cube-view').innerHTML = getCubeSvg(cube.getCubeColorString());
}

function solveCube() {
  cube.solve();
  document.getElementById('cube-view').innerHTML = getCubeSvg(cube.getCubeColorString());
}
