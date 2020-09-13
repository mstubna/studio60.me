const images = {}
for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
  images[`${i}`] = {
    screencaptures: {
      '1': require(`./${i}/screencap1.jpg`),
      '2': require(`./${i}/screencap2.jpg`),
    },
    sketch: require(`./${i}/sketch.jpg`),
  }
}

export { images }
