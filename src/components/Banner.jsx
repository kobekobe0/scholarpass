import card1 from '../assets/1.webp'
import card2 from '../assets/2.webp'
import card3 from '../assets/3.webp'

const Banner = () => {
    return (
        <div className="flex items-center flex-col justify-around w-full h-[85vh] overflow-hidden">
        <div className="relative w-full bg-slate-100">
          {/* Text Container */}
          <div className="relative text-center p-4 z-10 mb-20 mt-20">
            <h1 className="text-5xl font-bold text-gray-800">Smart Access for Smart Scholars</h1>
            <p className="text-lg mt-4">ScholarPass: Where convenience meets security.</p>
          </div>
    
          {/* Image Container */}
          <div className="relative flex justify-center items-center">
            <img
              src={card1}
              alt="banner_pic"
              className="relative w-[60vw] hover:scale-[0.96] transition-all ease-in-out xl:w-[25vw] hover:shadow-[-30px_-10px_94px_24px_#d6bcfa] rounded-3xl translate-y-14 scale-95 transform -rotate-12"
            />
            <img
              src={card2}
              alt="banner_pic"
              className="absolute w-[60vw] hover:scale-[1.01] transition-all xl:w-[25vw] shadow-[0px_-10px_80px_-40px_#1a202c] hover:shadow-[0px_-10px_80px_-40px_#68d391] rounded-3xl z-50 transform"
            />
            <img
              src={card3}
              alt="banner_pic"
              className="relative w-[60vw] hover:scale-[0.91] transition-all xl:w-[25vw] hover:shadow-[30px_-10px_94px_24px_#fbd38d] rounded-3xl translate-y-16 scale-90 transform rotate-6"
            />
          </div>
        </div>
    
      </div> 
    )
}

export default Banner