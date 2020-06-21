const logic = (res) => {
  res.status(200).json({
    list: './list/?offset[number?]',
    retrieve: './post/?slug[string]'
  })
}

module.exports = (req, res) => {
  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  logic(res)
}
