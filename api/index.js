const logic = (name, res) => {
  res.status(200).json({ message: `Hello, ${name}!` })
}

module.exports = (req, res) => {
  const { name = 'World' } = req.query

  logic(name, res)
}
