import { Input, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import checkImg from '../assets/check.svg'
import uncheckImg from '../assets/uncheck.svg'
import { ToastContainer, toast } from 'react-toastify';


function Result({ result, setResult }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const navigate = useNavigate()

    let nums = 0
    result.map((i) => {
        return (
            i.correct_answer === i.my_answer ? nums += 1 : null
        )
    })



    const toHome = () => {
        navigate('/')
        setResult([])
    }

    const sendTelegram = (e) => {
        e.preventDefault()

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        if (e.target[0].value.length > 3 && e.target[1].value.length > 3 && e.target[2].value.length > 3) {
            let message = `
            👤Name: ${e.target[0].value} %0A
            📨 email: ${e.target[1].value} %0A
            ❔  All questions: ${result.length} %0A
            ✅ Correct answers: ${nums}  %0A
             ❗️  Incorrect answers: ${result.length - nums} %0A
            🕔 date: ${today.toUTCString()}`

            const token = '5907844338:AAGX9FPH-pgYYdUWwF6b4ZnmCDW1EtiWHus'
            let url =
                "https://api.telegram.org/bot" +
                token +
                "/sendMessage?chat_id=-1001814802115&text=";
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", url + message, true);
            xhttp.send();
            toast.success("Successfully sent message")
            setTimeout(() => {
                handleOpen()
            }, [1000])
        } else {
            toast.error("Please enter your name and email")
        }

    }

    return (
        <div className="flex items-center min-h-screen py-5">
            <Card className="w-full max-w-[24rem] mx-auto">
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
                        You Result
                    </Typography>
                </CardHeader>

                <CardBody>
                    {result.map((i, index) => {
                        return (
                            <div className='py-3'>
                                <Typography data-aos="fade-up" variant="paragraph">
                                    {index + 1} - {i.question}
                                </Typography>
                                {
                                    i.correct_answer === i.my_answer ?
                                        <ListItem data-aos="fade-up" className='rounded-md border border-green-400 py-2 my-2 flex justify-between ' variant="paragraph">
                                            You answer: {i.correct_answer}
                                            <img className='w-5' src={checkImg} alt="check svg" />
                                        </ListItem>
                                        :
                                        <div className="div">
                                            <ListItem data-aos="fade-up" className='rounded-md border border-red-400 py-2 my-2 flex justify-between' variant="paragraph">
                                                You answer: {i.my_answer}
                                                <img className='w-5' src={uncheckImg} alt="check svg" />
                                            </ListItem>
                                            <ListItem data-aos="fade-up" className='rounded-md border border-green-400 py-2 my-2 flex justify-between ' variant="paragraph">
                                                Correct answer: {i.correct_answer}
                                                <img className='w-5' src={checkImg} alt="check svg" />
                                            </ListItem>
                                        </div>
                                }

                            </div>
                        )
                    })}

                </CardBody>

                <CardFooter className="pt-3">
                    <div className="result pb-5">
                        <List className='rounded-xl border border-blue-gray-50 '>
                            <ListItem className='border border-blue-gray-50'>
                                All questions
                                <ListItemSuffix>
                                    <Chip value={result.length} variant="ghost" size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem className='border border-blue-gray-50'>
                                Correct answes
                                <ListItemSuffix>
                                    <Chip value={nums} variant="ghost" size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem className='border border-blue-gray-50'>
                                Incorrect answers
                                <ListItemSuffix>
                                    <Chip value={result.length - nums} variant="ghost" size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                        </List>
                    </div>
                    <div className="flex justify-between">
                        <Button onClick={toHome} variant="outlined">Cancel</Button>
                        <Button onClick={handleOpen}>Send Result</Button>
                    </div>
                </CardFooter>
            </Card>


            <Dialog
                size='xl'
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="w-full max-w-[24rem] mx-auto">
                    <form onSubmit={sendTelegram}>
                        <CardHeader
                            variant="gradient"
                            color="blue"
                            className="mb-4 grid h-28 place-items-center"
                        >
                            <Typography variant="h3" color="white">
                                Your Info
                            </Typography>
                        </CardHeader>

                        <CardBody className="flex flex-col gap-4">
                            <Input label="Enter your name" size="lg" />
                            <Input label="Enter your email" size="lg" />
                            <Input label="Enter your telegram username" size="lg" />
                        </CardBody>

                        <CardFooter className="pt-0 flex gap-4">
                            <Button variant="outlined" onClick={handleOpen} fullWidth>
                                Cancel
                            </Button>
                            <Button variant="gradient" type='submit' fullWidth >
                                Send
                            </Button>
                        </CardFooter>
                    </form>
                </Card>


                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Dialog>

        </div>
    )

}

export default Result











