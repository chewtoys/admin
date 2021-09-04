export const modalStyle = (
  topPosition,
  bottomPosition,
  leftPosition,
  rightPosition,
  width,
  height
) => {
  const ua = navigator.userAgent.toLowerCase()

  // iPad判定 (iPadならTRUE)
  const isIPad = ua.indexOf('ipad') >= 0

  // IE判定 (IEらTRUE)
  const isIE = ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0
  let top = ''
  let left = ''

  if (isIE) {
    top = '25%'
    left = '25%'
  } else if (isIPad) {
    top = '50%'
    left = '50%'
  }
  let baseStyle = {
    position: 'fixed',
    'z-index': 2,
    maxWidth: '900px',
    transform: isIPad ? 'translate(-50%, -50%)' : '',
    width: 'calc(100% - 44px)',
    top: top,
    left: left,
    height: height,
    backgroundColor: '#fff',
    borderRadius: '6px',
    'box-shadow': '0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
  }

  if (topPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      top: topPosition
    })
  }

  if (bottomPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      bottom: bottomPosition
    })
  }

  if (leftPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      left: leftPosition
    })
  }

  if (rightPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      right: rightPosition
    })
  }

  return baseStyle
}
