export const vColorDelay = {
  mounted(el: HTMLElement, binding: any) {
    applyColor(el, binding.value);
  },
  updated(el: HTMLElement, binding: any) {
    applyColor(el, binding.value);
  }
};

function applyColor(el: HTMLElement, value: any) {
  const delay = Number(value); 
  
  if (isNaN(delay)) return; 

  if (delay > 0) {
    el.style.color = '#dc2626'; 
    el.style.fontWeight = 'bold';
  } else if (delay <= 0) {
    el.style.color = '#16a34a'; 
  } else {
    el.style.color = 'inherit';
  }
}