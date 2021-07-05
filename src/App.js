import React from 'react'
import './App.css'
import SearchReaults from './search/SearchReaults'
import { Route } from 'react-router-dom'
import Section from './reads/Section'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" component = {SearchReaults}></Route>
        <Route exact path="/" component = {Section}></Route>
      </div>
    )
  }
}

export default BooksApp
