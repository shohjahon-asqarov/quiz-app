import React, { useState } from 'react'
import Form from './components/Form'
import { Route, Routes } from 'react-router-dom'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Aos from 'aos'


Aos.init()

function App() {

  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState([])

  return (
    <div className='container max-w-md h-screen px-5'>

      <Routes>
        <Route element={<Form questions={questions} setQuestions={setQuestions} />} path='/' />
        <Route element={<Quiz questions={questions} result={result} setResult={setResult} />} path='/quiz' />
        <Route element={<Result result={result} setResult={setResult} />} path='/result' />
      </Routes>
    </div>
  )
}

export default App