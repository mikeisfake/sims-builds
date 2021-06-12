import Image from 'next/image'

const Build = () => {
   return (
     <div className="build_details">
       <article>
         <div className="tab">
           <h2>front garden house</h2>
         </div>
         <div className="content">
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde rerum eos esse, perferendis corrupti illum sequi commodi perspiciatis. Quidem perferendis totam libero blanditiis rem maxime saepe hic architecto cum esse.</p>
           <p><strong>world</strong>: newcrest</p>
           <p><strong>building features</strong>:
             <ul>
               <li>2 bedroom</li>
               <li>2.5 baths</li>
               <li>front garden with statuary</li>
               <li>formal living room and separate media room</li>
               <li>2nd floor ballroom</li>
               <li>lofted office space</li>
             </ul>
           </p>
           <p><strong>cost</strong>: $500,000</p>
           <p><strong>lot size</strong>: 30 x 40</p>
           <p><strong>Custom Content Creators</strong>:
             <ul>
               <li>felixandre</li>
               <li>HeyHarrie</li>
               <li>Pierisim</li>
               <li>Grimcookies</li>
             </ul>
           </p>
           <p><strong>gallery</strong></p>
           <div className="gallery">
             <img src="/build1.png" alt=""/>
             <img src="/build1.png" alt=""/>
             <img src="/build1.png" alt=""/>
             <img src="/build1.png" alt=""/>
             <img src="/build1.png" alt=""/>
           </div>
         </div>
       </article>
       <div className="img-container">
         <img src="/build1.png" />
       </div>
     </div>
   );
  }

export default Build
