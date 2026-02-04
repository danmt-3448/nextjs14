const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

const truncate = (str: string, length = 50) => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const Utils = {
  cn,
  formatCurrency,
  truncate,
  capitalizeFirst,
  generateId,
}

export default Utils
