import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Select,
    Option,
    Spinner,
} from "@material-tailwind/react";
import { Categories } from "../assets/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export default function Form({ questions, setQuestions }) {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const [category, setcategory] = useState(null)
    const [value, setValue] = useState(10)

    const handleChange = (e) => {
        setValue(e.value)
    }

    const startTest = (e) => {
        e.preventDefault()
        let amount = e.target[1].value

        let api_url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`

        async function getQuestions() {
            setLoading(true)
            await axios.get(api_url).then((res) => {
                setQuestions(res.data.results)
                setLoading(false)
                if (category !== null) {
                    navigate('./quiz')
                } else {
                    toast.error("Please select category")
                }
            })
                .catch((err) => console.log(err))

        }
        getQuestions()

    }

    return (
        <div className="flex items-center h-screen">
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
                        Quiz App
                    </Typography>
                </CardHeader>

                <CardBody>
                    <form onSubmit={startTest} className="mt-12 flex flex-col gap-4">
                        <div className="my-6">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-medium"
                            >
                                Quiz Options
                            </Typography>

                            <Select onChange={e => setcategory(e)} label="Select Category" menuProps={{ className: "h-48" }}>
                                {Categories.map((category, index) => (
                                    <Option key={index} value={category.key.toString()}>
                                        {category.text}
                                    </Option>
                                ))}
                            </Select>

                            <div className="pt-5">
                                <Input min={1} max={50} value={value} onChange={handleChange} type="number" label="Number of question" />
                            </div>

                        </div>
                        <Button type="submit" size="lg" className="relative h-12">
                            {loading ? <Spinner className="mx-auto" /> : 'Start Quiz'}
                        </Button>
                    </form>
                </CardBody>
            </Card>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}



