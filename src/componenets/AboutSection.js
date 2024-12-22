const AboutSection = ({ full, profile, setShowMore }) => {
  const description = profile?.items[0]?.brandingSettings?.channel?.description || '';
  const paragraphs = description.split('\n').filter((text) => text.trim() !== '');

  const monthinstring = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="absolute w-[500px] h-[450px] bg-gray-800 text-white z-20">
      <button onClick={() => setShowMore(false)}>Close</button>
      <div>
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
        <p>Joined: {monthinstring(full?.items[0]?.snippet?.publishedAt)}</p>
      </div>
    </div>
  );
};

export default AboutSection;
