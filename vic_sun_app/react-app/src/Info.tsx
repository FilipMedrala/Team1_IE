import './App.css'
import hat from './assets/hat.png'
import map from './assets/map.png'
import shirt from './assets/shirt.png'
import suncream from './assets/suncream.png'
import sunglasses from './assets/sunglasses.png'
import umbrella from './assets/umbrella.png'

function Info() {

  return (
    <>
    <div className='Conatiner'>
      <div className='row'>
        <h2 className='text-start p-3'>About UV</h2>
        <p className='text-start p-3'>Ultraviolet (UV) radiation is a type of energy produced by the sun and some artificial sources, such as solariums. UV radiation is not like the sun's light or heat, which we can see and feel. Your senses cannot detect UV radiation, so you will not notice the damage until it’s been done.
The sun's UV is the main cause of skin cancer. Too much UV exposure also causes sunburn, tanning, premature ageing and eye damage.
UV can reach you directly from the sun, and even with cloud cover. It can also be reflected off different surfaces (e.g. fresh snow, beach sand or sea) and scattered by particles in the air.
The UV level is affected by a number of factors including the time of day, time of year, cloud cover, altitude, location and surrounding surfaces</p>
      </div>

      <div className="row">
        <h2 className='text-start p-3'>The UV Index:</h2>
        <h3 className='text-start px-3'>1-2 Low</h3>
        <p className="text-start px-3">
          <b>Sun Protection Not Required</b> <br></br>Unless outside for extended periods, or near reflective surfaces such as snow or water.
        </p>
        <h3 className='text-start px-3'>3 - 5 Moderate</h3>
        <h3 className='text-start px-3'>6 - 7 High</h3>
        <h3 className='text-start px-3'>8 - 10 Very High</h3>
        <h3 className='text-start px-3'>11+ Extreme</h3>
        <p className="text-start px-3">
          <b>Sun Protection Required</b> <br></br>Wear sun-protective clothing, a broad-brimmed hat and sunglasses. Apply high SPF sunscreen to any unprotected skin. Seek shade.
        </p>

      </div>

      <div className='row'>
        <h2 className='text-start p-3'>UV levels in Australia: </h2>
        <img src={map} alt="" />
      </div>

      <div className='row'>
        <h2 className='text-start p-3'>The UV Index and the sun protection times</h2>
        <p className='text-start px-3'>
        The UV level is affected by a number of factors including the time of day. The sun protection times are issued when UV levels are forecast to be 3 or higher. At these levels there is an increased risk of skin damage.
During the sun protection times, protect skin and eyes by using covering clothing, high SPF sunscreen, a broad-brimmed hat, shade and sunglasses.
        </p>
      </div>

      <div className='row'>
        <h2 className='text-start p-3'>Sun Protection</h2>
        <p className='text-start px-3'>
          For the best level of protection use a combination of:
        </p>
      </div>

      

      <div className='row'>
        <div className='col-1'>
        <img src={shirt} alt=""  width='80%' className='img-fluid p-3'/>
        </div>
        <div className='col-11'>
          <h4 className='text-start'>Slip on clothing</h4>
          <p className='text-start'>Wear loose protective clothing that covers as much skin as possible.</p>
        </div>

        <div className='col-1'>
          <img src={suncream} alt=""  width='80%' className='img-fluid p-3'/>
        </div>
        <div className='col-11'>
          <h4 className='text-start'>Slop on sunscreen</h4>
          <p className='text-start'>Apply high SPF broad-spectrum, water-resistant sunscreen to any skin not covered by clothing. Reapply regularly.</p>
        </div>

        <div className='col-1'>
          <img src={hat} alt=""  width='80%' className='img-fluid p-3'/>
        </div>
        <div className='col-11'>
          <h4 className='text-start'>Slap on a hat</h4>
          <p className='text-start'>Look for a hat with a tight weave and broad brim that provides good shade to your face, head, neck and ears.</p>
        </div>

        <div className='col-1'>
          <img src={umbrella} alt=""  width='80%' className='img-fluid p-3'/>
        </div>
        <div className='col-11'>
          <h4 className='text-start'>Seek shade</h4>
          <p className='text-start'>Use a combination of built and natural shade.</p>
        </div>

        <div className='col-1'>
          <img src={sunglasses} alt=""  width='80%' className='img-fluid p-3'/>
        </div>
        <div className='col-11'>
          <h4 className='text-start'>Slide on sunglasses</h4>
          <p className='text-start'>Choose a close-fitting, wrap-around style of sunglasses.</p>
        </div>

      </div>
      
    </div>
    </>
  )
}

export default Info
