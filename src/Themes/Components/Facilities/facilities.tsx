import styles from './facilities.module.css'

export default function Facilities(){
    const details = [
        {heading:"24/7 CAR SUPPORT",content:"We provide 24Hrs customer care and support"},
        {heading:"LOTS OF LOCATION",content:"Our cars are available at all Major Cities and Towns in Kerala"},
        {heading:"RESERVATION ANYTIME",content:"We provide online booking services"},
        {heading:"RENTALS CARS",content:"We have all types of cars ranging from Tata Nano to SUV's"},
    ]
    return(
        <div className={styles.main}>
            <div className={styles.container}>
                {details.map((item,index) => (
                    <div key={index} className={styles.details}>
                        <h3>{item.heading} </h3>
                        <p>{item.content} </p>
                    </div>
                ))}

            </div>
        </div>
    )
}