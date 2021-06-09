import Image from 'next/image'

const Build = () => {
   return (
     <div className="build_details">
       <h1>Build Name</h1>
       <Image src="/build1.png" layout='fill' objectFit='contain' objectPosition='center right' />
     </div>
   );
  }

export default Build
