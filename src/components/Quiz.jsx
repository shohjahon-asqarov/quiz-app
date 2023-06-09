import { Button, Card, CardBody, CardFooter, CardHeader, Progress, Radio, Spinner, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Quiz({ questions, setResult }) {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    let currentQuestion = questions[index];

    const answers = [...currentQuestion?.incorrect_answers];

    let num = Math.floor(Math.random() * 4);
    if (num === 3) {
        answers.push(currentQuestion.correct_answer);
    } else {
        answers.push(answers[num]);
        answers[num] = currentQuestion?.correct_answer;
    }

    const NextQuestion = (e) => {
        setLoading(true);
        setIndex((prevIndex) => {
            if (prevIndex === questions.length - 1) {
                return questions.length - 1 & navigate('/result');
            } else {
                return prevIndex + 1
            }
        });
        setResult(result => [...result, { question: currentQuestion.question, my_answer: e.target.value, answers: answers, correct_answer: currentQuestion.correct_answer }]);
        e.checked = false;

        setTimeout(() => {
            setLoading(false);
        }, 1000)

    }

    return (
        <div className="flex items-center h-screen">
            <Card data-aos="fade-left" className="w-full max-w-[24rem] mx-auto">
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                        <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>

                    </div>
                    <Typography variant="h4" color="white">
                        Quiz App
                    </Typography>
                </CardHeader>

                <CardBody>
                    {loading ?
                        <div className='h-44 flex items-center'>
                            <Spinner className="h-12 w-12 mx-auto" />
                        </div>
                        : <div className="div">
                            <Typography variant="paragraph">
                                {index + 1} - {currentQuestion?.question}
                            </Typography>
                            <div data-aos="fade-left" className="grid gap-3 mt-5">
                                {answers.map((i, index) => {
                                    return (
                                        <Radio key={index} value={i} onClick={(e) => NextQuestion(e)} className='radio' ripple={true} id="html" name="type" label={<Typography variant="small">{i}</Typography>} />
                                    )
                                })}
                            </div>
                        </div>
                    }
                </CardBody>

                <CardFooter className="pt-3">
                    <div className='gap-4 flex'>
                        <Button onClick={() => navigate('/')} fullWidth variant="outlined">Cancel</Button>
                        <Button fullWidth variant="outlined">{index + 1}/{questions.length}</Button>
                    </div>
                    <Progress className='mt-5 rounded-sm' value={((index + 1) / questions.length) * 100} />
                </CardFooter>
            </Card>
        </div>
    )

}

export default Quiz