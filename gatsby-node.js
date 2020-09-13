const pathsToIgnore = ['/personality-quiz/', '/test/', '/timer/', '/water-cooler/']

exports.onCreatePage = ({ page, actions: { deletePage } }) => {
  if (process.NODE_ENV === 'production') {
    if (pathsToIgnore.includes(page.path)) {
      deletePage(page)
    }
  }
}
