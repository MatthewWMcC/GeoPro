export const runCodeOnClick = (elementIds: string[], func: () => void) => {
  elementIds.forEach((elementId) => {
    const element = document.getElementById(elementId);

    element && element.addEventListener;
  });
  const body = document.getElementById("body-content-container");

  body &&
    body.addEventListener("click", () => {
      if (vnode.state.displaySettings) {
        vnode.state.displaySettings = false;
        m.redraw();
      }
    });
};
