export const runFunctionWhenOtherElementsClicked = (
  elementId: string,
  func: () => void
) => {
  const element = document.getElementById(elementId);

  const mouseClick = (event: MouseEvent) => {
    if (!element?.contains(event.target)) {
      func();
    }
  };

  const body = document.getElementsByTagName("body")[0];

  body.addEventListener("click", mouseClick);
  return () => body.removeEventListener("click", mouseClick);
};
