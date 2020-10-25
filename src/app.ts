const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>

// https://stackoverflow.com/questions/47585409/use-spread-operator-on-nodelist-in-typescript
// const items = [...document.querySelectorAll('.item')]

items.forEach((item: HTMLElement) => {
  item.addEventListener('pointerdown', (event: PointerEvent) => {    
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    item.style.left = `${item.getBoundingClientRect().left}px`
    item.style.top = `${item.getBoundingClientRect().top}px`
    
    const clone = item.cloneNode() as HTMLElement
    clone.classList.add('clone')
    item.before(clone)
    
    item.style.pointerEvents = 'none'

    item.classList.add('dragging')

    // position absolute flow
    document.body.append(item)

    item.setPointerCapture(event.pointerId)

    const up = (event: PointerEvent) => {
      // move to original position
      clone.after(item)
      clone.remove()
      item.style.left = ''
      item.style.top = ''
      
      item.classList.remove('dragging')
      
      item.removeEventListener('pointerup', up)
      item.removeEventListener('pointermove', move)
      
      item.style.pointerEvents = ''

      item.releasePointerCapture(event.pointerId)
    }

    const move = (event: PointerEvent) => {
      item.style.left = `${parseFloat(item.style.left) + event.movementX}px`
      item.style.top = `${parseFloat(item.style.top) + event.movementY}px`

      const dropTargetElement = document.elementFromPoint(
        parseFloat(item.style.left),
        parseFloat(item.style.top)
      )

      const dropzone = dropTargetElement?.closest('[data-dropzone]')

      if (!dropzone) {
        return
      }

      dropzone.append(clone)
    }

    item.addEventListener('pointerup', up)
    item.addEventListener('pointermove', move)
  })

})
