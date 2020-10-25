const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>

// https://stackoverflow.com/questions/47585409/use-spread-operator-on-nodelist-in-typescript
// const items = [...document.querySelectorAll('.item')]

items.forEach(item => {
  item.addEventListener('pointerdown', (event: PointerEvent) => {
    item.classList.add('dragging')
  })

  item.addEventListener('pointerup', (event: PointerEvent) => {
    item.classList.remove('dragging')
  })
})
