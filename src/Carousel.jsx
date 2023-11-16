import { useEffect, useState } from "react";
import { longList } from "./data";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaQuoteRight } from "react-icons/fa";

const Carousel = () => {
    const [currentPerson, setCurrentPerson] = useState(0);
    const [people, setPeople] = useState(longList);
    
    const setPrevPerson = () => {
        setCurrentPerson((oldPerson) => {
            const result = (oldPerson - 1 + people.length) % people.length;
            return result;
        })
    }

    const setNextPerson = () => {
        setCurrentPerson((oldPerson) => (oldPerson + 1) % people.length )
    }

    useEffect(() => {
        let sliderId = setInterval(() => {
            setNextPerson();
        }, 2000);
        return () => {
            clearInterval(sliderId);
        }
    }, [currentPerson]);

    return (
        <section className="slider-container">
            {people.map((person, index) => {
                const { id, image, name, title, quote} = person;
                return (
                    <div 
                        key={id} 
                        className="slide"
                        style={{
                            transform: `translateX(${100 * (index - currentPerson)}%)`,
                            opacity: index === currentPerson ? 1 : 0,
                            visibility: index === currentPerson ? 'visible' : 'hidden'
                        }}    
                    >
                        <img className="person-img" src={image} alt={name} />
                        <div className="name">{name}</div>
                        <div className="title">{title}</div>
                        <div className="text">{quote}</div>
                        <div className="icon"><FaQuoteRight /></div>
                    </div>
                )
        })}
            <button className="prev" onClick={() => setPrevPerson()} ><FaArrowAltCircleLeft /></button>
            <button className="next" onClick={() => setNextPerson()}><FaArrowAltCircleRight /></button>
        </section>
    )
}
export default Carousel