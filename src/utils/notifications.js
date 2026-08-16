import { Notyf } from 'notyf'

const notyf = new Notyf({
  duration: 3500,
  position: { x: 'right', y: 'top' },
  dismissible: true,
})

export const notifySuccess = (message) => {
  notyf.success(message)
}

export const notifyError = (message) => {
  notyf.error(message)
}

export const notifyWarning = (message) => {
  notyf.open({
    type: 'warning',
    message,
  })
}
