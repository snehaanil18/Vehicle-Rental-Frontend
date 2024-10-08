import Facilities from "../../../Themes/Components/Facilities/facilities";
import Banner from "../../../Themes/Components/Banner/banner";
import WorkProcess from "@/Themes/Components/Works/Works";


export default function HomeView(){
    return(
        <div>
            <Banner/>
            <WorkProcess/>
            <Facilities/>
        </div>
    )
}