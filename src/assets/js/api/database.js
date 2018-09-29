/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

app.get('api/asistente/:id', (req, res, next) => {
    db.query('SELECT * FROM asistente WHERE id = $1', [id], (err, res) => {
      if (err) {
        return next(err)
      }
      res.send(res.rows[0])
    })
  })

  app.get('api/asistente/:id', (req, res, next) => {
    db.query('SELECT * FROM asistente WHERE id = $1', [id], (err, res) => {
      if (err) {
        return next(err)
      }
      res.send(res.rows[0])
    })
  })