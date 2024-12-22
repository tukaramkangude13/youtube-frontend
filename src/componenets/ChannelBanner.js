import React from 'react'

const ChannelBanner = ({profile,darkMode}) => {
    const imageUrl = profile?.items[0]?.brandingSettings?.image?.bannerExternalUrl || '';
    const modifiedUrl = `${imageUrl}=w500-fcrop64=1,00005a57ffffa5a8`;
    return (
    <div>
        <img 
              className={`mx-auto ${darkMode ? 'bg-black' : 'bg-white'} w-[854px] h-[206px]`}

          src={modifiedUrl} alt='image' />
    </div>
  )
}

export default ChannelBanner