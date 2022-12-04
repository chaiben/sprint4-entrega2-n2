const router = require('express').Router()

const { Match } = require('../../db')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')

router.post('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const match = await Match.create({ player_id: req.params.player_id, value: true })
    response.setPayload(match)
    response.addMessage(match.result === MESSAGES.WIN ? MESSAGES.WELLPLAYED : MESSAGES.SORRY)
    res.status(201).json(response)
  } catch (err) {
    response.setStatus(false)
    if (err.name === 'SequelizeForeignKeyConstraintError') { response.addError(MESSAGES.MISSINGPLAYER) } else {
      response.addError(err)
    }
    res.status(400).json(response)
  }
})

module.exports = router