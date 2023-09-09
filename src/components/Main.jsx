import React, { useRef, useState } from 'react'
import './Main.css'
import Arrow from '../assets/icon-arrow.svg'



export default function Main() {

    const [dayDef, setDayDef] = useState("--")
    const [monthDef, setMonthDef] = useState("--")
    const [yearDef, setYearDef] = useState("--")

    const [input, setInput] = useState({
        day: "",
        month: "",
        year: ""
    });

    const [errors, setErrors] = useState({});

    function validate(values) {
        let errors = {};

        let año = new Date().getFullYear();
        console.log(año);

        if (!values.day && !values.month  && !values.year) {
            errors.day = "This field is required";
            errors.month = "This field is required";
            errors.year = "This field is required";
        } else if (!values.day && !values.month ) {
            errors.day = "This field is required";
            errors.month = "This field is required";
        } else if (!values.day && !values.year) {
            errors.day = "This field is required";
            errors.year = "This field is required";
            
        } else if (!values.month && !values.year) {
            errors.month = "This field is required";
            errors.year = "This field is required";
        } else if (!values.day) {
            errors.day = "This field is required";
        }else if (!values.month) {
            errors.month = "This field is required";
        }else if (!values.year) {
            errors.year = "This field is required";
        } else if (values.month > 12 && values.day > 31) {
            errors.month = "Must be a valid month";
            errors.day = "Must be a valid day";
        } else if (values.day > 31) {
            errors.day = "Must be a valid day";
        } else if(values.year > año) {
            errors.year = "Must be a valid year";
        }
        return errors;
    }


    const inputDay = useRef(null);
    const inputMonth = useRef(null);
    const inputYear = useRef(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        })
        // setErrors(validate({
        //     ...input,
        //     [name]:value
        // }))
        // console.log(errors);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.target === inputDay.current && inputMonth.current) {
                inputMonth.current.focus();
            } else if(e.target === inputMonth.current && inputYear.current) {
                inputYear.current.focus();
            }
        }
    }

    

    const calcularEdad = () => {
        const fechaActual = new Date();
        let fechaNacimiento = new Date(`${input.year}-${input.month}-${input.day}`)

        let edad = {}

        const diff = fechaActual - fechaNacimiento;
        console.log(diff);

        edad.años = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        edad.meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        edad.dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        setYearDef(edad.años);
        setMonthDef(edad.meses);
        setDayDef(edad.dias + 1);

        if (edad.dias == 0) {
            setDayDef(edad.dias + 1)
        }

    }

    const handleClick = (e) => {
        e.preventDefault();

        const validationErrors = validate(input)
            
            if (Object.keys(validationErrors).length === 0) {
                calcularEdad()
                setInput({
                    day: "",
                    month: "",
                    year: ""
                })
                setErrors({
                    day: "",
                    month: "",
                    year: ""
                })
                console.log("se envio");
                
            } else {
                setErrors(validationErrors)
                setDayDef("--")
                setMonthDef("--")
                setYearDef("--")
                console.log("NO envio");
            }
           
            
        
    }


  return (
    <>
    <div className='form-container'>
    <div className='form-daySection'>
    <p className={errors.day || errors.month || errors.year ? "section-red-p" :"section-green-p" }>DAY</p>
        <input  className={errors.day || errors.month || errors.year ? "section-red" : "section-green" } onKeyDown={handleKeyDown} ref={inputDay} onChange={handleChange} value={input.day} name='day' placeholder='DD'/>
        {
            errors.day && (
                <small className='error'>{errors.day}</small>
            )
        }
    </div>
    <div  className='form-daySection'>
    <p className={errors.day || errors.month || errors.year ? "section-red-p" :"section-green-p" } >MONTH</p>
        <input className={errors.day || errors.month || errors.year ? "section-red" : "section-green" }  onKeyDown={handleKeyDown}  ref={inputMonth} onChange={handleChange} value={input.month} name='month' placeholder='MM'/>
        {
            errors.month && (
                <small className='error'>{errors.month}</small>
            )
        }
    </div>
    <div  className='form-daySection'>
    <p className={errors.day || errors.month || errors.year ? "section-red-p" :"section-green-p" }>YEAR</p>
        <input className={errors.day || errors.month || errors.year ? "section-red" : "section-green" }  ref={inputYear} onChange={handleChange} value={input.year} name='year' placeholder='YYYY'/>
        {
            errors.year && (
                <small className='error'>{errors.year}</small>
            )
        }
    </div>
    </div>

    <div className='btn-contianerTwo'>
        <div className='line'></div>
        <button type='submit'  onClick={handleClick} >
            <img src={Arrow} alt='arrow'/>
        </button>
        {/* <button><Arrow/></button> */}
    </div>

    <div className='response-container'>
            <div className='response'>
            <h1>{yearDef}</h1>
            <h2>years</h2>
            </div>
            <div className='response'>
            <h1>{monthDef}</h1>
            <h2>months</h2>
            </div>
            <div className='response'>
            <h1>{dayDef}</h1>
            <h2>days</h2>
            </div>
    </div>
    </>

  )
}
