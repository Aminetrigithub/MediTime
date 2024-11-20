import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')



  const fetchDocInfo = async () => {
    const doctorInformation = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctorInformation);
    console.log(doctorInformation);
  };

  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current Date
    let today = new Date();
    console.log("today= ",today);
    for(let i=0; i<7; i++){
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i)
      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i )
      endTime.setHours(21,0,0,0)

      // setting Hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
  
    }else {currentDate.setHours(10)
    currentDate.setMinutes(30)
    }

    let timeSlots = []

    while(currentDate < endTime){
      let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) /* return string predfinit on js*/
  // add slot to array
  timeSlots.push({ endTime: new Date(currentDate), time: formattedTime })
  // increment current time by 30 mn
  currentDate.setMinutes(currentDate.getMinutes() + 30)
    }
    setDocSlots( prev => ([...prev, timeSlots]   ))  /* function qui change les slots --> setDocSlots() */
    
    }
  }

 

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log("docSlots= ",docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* --------doctor details---------- */}

        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img src={docInfo.image} alt="" className="bg-primary w-full max-w-72 rounded-lg" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ----------doctor info: name, degree, experience---------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} 
              <img src={assets.verified_icon} alt="" className="w-5"/>
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className=" text-xs px-2 py-0.5 border rounded-full">{docInfo.experience}</button>
            </div>

            {/* ----------doctor about---------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /></p>
              <p className="text-sm  text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="font-medium text-gray-500 mt-4"> Appointment fee: <span className="text-gray-600">{docInfo.fees} {currencySymbol}</span></p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
